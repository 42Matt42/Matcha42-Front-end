<template>
  <div id="app">
    <!-- <section>
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
      </form>
      <br> -->
    <v-form
      ref="form"
      v-model="valid"
      lazy-validation
    >
      <v-container>
        <v-row>
          <v-col
            cols="6"
          >
            <v-text-field
              v-model="username"
              :rules="nameRules"
              :counter="32"
              label="Username"
              required
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col
            cols="6"
          >
            <v-text-field
              v-model="name"
              :rules="nameRules"
              :counter="32"
              label="First name"
              required
            />
          </v-col>

          <v-col
            cols="6"
          >
            <v-text-field
              v-model="surname"
              :rules="nameRules"
              :counter="32"
              label="Last name"
              required
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col
            cols="12"
          >
            <v-text-field
              v-model="email"
              :rules="emailRules"
              :counter="64"
              label="E-mail"
              required
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col
            cols="6"
          >
            <v-text-field
              v-model="password"
              :rules="nameRules"
              :counter="32"
              label="Password"
              required
            />
          </v-col>
        </v-row>
        <v-row>
          <v-btn
            @click="valid"
            :disabled="!valid"
            color="success"
            class="mr-4"
          >
            Validate
          </v-btn>
        </v-row>
      </v-container>
    </v-form>
    <br>
    Did you forget your pass?
    <nuxt-link to="/reset">
      Reset password
    </nuxt-link>
    <!-- </section> -->
  </div>
</template>

<script>
import axios from 'axios'
// import input from '@/components/UI/AppControlInput'
// import AppButton from '@/components/UI/AppButton'

export default {
  middleware: 'authenticated',
  data () {
    return {
      reset: {
        valid: false,
        username: '',
        name: '',
        surname: '',
        email: '',
        password: ''
      // reset: {
      //   user: null,
      //   username: '',
      //   name: '',
      //   surname: '',
      //   email: '',
      //   password: ''
      }
    }
  },
  computed: {
    nameRules: [
      v => !!v || 'Name is required',
      v => v.length <= 10 || 'Name must be less than 10 characters'
    ],
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /.+@.+/.test(v) || 'E-mail must be valid'
    ]
  },
  methods: {
    gettest () {
      this.$store.dispatch('getUserData')
      this.$router.push('/')
    },
    valid () {
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
