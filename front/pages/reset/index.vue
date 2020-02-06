<template>
  <div class="admin-page">
    <section class="new-post">
      <br>
      <br>
      <form @submit.prevent="onReset">
        <AppControlInput
          v-model="reset.email"
        >
          Type your email
          <br>
        </AppControlInput>
        <AppButton
          type="submit"
        >
          Reset password !
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
  // middleware: 'notAuthenticated',
  data () {
    return {
      reset: {
        email: ''
      }
    }
  },
  methods: {
    onReset () {
      this.$axios
        .$post(process.env.serverUrl + '/reset', {
          email: this.reset.email
        })
        .then((res) => {
        /* eslint-disable */
          console.log(res)
          this.$router.push('/')
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  }
}
</script>
