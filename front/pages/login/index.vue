<template>
  <div class="admin-page">
    <section class="new-post">
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
    </section>
  </div>
</template>

<script>
import AppControlInput from '@/components/UI/AppControlInput'
import AppButton from '@/components/UI/AppButton'

export default {
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
  methods: {
    onLogin () {
      this.$axios
        // .$post('https://api.github.com/users/mapbox', {
        .$post('https://cors-anywhere.herokuapp.com/https://matcha42saubinbartol.herokuapp.com/login', {
          data: {
            username: this.login.username,
            password: this.login.password
          }
          // headers: {
          //   'Access-Control-Allow-Origin': '*'
          // },
          // proxy: {
          //   host: '10.51.1.42',
          //   port: '443'
          // }
        })
        .then((res) => {
        /* eslint-disable */
        // console.log(res)
          console.log(res.data)
          this.$router.push('~/users/' + this.userId)
        })
        .catch(function (error) {
          console.log(error)
        })
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

