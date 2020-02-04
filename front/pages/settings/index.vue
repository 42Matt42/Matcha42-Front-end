<template>
  <div class="admin-page">
    <section class="new-post">
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
      }
    }
  },
  methods: {
    gettest () {
      this.$store.dispatch('getUserData')
      this.$router.push('/')
    },
    onSettings () {
      this.$axios
        .$post(process.env.serverUrl + '/settings', {
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
  async asyncData () {
    const user = await axios
      .get(process.env.serverUrl + '/user',
        { withCredentials: true })
      .then((res) => {
        /* eslint-disable */
        console.log(res)
        console.log(res.meta)
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

<style scoped>
.admin-page {
  padding: 20px;
}

.new-post {
  text-align: center;
  border-bottom: 2px solid #ccc;
  padding-bottom: 10px;
}

.existing-posts h1 {
  text-align: center;
}
</style>

