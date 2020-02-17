<template>
  <div>
    pop-up:<br>
    {{ serverMessage }}
    <br><br>
    <div>
      <br><v-divider :inset="inset" /><br>
      <v-row class="justify-center">
        <v-col md="4">
          <nuxt-link to="/login/settings/mypics">
            <v-btn
              class="ma-2"
              color="purple accent-3"
              dark
            >
              My Pics
              &nbsp;
              <v-icon
                class="purple--text text--lighten-5"
              >
                mdi-camera
              </v-icon>
            </v-btn>
          </nuxt-link>
        </v-col>
        <v-col md="4">
          <nuxt-link to="/login/settings/mygeoloc">
            <v-btn
              class="ma-2"
              color="blue accent-3"
              dark
            >
              My geoLoc
              &nbsp;
              <v-icon
                class="purple--text text--lighten-5"
              >
                mdi-compass
              </v-icon>
            </v-btn>
          </nuxt-link>
        </v-col>
      </v-row>
      <br><v-divider :inset="inset" /><br>
      <v-container
        class="font-weight-black"
      >
        Update your personal information
      </v-container>
      <div>
        <v-form
          ref="form"
          v-model="valid"
          lazy-validation
        >
          <v-container>
            <v-row>
              <v-col>
                <v-btn
                  @click="validate"
                  :disabled="!valid"
                  color="blue lighten-4"
                  class="mr-4"
                >
                  Update
                </v-btn>
              </v-col>
            </v-row>
            <v-row>
              <v-col
                cols="10"
              >
                <v-text-field
                  v-model="loadedUsers.username"
                  :rules="usernameRules"
                  counter="20"
                  label="Username"
                  required
                />
              </v-col>
            </v-row>
            <v-row>
              <v-col
                cols="5"
              >
                <v-text-field
                  v-model="loadedUsers.name"
                  :rules="nameRules"
                  counter="20"
                  label="First name"
                  required
                />
              </v-col>
              <v-col
                cols="5"
              >
                <v-text-field
                  v-model="loadedUsers.surname"
                  :rules="nameRules"
                  counter="20"
                  label="Last name"
                  required
                />
              </v-col>
            </v-row>
            <v-row>
              <v-col
                cols="10"
              >
                <v-text-field
                  v-model="loadedUsers.email"
                  :rules="emailRules"
                  counter="42"
                  label="Email"
                  required
                />
              </v-col>
            </v-row>
            <v-row>
              <v-col
                cols="5"
              >
                <v-text-field
                  v-model="loadedUsers.birth_date"
                  readonly
                  label=" Birth date (use the calendar to pick)"
                />
                <v-date-picker
                  v-model="loadedUsers.birth_date"
                  :landscape="false"
                  min="1921-01-01"
                  max="2002-05-05"
                  color="purple lighten-4"
                  year-icon="mdi-calendar-blank"
                />
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-radio-group
                  v-model="loadedUsers.gender_id"
                  row="row"
                >
                  My gender is...&nbsp;&nbsp;
                  <v-radio :value="2" label="Female" />
                  <v-radio :value="1" label="Male" />
                </v-radio-group>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-radio-group
                  v-model="loadedUsers.interested_in"
                  row="row"
                  max="1"
                >
                  I am interested in...&nbsp;&nbsp;
                  <v-radio :value="3" label="Women" />
                  <v-radio :value="2" label="Men" />
                  <v-radio :value="1" label="Both" />
                </v-radio-group>
              </v-col>
            </v-row>
            <v-row>
              <v-col
                cols="10"
              >
                <v-textarea
                  v-model="loadedUsers.bio"
                  :rules="bioRules"
                  :auto-grow="true"
                  :filled="true"
                  :rounded="true"
                  counter="252"
                  placeholder="I love hairy Chewbaccas and I eat a bunch at breakfast"
                  label="My description"
                  required
                />
              </v-col>
            </v-row>
            <v-row>
              <v-col
                cols="3"
              >
                <v-text-field
                  v-model="loadedUsers.notification"
                  label="Notification"
                  required
                />
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-btn
                  @click="validate"
                  :disabled="!valid"
                  color="blue lighten-4"
                  class="mr-4"
                >
                  Update
                </v-btn>
              </v-col>
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
// import axios from 'axios'

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
        v => (v && v.length <= 42) || 'Email must be less than 42 characters',
        v => /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(v) || 'Must be a valid email [address@domain.com]'
      ],
      bioRules: [
        v => !!v || 'Description is required',
        v => (v && v.length >= 12) || '12 characters minimum',
        v => (v && v.length <= 252) || 'Description must be less than 252 characters',
        v => /[^\t\n\r]/.test(v) || 'Only spaces authorized'
      ]
      // for test purposes when the server is off:
      // loadedUsers: {
      //   interested_in: '1',
      //   gender_id: '1',
      //   birth_date: '2000-01-01',
      //   bio: ''
      // }
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
          url: process.env.serverUrl + '/users/user',
          data: {
            username: this.loadedUsers.username,
            name: this.loadedUsers.name,
            surname: this.loadedUsers.surname,
            email: this.loadedUsers.email,
            bio: this.loadedUsers.bio,
            birth_date: this.loadedUsers.birth_date,
            gender_id: this.loadedUsers.gender_id,
            notification: this.loadedUsers.notification,
            interested_in: this.loadedUsers.interested_in
          },
          headers: {
            'Authorization': 'Bearer ' + this.$store.getters.token
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
        this.$router.push('/settings')
      }
    }
  // },
  // async asyncData (context) {
  //   const usersettings = await axios
  //     .get(process.env.serverUrl + '/users/user', {
  //       headers: {
  //         Authorization: 'Bearer ' + context.app.store.getters.token
  //       }
  //     })
  //     .then((response) => {
  //       /* eslint-disable */
  //       console.log('response_async_settings', response)
  //       context.store.dispatch('setUserData', response.data.userdata)
  //       context.store.dispatch('setMessage', response.client)
  //     })
  //     .catch((error) => {
  //       console.log('error_async_settings', error)
  //       console.log('error_client', error.response.data.client)
  //       context.store.dispatch('setMessage', error.response.data.client)
  //     })
  //   return {
  //     usersettings
  //   }
  }
}
</script>
