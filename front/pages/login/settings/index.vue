<template>
  <div>
    pop-up:<br>
    {{ serverMessage }}
    <br><br>
    <div>
      <br>
      <br><br>
      <div>
        <br>
        <br>
        <v-form
          ref="form"
          v-model="valid"
          lazy-validation
        >
          <v-container>
            <v-row>
              <v-col
                cols="12"
              >
                <v-text-field
                  v-model="loadedUsers.username"
                  :rules="usernameRules"
                  :counter="20"
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
                  v-model="loadedUsers.name"
                  :rules="nameRules"
                  :counter="20"
                  label="First name"
                  required
                />
              </v-col>
              <v-col
                cols="6"
              >
                <v-text-field
                  v-model="loadedUsers.surname"
                  :rules="nameRules"
                  :counter="20"
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
                  v-model="loadedUsers.email"
                  :rules="emailRules"
                  :counter="42"
                  label="Email"
                  required
                />
              </v-col>
            </v-row>
            <br>
            <v-row>
              <v-btn
                @click="validate"
                :disabled="!valid"
                color="success"
                class="mr-4"
              >
                Validate
              </v-btn>
            </v-row>
          </v-container>
        </v-form>
        <div>
          <br>
          Do you want to change your password ?
          <nuxt-link to="/login/settings/newpass">
            Change password
          </nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  middleware: 'profileComplete',
  data () {
    return {
      valid: true,
      usernameRules: [
        v => !!v || 'Username is required',
        v => (v && v.length <= 20) || 'Password must be less than 20 characters',
        v => /.{6,}/.test(v) || '6 characters minimum.',
        v => /^[a-zA-Z0-9_.-]*$/.test(v) || 'Must be alphanumeric characters [Abc123...]'
      ],
      nameRules: [
        v => !!v || 'Field required',
        v => (v && v.length <= 20) || 'Must be less than 20 characters',
        v => /^[a-zA-Z_.-]*$/.test(v) || 'Must be letters only'
      ],
      emailRules: [
        v => !!v || 'Email is required',
        // v => v.length >= 3 || 'Pass must be more than 3 characters',
        v => (v && v.length <= 42) || 'Email must be less than 42 characters',
        v => /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(v) || 'Must be a valid email [address@domain.com]'
      ]
    }
  },
  computed: {
    serverMessage () {
      return this.$store.getters.serverMessage
    },
    loadedUsers () {
      return this.$store.getters.loadedUsers
    },
    token () {
      return this.$store.getters.token
    }
  },
  methods: {
    validate () {
      if (this.$refs.form.validate()) {
        /* eslint-disable */
        console.log('store', this.$store)
        this.$axios ({
          method: 'post',
          url: '/users/update',
          data: {
            username: this.loadedUsers.username,
            name: this.loadedUsers.name,
            surname: this.loadedUsers.surname,
            email: this.loadedUsers.email,
            bio: this.loadedUsers.bio,
            birth_date: this.loadedUsers.birth_date,
            gender_id: this.loadedUsers.gender_id,
            location: this.loadedUsers.location,
            notification: this.loadedUsers.notification,
            relationship: this.loadedUsers.relationship
          },
          headers: {
            'Authorization': 'Bearer ' + this.$store.getters.token,
            'user_id': this.$store.getters.loadedUsers.id
          }
        })
          .then((response) => {
          /* eslint-disable */
            console.log('response_axios_settings', response)
            console.log('response_client', response.client)
            this.$store.dispatch('setMessage', response.client)
            this.$router.push('/')
          })
          .catch((error) => {
            console.log ('error_axios_settings', error)
            console.log('error_client', error.response.data.client)
            this.$store.dispatch('setMessage', error.response.data.client)
          })
      }
    }
  },
  async asyncData (context) {
    const usersettings = await axios
      .get(process.env.serverUrl + '/users/user', {
        headers: {
          Authorization: 'Bearer ' + context.app.store.getters.token,
          user_id: context.app.store.getters.loadedUsers.id
        }
      })
      .then((response) => {
        /* eslint-disable */
        console.log('response_async_settings', response)
        context.store.dispatch('setUserData', response.data.userdata)
        context.store.dispatch('setMessage', response.client)
      })
      .catch((error) => {
        console.log('error_async_settings', error)
        console.log('error_client', error.response.data.client)
        context.store.dispatch('setMessage', error.response.data.client)
      })
    return {
      usersettings
    }
  }
}
</script>
