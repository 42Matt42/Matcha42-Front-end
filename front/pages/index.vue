<template>
  <div>
    <div v-if="checker === true">
      <v-row>
        <v-col>
          <v-row>
            <v-range-slider
              v-model.lazy="filterAge"
              :thumb-size="32"
              thumb-label="always"
              track-fill-color="purple accent-4"
              thumb-color="indigo accent-2"
              track-color="purple lighten-3"
              min="18"
              max="100"
              label="Age"
            >
              <v-text-field
                :value="filterAge[0]"
              />
              <v-text-field
                :value="filterAge[1]"
              />
            </v-range-slider>
          </v-row>
        </v-col>
        <v-col>
          <v-row>
            <v-slider
              v-model.lazy="filterDistance"
              :thumb-size="32"
              :rules="distanceRules"
              max="20000"
              thumb-label="always"
              thumb-color="deep-purple accent-3"
              label="Distance (km)"
              track-color="purple lighten-3"
              track-fill-color="purple accent-4"
            />
          </v-row>
        </v-col>
        <v-col>
          <v-row>
            <v-range-slider
              v-model="filterScore"
              :rules="scoreRules"
              :thumb-size="34"
              track-fill-color="purple accent-4"
              thumb-label="always"
              thumb-color="indigo accent-2"
              track-color="purple lighten-3"
              min="0"
              max="1000"
              label="Popularity"
            >
              <v-text-field
                :value="filterScore[0]"
              />
              <v-text-field
                :value="filterScore[1]"
              />
            </v-range-slider>
          </v-row>
        </v-col>
        <v-col>
          <v-row>
            <v-text-field
              v-model.lazy="filterTags"
            />
            <v-select
              v-model.lazy="filterTags"
              :items="hobbies"
              label="Tag"
              outlined
            />
          </v-row>
        </v-col>
      </v-row>
    </div>
    <v-container
      v-if="loadedUsers.profile_complete === 1 && token"
    >
      <v-carousel
        :hide-delimiters="true"
        continuous
        height="550px"
      >
        <v-carousel-item
          v-for="(itemSuggestions,k) in loadedSuggestions"
          :key="k"
          reverse-transition="fade-transition"
        >
          <nuxt-link
            :to="{ path: `/login/user/${itemSuggestions.username}` }"
          >
            <v-card
              :hover="true"
              v-ripple="{ class: `purple--text` }"
              class="mx-auto"
              max-width="420"
            >
              <v-card-subtitle>
                <div class="headline font-weight-bold purple--text text--accent-4">
                  {{ itemSuggestions.username }}
                </div>
                <div class="title font-italic purple--text text--accent-3">
                  {{ myGender[itemSuggestions.gender_id - 1] }} {{ itemSuggestions.age }} y/o
                </div>
                <div class="title font-italic purple--text text--accent-3">
                  Interested in {{ genderLF[itemSuggestions.interested_in - 1] }}
                </div>
                <v-row justify="end">
                  Score: {{ itemSuggestions.score }}&nbsp;
                </v-row>
                <v-card-text class="purple--text text--lighten-5">
                  <div>{{ itemSuggestions.name }} {{ itemSuggestions.surname }}</div>
                  <div>Tags: {{ hobbies.toString() }}</div>
                </v-card-text>
                <v-card-text class="purple--text text--lighten-5">
                  <div
                    v-if="itemSuggestions.location.country"
                  >
                    Country: {{ itemSuggestions.location.country }}
                  </div>
                  <div>City: {{ itemSuggestions.location.city }}</div>
                  <div
                    v-if="itemSuggestions.location.district"
                  >
                    District: {{ itemSuggestions.location.district }}
                  </div>
                  <div>
                    Distance: {{ itemSuggestions.distance }} km
                  </div>
                </v-card-text>
              </v-card-subtitle>
              <v-card-actions>
                <v-spacer />
                <v-btn
                  @click="love(itemSuggestions.username)"
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
          </nuxt-link>
        </v-carousel-item>
      </v-carousel>
    </v-container>
    <v-container
      v-else
      justify-center
      align-center
    >
      <BigHeartLogo />
      <h1 class="display-3 font-italic font-weight-medium text-center ">
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
import axios from 'axios'
import BigHeartLogo from '~/components/layout/BigHeartLogo.vue'

export default {
  components: {
    BigHeartLogo
  },
  data () {
    return {
      myGender: ['Bi', 'Man', 'Woman'],
      genderLF: ['Men & Women', 'Men', 'Women'],
      hobbies: ['#gamer', '#surfer', '#hacker', '#starwars', '#meditation', '#42', '#geek', '#fashion', '#hipster', '#horse', '#vegan', '#meat', '#', '#coding', '#C', '#python', '#anime', '#yachting', '#matcha', '#macron'],
      filterAge: [18, 100],
      filterDistance: 20000,
      filterScore: [0, 1000],
      filterTags: ''
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
    const options = {
      enableHighAccuracy: true,
      timeout: 8000,
      maximumAge: 60000
    }
    let mySuggestions = []

    function success (position) {
      const userAcceptsGeoloc = position.coords
      const location = {}
      // eslint-disable-next-line
      console.log('context: ', context)
      // eslint-disable-next-line
      console.log(`Latitude : ${userAcceptsGeoloc.latitude}`)
      // eslint-disable-next-line
      console.log(`Longitude: ${userAcceptsGeoloc.longitude}`)
      // eslint-disable-next-line
      console.log(`Accuracy: ${userAcceptsGeoloc.accuracy} meters`)
      location.lat = userAcceptsGeoloc.latitude
      location.lng = userAcceptsGeoloc.longitude
      const accuracy = userAcceptsGeoloc.accuracy
      context.store.dispatch('setMapPosition', { accuracy, location })
      context.store.dispatch('setReverseGeoloc')
    }
    function error (error) {
      // eslint-disable-next-line
      console.log(error.message)
      context.store.dispatch('setIpGeoloc')
    }

    if (context.app.store.getters.token) {
      // geolocalisation process
      if ('geolocation' in navigator) {
        await navigator.geolocation.getCurrentPosition(success, error, options)
      }
      //  process
      mySuggestions = await axios
        .get(process.env.serverUrl + '/social/potential', {
          params: {
            number: 3
          },
          headers: {
            Authorization: 'Bearer ' + context.app.store.getters.token
          }
        })
        .then((response) => {
          /* eslint-disable */
          console.log('response_GET_Suggestions', response)
          context.store.dispatch('setSuggestions', response.data.client)
          context.store.dispatch('setMessage', response.statusText)
        })
        .catch((error) => {
          console.log('error_GET_Suggestions', error)
          console.log('error_client', error.response.statusText)
          context.store.dispatch('setMessage', error.response.statusText)
        })
    }
    return {
      mySuggestions
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
