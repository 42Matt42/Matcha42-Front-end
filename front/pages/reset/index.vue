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
                v-model="reset.email"
                :rules="emailRules"
                counter="42"
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
              color="blue lighten-4"
              class="mr-4"
            >
              Validate
            </v-btn>
          </v-row>
        </v-container>
      </v-form>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      reset: {
        email: ''
      },
      valid: true,
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
    }
  },
  methods: {
    validate () {
      if (this.$refs.form.validate()) {
        this.$axios
          .$post(process.env.serverUrl + '/users/reset', {
            email: this.reset.email
          })
          .then((response) => {
          /* eslint-disable */
            console.log('response', response)
            console.log('response_client', response.client)
            this.$store.dispatch('setMessage', response.client)
            this.$router.push('/')
          })
          .catch((error) => {
            console.log('error', error)
            console.log('error_client', error.response.data.client)
            this.$store.dispatch('setMessage', error.response.data.client)
          })
      }
    }
  }
}
</script>
