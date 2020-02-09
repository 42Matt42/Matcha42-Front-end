<template>
  <div>
    pop-up:<br>
    {{ serverMessage }}
    <br><br>
    checker:<br>
    {{ checker }}
    <div v-if="checker === true">
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
              md="4"
            >
              <v-text-field
                v-model="username"
                label="Username"
                required
                readonly
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col
              cols="5"
            >
              <div>
                <v-text-field
                  v-model="password1"
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
    </div>
    <div v-else>
      Link already used
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      valid: true,
      password1: '',
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
      // username: ''
    }
  },
  computed: {
    checker () {
      return this.$store.getters.checker
    },
    username () {
      return this.$store.getters.loadedUsers.username
    },
    samePasswords () {
      if (this.password1 === this.password2 && this.password1.length > 0) {
        return true
      } else {
        return false
      }
    },
    serverMessage () {
      return this.$store.getters.serverMessage
    }
  },
  async asyncData (context) {
    const user = await axios
      .get(process.env.serverUrl + '/password', {
        params: {
          id: context.query.id,
          username: context.query.username
        }
      })
      .then((response) => {
        /* eslint-disable */
        console.log(response)
        console.log(context)
        // const status =
        //   JSON.parse(response.status)
        context.store.commit('setChecker', false)
        if (response.status == '200') {
          // context.redirect(`${process.env.baseUrl}/pass/${context.query.username}`)
          context.store.commit(set)
          context.store.commit('setMessage', response.statusText)
          context.store.commit('setChecker', true)
          context.store.commit('setUsername', context.query.username)
        }
      })
      .catch(function(error) {
        /* eslint-disable */
        console.log(error)
        context.store.commit('setMessage', error.statusText)
      })
      return {
        user
      }
  },
  methods: {
    validate () {
      console.log(this.$refs.form.validate())
      // if (this.$refs.form.validate()) {
      //   this.snackbar = true
      // }
    },
    togglePasswordVisibility () {
			this.passwordVisible = !this.passwordVisible
		}
  }
}
</script>
