<template>
  <div>
    <v-container
      v-if="loadedUsers.profile_complete === 1 && token"
    >
      <v-carousel
        :hide-delimiters="true"
        continuous
      >
        <v-carousel-item
          v-for="(item,i) in loadedSuggestions"
          :key="i"
          reverse-transition="fade-transition"
        >
          <v-card
            :hover="true"
            v-ripple="{ class: `purple--text` }"
            class="mx-auto"
            max-width="420"
          >
            <v-card-subtitle>
              <v-row justify="end">
                Online&nbsp;
              </v-row>
              <div class="headline font-weight-bold purple--text text--accent-4">
                {{ item.username }}
              </div>
              <div class="title font-italic purple--text text--accent-3">
                {{ myGender[item.gender_id - 1] }} {{ item.age }} y/o
              </div>
              <div class="title font-italic purple--text text--accent-3">
                Interested in {{ genderLF[item.interested_in - 1] }}
              </div>
              <v-row justify="end">
                Score: {{ item.score }}&nbsp;
              </v-row>
              <v-card-text class="purple--text text--lighten-5">
                <div>&nbsp;</div>
                <div>{{ item.name }} {{ item.surname }}</div>
                <div>&nbsp;</div>
                <div>Tags: {{ item.hobbies.toString() }}</div>
              </v-card-text>
              <v-card-text class="purple--text text--lighten-5">
                <div
                  v-if="item.location.country"
                >
                  Country: {{ item.location.country }}
                </div>
                <div>City: {{ item.location.city }}</div>
                <div
                  v-if="item.location.district"
                >
                  District: {{ item.location.district }}
                </div>
                <div>
                  Distance: {{ item.distance }} km
                </div>
              </v-card-text>
            </v-card-subtitle>
            <v-card-actions>
              <v-spacer />
              <v-btn
                @click="love(item.username)"
                fab
                color="pink lighten-3"
                bottom
                left
                absolute
                x-large
              >
                <v-icon>mdi-cards-heart</v-icon>
              </v-btn>
              <v-btn
                color="purple"
                text
              />
            </v-card-actions>
          </v-card>
        </v-carousel-item>
      </v-carousel>
    </v-container>
    <v-container
      v-else
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
    </v-container>
    <v-container>
      <div class="overline display-2 text-center">
        <br><br>Let's find The One ~~<br>
      </div>
    </v-container>
  </div>
</template>

<script>
// import axios from 'axios'
import BigHeartLogo from '~/components/layout/BigHeartLogo.vue'

export default {
  components: {
    BigHeartLogo
  },
  data () {
    return {
      myGender: ['Bi', 'Man', 'Woman'],
      genderLF: ['Men & Women', 'Men', 'Women']
    }
  },
  computed: {
    serverMessage () {
      return this.$store.getters.serverMessage
    },
    loadedMapPosition () {
      return this.$store.getters.loadedMapPosition
    },
    loadedLocation () {
      return this.$store.getters.loadedLocation
    },
    loadedUsers () {
      return this.$store.getters.loadedUsers
    },
    token () {
      return this.$store.getters.token
    },
    loadedSuggestions () {
      return this.$store.getters.loadedSuggestions
    }
  },
  async asyncData (context) {
  // const mySuggestions = await axios
  //     .get(process.env.serverUrl + '/social/potential', {
  //       params: {
  //         number: 42
  //       },
  //       headers: {
  //         Authorization: 'Bearer ' + context.app.store.getters.token
  //       }
  //     })
  //     .then((response) => {
  //       /* eslint-disable */
  //       console.log('response_GET_Suggestions', response)
  //       context.store.dispatch('setSuggestions', response.data.client)
  //       context.store.dispatch('setMessage', response.statusText)
  //     })
  //     .catch((error) => {
  //       console.log('error_GET_Suggestions', error)
  //       console.log('error_client', error.response.statusText)
  //       context.store.dispatch('setMessage', error.response.statusText)
  //     })
    // if (!context.store.getters.loadedMapPosition) {
    /* eslint-disable */
    console.log('context', context)
    // let promise = new Promise((resolve, reject) => {
    const options = {
      enableHighAccuracy: true,
      timeout: 8000,
      maximumAge: 60000
    }
    function success(position) {
      const userAcceptsGeoloc = position.coords
      let location = {}
      console.log('context: ', context)
      console.log(`Latitude : ${userAcceptsGeoloc.latitude}`)
      console.log(`Longitude: ${userAcceptsGeoloc.longitude}`)
      console.log(`Accuracy: ${userAcceptsGeoloc.accuracy} meters`)
      location.lat = userAcceptsGeoloc.latitude
      location.lng = userAcceptsGeoloc.longitude
      const accuracy = userAcceptsGeoloc.accuracy
      context.store.dispatch('setMapPosition', {accuracy, location})
      setTimeout(() => context.store.dispatch('setReverseGeoloc'), 500)
      setTimeout(() => context.store.dispatch('sendGeoloc'), 1000)
    }
    function error(error) {
      console.log(`ERROR(${error.code}): ${error.message}`)
      context.store.dispatch('setIpGeoloc')
      setTimeout(() => context.store.dispatch('setReverseGeoloc'), 1000)
      setTimeout(() => context.store.dispatch('sendGeoloc'), 1500)
    }
    if ("geolocation" in navigator && context.store.getters.loadedMapPosition) {
      const geolocPosition = await navigator.geolocation.getCurrentPosition(success, error, options)
    }
    return {
      // mySuggestions
    }
  }
    //   const geoloc = await axios({
    //     method: 'post',
    //     url: 'https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyB2gxSBdA8xQ41FO66wPud8xJa1GIArZgU',
    //     data: {
    //       considerIp: 'true'
    //     }
    //   })
    //     .then((response) => {
    //     /* eslint-disable */
    //       console.log('response_axios_googleAPI', response)
    //       console.log('response_statusText', response.statusText)
    //       context.store.dispatch('setMessage', response.statusText)
    //       context.store.dispatch('setMapPosition', response.data)
    //       axios
    //         .get('https://nominatim.openstreetmap.org/reverse?format=json&lon=' + response.data.location.lng + '&lat=' + response.data.location.lat, {
    //           headers: {
    //             Authorization: 'Bearer ' + context.store.getters.token
    //           }
    //         })
    //         .then((response) => {
    //           /* eslint-disable */
    //           console.log('response_GET_cityfinder', response)
    //           context.store.dispatch('setLocation', response.data)
    //           axios.post({
    //             method: 'post',
    //             // url: process.env.serverUrl + '/edit/location',
    //             url: 'http://10.12.5.2:8080/api/edit/location',
    //             data: {
    //               location: {
    //                 accuracy: context.store.getters.loadedMapPosition.accuracy,
    //                 lat: context.store.getters.loadedMapPosition.lat,
    //                 lng: context.store.getters.loadedMapPosition.lng,
    //                 country: context.store.getters.loadedLocation.country,
    //                 city: context.store.getters.loadedLocation.city,
    //                 district: context.store.getters.loadedLocation.district
    //               }
    //             // },
    //             // headers: {
    //             //   'Authorization': 'Bearer ' + context.store.getters.token
    //             }
    //           })
    //             .then((response) => {
    //             /* eslint-disable */
    //               console.log('response_POST_edit/location', response)
    //             })
    //             .catch((error) => {
    //               console.log ('error_POST_edit/location', error)
    //             })
    //         })
    //         .catch((error) => {
    //           console.log('error_GET_cityfinder', error)
    //         })
    //       // this.$router.push('/')
    //     })
    //     .catch((error) => {
    //       console.log ('error_axios_googleAPIwelcomePage', error)
    //     })
    //   return {
    //     geoloc
    //   }
    // }
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
