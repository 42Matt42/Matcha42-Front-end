<template>
  <div>
    loadedLikes:
    {{ loadedLikes }}
    <br><br>
    <div>
      <v-for>
        test
      </v-for>
    </div>
  </div>
</template>

<script>
// import axios from 'axios'
// import moment from 'moment'

export default {
  middleware: 'authenticated',
  data () {
    return {
      valid: true,
      client: [
        { 'user liked': '1234111', 'user who likes': 'HardWrittenTest', 'date': '2020-02-19T23:00.00.000Z' },
        { 'user liked': '1234888', 'user who likes': 'item888', 'date': '2020-02-21T23:00.00.000Z' },
        { 'user liked': '1234777', 'user who likes': 'Pseudo777', 'date': '2020-02-20T23:00.00.000Z' }
      ]
    }
  },
  computed: {
    serverMessage () {
      return this.$store.getters.serverMessage
    },
    loadedLikes () {
      return this.$store.getters.loadedLikes
    },
    token () {
      return this.$store.getters.token
    }
  }
  // async asyncData (context) {
  //   const myLikes = await axios
  //     .get(process.env.serverUrl + '/social/like', {
  //       headers: {
  //         Authorization: 'Bearer ' + context.app.store.getters.token
  //       }
  //     })
  //     .then((response) => {
  //       /* eslint-disable */
  //       console.log('response_GET_like', response)
  //       context.store.dispatch('setLikes', response.data.likes)
  //       context.store.dispatch('setMessage', response.client)
  //     })
  //     .catch((error) => {
  //       console.log('error_GET_like', error)
  //       console.log('error_client', error.response.data.client)
  //       context.store.dispatch('setMessage', error.response.data.client)
  //     })
  //   return {
  //     myLikes
  //   }
  // }
}
</script>
