<template>
  <div>
    pop-up:<br>
    {{ serverMessage }}
    <br><br>
    checker:<br>
    {{ checker }}
    <div v-if="checker === true">
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
                  v-model="checkRegister.username"
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
                  v-model="checkRegister.name"
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
                  v-model="checkRegister.surname"
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
                  v-model="checkRegister.email"
                  :rules="emailRules"
                  :counter="42"
                  label="Email"
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
                    v-model="checkRegister.password"
                    :rules="passRules"
                    :counter="20"
                    :type="passwordVisible ? 'text' : 'password'"
                    label="Password"
                    required
                  />
                </div>
              </v-col>

              <v-col
                cols="5"
              >
                <v-text-field
                  v-model="password2"
                  :rules="passRules"
                  :counter="20"
                  :type="passwordVisible ? 'text' : 'password'"
                  label="Confirm your password"
                  required
                />
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
                v-if="samePasswords"
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
          Did you forget your pass?
          <nuxt-link to="/reset">
            Reset password
          </nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  middleware: 'notAuthenticated',
  data () {
    return {
      checkRegister:
      {
        username: '',
        name: '',
        surname: '',
        email: '',
        password: ''
      },
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
      ],
      password2: '',
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
    samePasswords () {
      if (this.checkRegister.password === this.password2 && this.checkRegister.password.length > 0) {
        return true
      } else {
        return false
      }
    },
    serverMessage () {
      return this.$store.getters.serverMessage
    }
  },
  methods: {
    validate () {
      if (this.$refs.form.validate()) {
        this.$store.dispatch('registerUser', this.checkRegister)
        this.$router.push('/')
      //   this.snackbar = true
      }
    },
    togglePasswordVisibility () {
      this.passwordVisible = !this.passwordVisible
    }
  }
}
</script>

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
      },
      checker: 'false'
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
    ],
    serverMessage () {
      return this.$store.getters.serverMessage
    },
    loadedUsers () {
      return this.$store.getters.loadedUsers
    }
  },
  methods: {
    gettest () {
      this.$store.dispatch('getUserData')
      this.$router.push('/')
    },
    valid () {
      this.$axios
        .$post(process.env.serverUrl + '/users/settings', {
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
    const usersettings = await axios
      .get(process.env.serverUrl + '/users/user', {
        headers: {
          Authorization: 'Bearer ' + context.app.store.getters.token,
          user_id: context.app.store.getters.loadedUsers.id
        }
      })
      .then((response) => {
        /* eslint-disable */
        console.log('response_settings', response)
        context.store.dispatch('setMessage', response.client)
      })
      .catch((error) => {
        console.log('error_settings', error)
        console.log('error_client', error.response.data.client)
        context.store.dispatch('setMessage', error.response.data.client)
      })
    return {
      usersettings
    }
  }
}
</script>
