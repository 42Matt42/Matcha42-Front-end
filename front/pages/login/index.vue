<template>
  <div>
    pop-up:<br>
    {{ serverMessage }}
    <br><br>
    <v-container
      class="font-weight-black"
    >
      Log in form
    </v-container>
    <div>
      <br>
      <v-form
        ref="form"
        v-model="valid"
        lazy-validation
      >
        <v-container>
          <v-row>
            <v-col
              cols="10"
            >
              <v-text-field
                v-model="login.username"
                counter="20"
                label="Username"
                required
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col
              cols="10"
            >
              <div>
                <v-text-field
                  v-model="login.password"
                  :type="passwordVisible ? 'text' : 'password'"
                  counter="20"
                  label="Password"
                  required
                />
              </div>
            </v-col>
            <v-col
              cols="1"
            >
              <div
                @click="togglePasswordVisibility"
                :arial-label="passwordVisible ? 'Hide password' : 'Show password'"
                tabindex="-1"
              >
                <v-icon
                  v-if="passwordVisible"
                  large
                >
                  mdi-eye
                </v-icon>
                <v-icon
                  v-else
                  large
                >
                  mdi-eye-off
                </v-icon>
              </div>
            </v-col>
          </v-row>
          <br>
          <v-row>
            <v-col>
              <v-btn
                @click="validate"
                :disabled="!valid"
                color="success"
                class="mr-4"
              >
                Log in
              </v-btn>
            </v-col>
          </v-row>
          <br>
          Did you forget your pass?
          <nuxt-link to="/reset">
            Reset password
          </nuxt-link>
        </v-container>
      </v-form>
    </div>
  </div>
</template>

<script>
export default {
  middleware: 'notAuthenticated',
  data () {
    return {
      login: {
        username: '',
        password: ''
      },
      valid: true,
      // usernameRules: [
      //   v => !!v || 'Username is required',
      //   // v => v.length >= 3 || 'Pass must be more than 3 characters',
      //   v => (v && v.length <= 20) || 'Password must be less than 20 characters',
      //   v => /.{3,}/.test(v) || '3 characters minimum.',
      //   v => /^[a-zA-Z0-9_.-]*$/.test(v) || 'Must be alphanumeric characters [Abc123...]'
      // ],
      // passRules: [
      //   v => !!v || 'Password is required',
      //   // v => v.length >= 3 || 'Pass must be more than 3 characters',
      //   v => (v && v.length <= 20) || 'Password must be less than 20 characters',
      //   v => /[a-z]+/.test(v) || '1 lowercase letter [abc...] required.',
      //   v => /[A-Z]+/.test(v) || '1 uppercase letter [ABC...] required.',
      //   v => /.{8,}/.test(v) || '8 characters minimum.',
      //   v => /[0-9]+/.test(v) || '1 number [0123...] required.'
      // ],
      passwordVisible: false
    }
  },
  computed: {
    serverMessage () {
      return this.$store.getters.serverMessage
    }
  },
  methods: {
    validate () {
      if (this.$refs.form.validate()) {
        this.$axios
          .$post(process.env.serverUrl + '/users/login', {
            username: this.login.username,
            password: this.login.password
          })
          .then((response) => {
          /* eslint-disable */
            console.log('response_login', response)
            this.$store.dispatch('setUserData', response.userdata)
            this.$store.dispatch('setToken', response.token)
            console.log('response_client', response.client)
            this.$store.dispatch('setMessage', response.client)
            if (response.userdata.profile_complete === 0)
              this.$router.push('/login/settings')
            else
              this.$router.push('/')
          })
          .catch((error) => {
            console.log('error_login', error)
            console.log('error_client', error.response.data.client)
            this.$store.dispatch('setMessage', error.response.data.client)
            console.log('error.response.status_login', error.response.status)
          })
      }
    },
    togglePasswordVisibility () {
      this.passwordVisible = !this.passwordVisible
    }
  }
}
</script>
