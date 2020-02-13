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
                v-model="location.lat"
                label="Latitude"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col
              cols="10"
            >
              <v-text-field
                v-model="location.lng"
                label="Longitude"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col
              cols="10"
            >
              <v-text-field
                v-model="accuracy"
                label="Accuracy"
              />
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
                Get GeoLocalisation !
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-form>
    </div>
  </div>
</template>

<script>

export default {
  middleware: 'authenticated',
  data () {
    return {
      valid: true,
      location: {
        lat: '',
        lng: ''
      },
      accuracy: ''
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
        /* eslint-disable */
        console.log('store', this.$store)
        this.$axios ({
          method: 'post',
          url: 'https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyB2gxSBdA8xQ41FO66wPud8xJa1GIArZgU',
          data: {
            homeMobileCountryCode: 310,
            homeMobileNetworkCode: 410,
            radioType: 'gsm',
            carrier: 'Vodafone',
            considerIp: 'true',
            cellTowers: [
              // See the Cell Tower Objects section below.
            ],
            wifiAccessPoints: [
              // See the WiFi Access Point Objects section below.
            ]
          }
        })
          .then((response) => {
          /* eslint-disable */
            console.log('response_axios_googleAPI', response)
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
        // this.$axios ({
        //   method: 'get',
        //   url: process.env.serverUrl + '/users/user',
        //   headers: {
        //     'Authorization': 'Bearer ' + this.$store.getters.token
        //   }
        // })
        //   .then((response) => {
        //   /* eslint-disable */
        //     console.log('response_axios_settings_user2', response)
        //   })
        //   .catch((error) => {
        //     console.log ('error_axios_settings_user2', error)
        //     console.log('error_client', error.response.data.client)
        //     this.$store.dispatch('setMessage', error.response.data.client)
        //   })
      }
    }
  }
}
</script>
