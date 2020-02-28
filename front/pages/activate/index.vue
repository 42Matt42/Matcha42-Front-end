<template>
  <div>
    <div v-if="checker === true">
      <br>
      <br>
      Link activated !
    </div>
    <div v-else>
      This link is invalid.
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
    }
  },
  computed: {
    checker () {
      return this.$store.getters.checker
    },
    serverMessage () {
      return this.$store.getters.serverMessage
    }
  },
  async asyncData (context) {
    context.store.dispatch('setChecker', false)
    const activated = await axios
      .get(process.env.serverUrl + '/users/activate', {
        params: {
          id: context.query.id
        }
      })
      .then((response) => {
        /* eslint-disable */
        console.log('response', response)
        console.log('context', context)
        // context.store.dispatch('setChecker', false)
        if (response.status == '200') {
          // context.redirect(`${process.env.baseUrl}/pass/${context.query.username}`)
          context.store.dispatch('setChecker', true)
          context.store.dispatch('setMessage', response.data.client)
        }
      })
      .catch(function(error) {
        /* eslint-disable */
        console.log('error_response', error.response)
        context.store.dispatch('setMessage', error.response.data.client)
      })
      return {
        activated
      }
  }
}
</script>
