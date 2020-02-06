<template>
  <div id="app">
    <section>
      <br>
      <button @click="gettest">
        Button_GET_test
      </button>
      <br>
      <br>
      <form @submit.prevent="onSettings">
        Username:
        <input
          v-model="reset.username"
        >
        Name:
        <input
          v-model="reset.name"
        >
        Surname:
        <input
          v-model="reset.surname"
        >
        Email:
        <input
          v-model="reset.email"
        >
        Password:
        <input
          v-model="reset.password"
        >
        <v-app id="inspire">
          <v-text-field color="success" />
        </v-app>
        <v-app id="inspire">
          <v-text-field :rules="rules" />
        </v-app>
        <button
          type="submit"
        >
          VALID
        </button>
        <br>
      </form>
    </section>
  </div>
</template>

<script>
import axios from 'axios'
// import input from '@/components/UI/AppControlInput'
// import AppButton from '@/components/UI/AppButton'

export default {
  data () {
    return {
      reset: {
        user: null,
        username: '',
        name: '',
        surname: '',
        email: '',
        password: ''
      },
      rules: [
        value => !!value || 'Email required',
        value => (value || '').length <= 64 || 'Max 64 characters',
        (value) => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || 'Invalid e-mail'
        }
      ]
    }
  },
  methods: {
    gettest () {
      this.$store.dispatch('getUserData')
      this.$router.push('/')
    },
    onSettings () {
      this.$axios
        .$get(process.env.serverUrl + '/settings', {
          username: this.reset.username,
          name: this.reset.name,
          surname: this.reset.surname,
          email: this.reset.email,
          password: this.reset.password
        })
        .then((res) => {
        /* eslint-disable */
          console.log(res)
          // this.$store.dispatch("setConnected", res) // mutating to store for client rendering
          // Cookie.set('token', this.$store.getters.token, { expires: 7 }) // saving token for 7 days in cookie for server rendering
          this.$router.push('/')
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  },
  async asyncData (context) {
    const user = await axios
      .get(process.env.serverUrl + '/user', {
        headers: {
          Authorization: 'Bearer ' + context.app.store.getters.token,
          user_id: context.app.store.getters.loadedUsers.id
        }
      })
      .then((res) => {
        /* eslint-disable */
        console.log(res)
        return res
      })
      .catch(function(error) {
        console.log(error)
      })
    return {
      user
    }
  }
}
</script>
