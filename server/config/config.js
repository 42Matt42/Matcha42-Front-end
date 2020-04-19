require("dotenv").config();

let CONFIG = {};
// Make this global to use all over the application

CONFIG.app = process.env.APP || "dev";
CONFIG.port = process.env.PORT || "8080";

CONFIG.db_dialect = process.env.DB_DIALECT || "mysql";
CONFIG.db_host = process.env.DB_HOST || "0.0.0.0";
CONFIG.db_port = process.env.DB_PORT || "33080";
CONFIG.db_name = process.env.DB_NAME || "matcha";
CONFIG.db_user = process.env.DB_USER || "flo";
CONFIG.db_password = process.env.DB_PASSWORD || "password";

CONFIG.jwt_secret = process.env.SECRET_JWT || "SECRET";
CONFIG.jwt_expiration = process.env.JWT_EXPIRATION || 60 * 60 * 24;

CONFIG.email_user = process.env.EMAIL_USER || "chroniclesofselene@gmail.com";
CONFIG.email_pass = process.env.EMAIL_PASS || "$Duoquadra1";

module.exports = CONFIG;
