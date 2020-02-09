<template>
  <div class="">
    <section class="">
      <br>
      <br>
      <form @submit.prevent="onNewPassword">
        <AppControlInput
          v-model="newpass.password1"
        >
          Choose a new password
        </AppControlInput>
        <AppControlInput
          v-model="newpass.password2"
        >
          Type it again to confirm
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
      username: this.$route.params.username,
      newpass: {
        password1: '',
        password2: ''
      }
    }
  },
  methods: {
    onNewPassword () {
      this.$axios
        .$post(process.env.serverUrl + '/users/password', {
          password1: this.newpass.password1,
          password2: this.newpass.password2,
          username: this.username
        })
        .then((res) => {
        /* eslint-disable */
          console.log(res)
          this.$store.dispatch('setMessage', "New password set ! You can now login with it !")
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
