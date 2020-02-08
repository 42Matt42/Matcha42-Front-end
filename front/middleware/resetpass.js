import axios from 'axios'

export default function (context, redirect) {
// ({ context, store, redirect }) {
// async asyncData (context) {
  return axios
    .get(process.env.serverUrl + '/password', {
      params: {
        id: context.query.id,
        username: context.query.username
      }
    })
    .then((response) => {
      /* eslint-disable */
      console.log(response)
      console.log(context)
      const status =
        JSON.parse(response.status)
      if (status == '200') {
        redirect(`${process.env.baseUrl}/pass/${context.query.username}`)
      }
    })
    .catch(function(error) {
      /* eslint-disable */
      console.log(error)
    })
}
