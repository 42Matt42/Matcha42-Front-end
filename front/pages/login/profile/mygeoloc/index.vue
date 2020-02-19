<template>
  <div>
    pop-up:<br>
    {{ serverMessage }}
    <br><br>
    <v-container
      class="font-weight-black"
    >
      Choose your location : )
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
                v-model="geoLoc.lat"
                label="Latitude"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col
              cols="10"
            >
              <v-text-field
                v-model="geoLoc.lng"
                label="Longitude"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col
              cols="10"
            >
              <v-text-field
                v-model="geoLoc.accuracy"
                label="Accuracy"
              />
            </v-col>
          </v-row>
          <br>
          <v-row>
            <v-col>
              <v-btn
                @click="sendGeoLoc"
                :disabled="!valid"
                color="purple lighten-4"
                class="mr-4"
              >
                Send my geoLoc to the back-end !
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-form>
      <v-row>
        <v-col>
          <v-btn
            @click="googleAPI"
            color="blue lighten-4"
            class="mr-4"
          >
            Get GeoLocalisation !
          </v-btn>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  middleware: 'authenticated',
  data () {
    return {
      valid: true
      // location: {
      //   lat: '',
      //   lng: ''
      // },
      // accuracy: ''
    }
  },
  computed: {
    serverMessage () {
      return this.$store.getters.serverMessage
    },
    geoLoc () {
      return this.$store.getters.geoLoc
    },
    loadedLocation () {
      return this.$store.getters.loadedLocation
    }
  },
  methods: {
    googleAPI () {
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
          console.log('response_statusText', response.statusText)
          this.$store.dispatch('setMessage', response.statusText)
          this.$store.dispatch('setGeoLoc', response.data)
          axios
            .get('https://nominatim.openstreetmap.org/reverse?format=json&lon=' + response.data.location.lng + '&lat=' + response.data.location.lat, {
              headers: {
                Authorization: 'Bearer ' + this.$store.getters.token
              }
            })
            .then((response) => {
              /* eslint-disable */
              console.log('response_GET_cityfinder', response)
              this.$store.dispatch('setLocation', response.data)
            })
            .catch((error) => {
              console.log('error_GET_cityfinder', error)
            })
          // this.$router.push('/')
        })
        .catch((error) => {
          console.log ('error_axios_googleAPIwelcomePage', error)
        })
    },
    sendGeoLoc () {
      if (this.$refs.form.validate()) {
        this.$axios ({
          method: 'post',
          url: process.env.serverUrl + '/edit/location',
          data: {
            accuracy: this.geoLoc.accuracy,
            lat: this.geoLoc.lat,
            lng: this.geoLoc.lng,
            country: this.loadedLocation.country,
            city:this.loadedLocation.city,
            district:this.loadedLocation.district
          },
          headers: {
            'Authorization': 'Bearer ' + this.$store.getters.token
          }
        })
          .then((response) => {
          /* eslint-disable */
            console.log('response_axios_geoLoc', response)
            this.$router.push('/')
          })
          .catch((error) => {
            console.log ('error_axios_geoLoc', error)
          })
        // this.$router.push('/')
      }
    }
  }
}
</script>
