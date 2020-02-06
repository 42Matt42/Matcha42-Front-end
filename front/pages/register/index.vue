<template>
  <div class="">
    <section class="">
      <br>
      <br>
      <form @submit.prevent="onRegister">
        <AppControlInput
          v-model="checkRegister.username"
        >
          Username
        </AppControlInput>
        <AppControlInput
          v-model="checkRegister.surname"
        >
          Surname
        </AppControlInput>
        <br>
        <AppControlInput
          v-model="checkRegister.name"
        >
          Name
        </AppControlInput>
        <br>
        <AppControlInput
          v-model="checkRegister.email"
        >
          Email
        </AppControlInput>
        <br>
        <AppControlInput
          v-model="checkRegister.password"
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
/* eslint-disable */

export default {
  components: {
    AppControlInput,
    AppButton
  },
  data () {
    return {
      checkRegister:
      {
        username: '',
        name: '',
        surname: '',
        email: '',
        password: ''
      }
    }
  },
  methods: {
    onRegister () {
      this.$store.dispatch("registerUser", this.checkRegister)
      this.$router.push("/")
    }
  }
}
</script>
