<template>
  <div class="admin-page">
    <section class="new-post">
      <br>
      <br>
      <form @submit.prevent="onRegisterbis">
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
  // computed: {
  //   loadedRegisters() {
  //     return this.$store.getters.loadedUsers
  //   }
  // },
  methods: {
    // onRegister () {
    //   this.$axios
    //     .$post('https://cors-anywhere.herokuapp.com/https://matcha42saubinbartol.herokuapp.com/register', {
    //       username: this.checkRegister.username,
    //       name: this.checkRegister.name,
    //       surname: this.checkRegister.surname,
    //       email: this.checkRegister.email,
    //       password: this.checkRegister.password,
    //     })
    //     .then(function (res) {
    //     /* eslint-disable */
    //       console.log(res.meta.msg)
    //       console.log(res.data.insertId)
    //       console.log(res)
    //       console.log(res.data)
    //       return {
    //         loadedUser: { ...res.data, id: context.params.postId }
    //       }
    //     })
    //     .catch(function (error) {
    //       console.log(error)
    //     })
    // },
    onRegisterbis () {
      this.$store.dispatch("registerUser", this.checkRegister)
        // this.$router.push("/")
    },
    computed: {
      loadedUsers () {
        return this.$store.getters.loadedUsers
      }
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
