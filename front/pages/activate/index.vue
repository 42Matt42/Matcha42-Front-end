<template>
  <div>
    pop-up:<br>
    {{ serverMessage }}
    <br><br>
    checker:<br>
    {{ checker }}
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
    const activated = await axios
      .get(process.env.serverUrl + '/users/password', {
        params: {
          id: context.query.id
        }
      })
      .then((response) => {
        /* eslint-disable */
        console.log(response)
        console.log(context)
        // const status =
        //   JSON.parse(response.status)
        context.store.commit('setChecker', false)
        if (response.status == '200') {
          // context.redirect(`${process.env.baseUrl}/pass/${context.query.username}`)
          context.store.commit(set)
          context.store.commit('setChecker', true)
          context.store.commit('setUsername', context.query.username)
          context.store.commit('setMessage', response.statusText)
        }
      })
      .catch(function(error) {
        /* eslint-disable */
        console.log(error)
        context.store.commit('setMessage', error.statusText)
      })
      return {
        activated
      }
  }
}
</script>
