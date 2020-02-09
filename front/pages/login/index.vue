<template>
  <div>
    pop-up:<br>
    {{ serverMessage }}
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
                v-model="login.username"
                :rules="usernameRules"
                :counter="20"
                label="Username"
                required
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col
              cols="5"
            >
              <div>
                <v-text-field
                  v-model="login.password"
                  :rules="passRules"
                  :counter="20"
                  :type="passwordVisible ? 'text' : 'password'"
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
            <v-btn
              @click="validate"
              :disabled="!valid"
              color="success"
              class="mr-4"
            >
              Validate
            </v-btn>
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
      usernameRules: [
        v => !!v || 'Username is required',
        // v => v.length >= 3 || 'Pass must be more than 3 characters',
        v => (v && v.length <= 20) || 'Password must be less than 20 characters',
        v => /.{3,}/.test(v) || '3 characters minimum.',
        v => /^[a-zA-Z0-9_.-]*$/.test(v) || 'Must be alphanumeric characters [Abc123...]'
      ],
      passRules: [
        v => !!v || 'Password is required',
        // v => v.length >= 3 || 'Pass must be more than 3 characters',
        v => (v && v.length <= 20) || 'Password must be less than 20 characters',
        v => /[a-z]+/.test(v) || '1 lowercase letter [abc...] required.',
        v => /[A-Z]+/.test(v) || '1 uppercase letter [ABC...] required.',
        v => /.{8,}/.test(v) || '8 characters minimum.',
        v => /[0-9]+/.test(v) || '1 number [0123...] required.'
      ],
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
    },
    togglePasswordVisibility () {
      this.passwordVisible = !this.passwordVisible
    }
  }
}
</script>
