<template>
  <div>
    loadedViews:
    {{ loadedViews }}
    <br><br>
  </div>
</template>

<script>
// import axios from 'axios'
// import moment from 'moment'

export default {
  middleware: 'authenticated',
  data () {
    return {
      valid: true
    }
  },
  computed: {
    serverMessage () {
      return this.$store.getters.serverMessage
    },
    loadedViews () {
      return this.$store.getters.loadedViews
    },
    token () {
      return this.$store.getters.token
    }
  // },
  // async asyncData (context) {
  //   const myViews = await axios
  //     .get(process.env.serverUrl + '/social/view', {
  //       headers: {
  //         Authorization: 'Bearer ' + context.app.store.getters.token
  //       }
  //     })
  //     .then((response) => {
  //       /* eslint-disable */
  //       console.log('response_GET_view', response)
  //       context.store.dispatch('setViews', response.data.views)
  //       context.store.dispatch('setMessage', response.client)
  //     })
  //     .catch((error) => {
  //       console.log('error_GET_view', error)
  //       console.log('error_client', error.response.data.client)
  //       context.store.dispatch('setMessage', error.response.data.client)
  //     })
  //   return {
  //     myViews
  //   }
  }
}
</script>
