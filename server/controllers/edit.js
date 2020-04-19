// include the model (aka DB connection)
const usermodel = require("../models/usermodel");
const sanitize = require("sanitize-html");
const util = require("util");
const fs = require("fs");
const sharp = require("sharp");
const rootDir = require("../constant").rootDIr;
const uniqid = require("uniqid");

const getUser = util.promisify(usermodel.findOneUser);
const updatePhoto = util.promisify(usermodel.updatePhoto);
const getPhoto = util.promisify(usermodel.getPhoto);

const updateFieldUser = util.promisify(usermodel.updateFieldUser);
const updateRelationsip = util.promisify(usermodel.updateRelationship);

const MAIL_REGEX = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

function response(status, message, res) {
  return res.status(status).json({client: message});
}

module.exports = {
  checkEmail: async (email, user_id, callback) => {
    if (!(email && user_id)) {
      let error = "Missing informations, fill the form";

      return callback(null, error);
    }
    if (!MAIL_REGEX.test(email)) {
      let error = "Invalid Email";

      return callback(null, error);
    }
    let user = {};
    try {
      user = await getUser("email", email).then((data) => data);
      if (user[0] && !(user[0].email === email)) {
        return callback(null, "Email already Used");
      }
      await updateFieldUser("email", email, user_id);
    } catch (err) {
      return callback(err, null);
    }

    return callback(null, "Email updated");
  },
  editBio: async (req, res, payload) => {
    if (!req.body.bio) {
      return res
        .status(400)
        .json({error: "Missing informations, fill the form"});
    }
    const bio = sanitize(req.body.bio);
    const user_id = payload.user_id;
    if (!(bio || user_id)) {
      return res
        .status(400)
        .json({error: "Missing informations, fill the form"});
    }
    try {
      let user = await getUser("id", user_id).then((data) => data);
      if (!user[0]) {
        return response(400, "Unknown user", res);
      }
      await updateFieldUser("bio", bio, user_id).then((data) => data);
    } catch (error) {
      return response(500, "Internal error", res);
    }

    return response(200, "OK", res);
  },
  editGender: async (req, res, payload) => {
    const gender_id = req.body.gender_id;
    const user_id = payload.user_id;
    if (!(gender_id || user_id)) {
      return res
        .status(400)
        .json({error: "Missing informations, fill the form"});
    }
    if (!(gender_id >= 1 && gender_id <= 2)) {
      return response(400, "Wrong input gender_id", res);
    }
    try {
      let user = await getUser("id", user_id).then((data) => data);
      if (!user[0]) {
        return response(400, "Unknown user", res);
      }
      await updateFieldUser("gender_id", gender_id, user_id).then((data) => data);
    } catch (error) {
      return response(500, "Internal error", res);
    }

    return response(200, "OK", res);
  },
  editRelationship: async (req, res, payload) => {
    const gender = req.body.gender_id;
    const user_id = payload.user_id;
    if (!(gender || user_id)) {
      return res
        .status(400)
        .json({error: "Missing informations, fill the form"});
    }
    if (!(gender >= 1 && gender <= 3)) {
      return response(400, "Wrong input gender_id", res);
    }
    try {
      let user = await getUser("id", user_id).then((data) => data);
      if (!user[0]) {
        response(400, "Unknown user", res);
      }
      await updateRelationsip(user_id, gender).then((data) => data);
    } catch (error) {
      return response(500, "Internal error", res);
    }

    return response(200, "OK", res);
  },
  editPhoto: async (req, res, payload) => {
    const user_id = payload.user_id;
    try {
      if (!req.files) {
        return response(400, `No pictures received`, res);
      }
      if (req.files.length <= 0) {
        return response(400, `You must send at least 1 file.`, res);
      }
      let photos = await getPhoto(user_id)
        .then((data) => data)
        .catch((error) => {
          console.log(error);

          return response(500, "Internal error", res);
        });
      let err = [];
      req.files.forEach(async (link) => {
        const resizedLink = `${rootDir}/uploads/resized/${uniqid()}-matcha.jpeg`;
        await sharp(link.path).resize(320, 240)
          .jpeg()
          .toFile(resizedLink);
        if (
          fs.existsSync(photos[parseInt(link.originalname, 10) - 1].link) &&
          photos[parseInt(link.originalname, 10) - 1].link !==
            `${rootDir}/uploads/1024px.png`
        ) {
          fs.unlinkSync(photos[parseInt(link.originalname, 10) - 1].link);
        }
        if (
          fs.existsSync(link.path) &&
          link.path !== `${rootDir}/uploads/uploads/1024px.png`
        ) {
          fs.unlinkSync(link.path);
        }
        if (
          parseInt(link.originalname, 10) > 0 &&
          parseInt(link.originalname, 10) < 6
        ) {
          err = [400, "Bad naming for pictures"];
        }
        await updatePhoto(user_id, resizedLink, parseInt(link.originalname, 10))
          .then((data) => data)
          .catch((error) => {
            console.log(error);

            err = [500, "Internal error"];
          });
      });
      if (err[0]) {
        return response(err[0], err[1], res);
      }

      return response(200, `Files has been updated.`, res);
    } catch (error) {
      console.log(error);

      if (error.code === "LIMIT_UNEXPECTED_FILE") {
        return response(400, "Too many files to upload.", res);
      }

      return response(
        500,
        `Error when trying upload many files: ${error}`,
        res
      );
    }
  },
  getPhoto: async (req, res, payload) => {
    let user_id = payload.user_id;
    let photos = {};
    try {
      photos = await getPhoto(user_id).then((data) => data);
    } catch (error) {
      return response(500, "Internal error", res);
    }
    for (let index = 0; index < photos.length; index += 1) {
      try {
        photos[index].link = Buffer.from(fs.readFileSync(photos[index].link)).toString("base64");
      } catch (error) {
        console.log(error);

        return response(404, "File not available", res);
      }
    }

    return response(200, photos, res);
  },
  editLocation: async (req, res, payload) => {
    if (!req.body.location) {
      return response(400, "Missing parameters", res);
    }
    let location = {};
    try {
      location = JSON.parse(req.body.location);

      const user_id = payload.user_id;
      if (!location) {
        return res
          .status(400)
          .json({error: "Missing informations, fill the form"});
      }
      if (
        !(location.lat && location.lng && location.city && location.country)
      ) {
        return res
          .status(400)
          .json({error: "Missing informations, locating info"});
      }
      await updateFieldUser("location", JSON.stringify(location), user_id).then((data) => data);
    } catch (error) {
      return response(400, "Bad json", res);
    }

    return response(200, "OK", res);
  },
};
