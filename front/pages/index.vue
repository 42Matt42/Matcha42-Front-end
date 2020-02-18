<template>
  <section class="">
    <v-container
      justify-center
      align-center
    >
      <BigHeartLogo />
      <h1 class="display-3 font-italic font-weight-medium text-center">
        <br><br>Matcha<br><br>
      </h1>
      <h2 class="display-2 font-italic font-weight-light text-center">
        The lovely dating platform !
      </h2>
      <div class="overline display-2 text-center">
        <br><br><br><br>Let's find The One ~~<br>
      </div>
      <br><br>
      pop-up:<br>
      {{ serverMessage }}
      <br><br>
    </v-container>
  </section>
</template>

<script>
import axios from 'axios'
import BigHeartLogo from '~/components/layout/BigHeartLogo.vue'

export default {
  components: {
    BigHeartLogo
  },
  computed: {
    serverMessage () {
      return this.$store.getters.serverMessage
    }
  },
  async asyncData (context) {
    if (context.store.getters.geoLoc) {
      /* eslint-disable */
      console.log('context', context)
      // if (context.store.getters.token) {
      const geoloc = await axios({
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
          context.store.dispatch('setMessage', response.statusText)
          context.store.dispatch('setGeoLoc', response.data)
        })
        .catch((error) => {
          console.log ('error_axios_googleAPIwelcomePage', error)
          console.log('error_client', error.response.data)
          context.store.dispatch('setMessage', error.response.data.client)
        })
      return {
        geoloc
      }
    }
  }
}
</script>

<style scoped>

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
  'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-weight: 300;
  font-size: 100px;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
}

.links {
  padding-top: 15px;
}
</style>
