<template>
  <div class="">
    <section class="">
      <!-- <v-if></v-if> -->
      {{ serverMessage }}
      <br>
      <br>
      <br>
      <form @submit.prevent="onLogin">
        <AppControlInput
          v-model="login.username"
        >
          Username
        </AppControlInput>
        <AppControlInput
          v-model="login.password"
        >
          Password
        </AppControlInput>
        <br>
        <AppButton
          type="submit"
        >
          VALID
        </AppButton>
        <br>
      </form>
      <br>
      Did you forget your pass?
      <nuxt-link to="/reset">
        Reset password
      </nuxt-link>
    </section>
  </div>
</template>

<script>
import AppControlInput from '@/components/UI/AppControlInput'
import AppButton from '@/components/UI/AppButton'
// const Cookie = process.client ? require('js-cookie') : undefined

export default {
  middleware: 'notAuthenticated',
  components: {
    AppControlInput,
    AppButton
  },
  data () {
    return {
      login: {
        username: '',
        password: ''
      }
    }
  },
  computed: {
    loadedUsers () {
      return this.$store.getters.loadedUsers
    },
    token () {
      return this.$store.getters.token
    },
    serverMessage () {
      return this.$store.getters.serverMessage
    }
  },
  // middleware: 'notAuthenticated',
  methods: {
    onLogin () {
      this.$axios
        .$post(process.env.serverUrl + '/login', {
          username: this.login.username,
          password: this.login.password
        })
        .then((res) => {
        /* eslint-disable */
          console.log(res.meta.access)
          console.log(res)
          console.log(res.data[0].email)
          this.$store.dispatch('setConnected', res)
          // Cookie.set('token', this.$store.getters.token, { expires: 7 })
          this.$router.push('/')
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  }
}
</script>
