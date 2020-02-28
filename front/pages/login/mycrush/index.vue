<template>
  <div>
    <br><v-divider v-if="checker === true" /><br>
    <v-container fluid>
      <v-row>
        <v-col>
          <v-row
            justify="center"
          >
            <nuxt-link to="/login/mycrush/mylikes">
              <v-btn
                color="deep-purple accent-3"
                dark
              >
                My Likes
                &nbsp;
                <v-icon>
                  mdi-heart
                </v-icon>
              </v-btn>
            </nuxt-link>
          </v-row>
        </v-col>
        <v-col>
          <v-row
            justify="center"
          >
            <nuxt-link to="/login/mycrush/myviews">
              <v-btn
                color="indigo accent-2"
                dark
              >
                My Views
                &nbsp;
                <v-icon>
                  mdi-bullseye-arrow
                </v-icon>
              </v-btn>
            </nuxt-link>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
    <br><v-divider /><br>
    <v-container
      class="font-weight-black purple--text text--lighten-5"
    >
      My crushes
    </v-container>
    {{ loadedSuggestions }}
    <v-list style="background-color: transparent">
      <v-list-item
        v-for="(item, i) in filterSuggest(loadedSuggestions)"
        :key="i"
      >
        <div>
          <v-icon
            class="purple--text text--lighten-5"
          >
            mdi-heart
          </v-icon>
          <v-list-item-title
            class="purple--text text--lighten-5 text-xs-left"
          >
            &nbsp;&nbsp;Username: {{ item.username }}
          </v-list-item-title>
          <v-card
            :hover="true"
            v-ripple="{ class: `purple--text` }"
            class="mx-auto"
            max-width="434"
          >
            <v-card-subtitle>
              <div>
                <v-row justify="end">
                  Online
                </v-row>
                <div class="headline font-weight-bold purple--text text--accent-4">
                  {{ item.username }}
                </div>
                <div class="title font-italic purple--text text--accent-3">
                  <div
                    v-if="item.gender_id === 1"
                  >
                    Male, {{ item.age }} y/o
                  </div>
                  <div
                    v-else
                  >
                    Female, {{ item.age }} y/o
                  </div>
                </div>
                <div class="title font-italic purple--text text--accent-3">
                  <div
                    v-if="item.interested_in === 2"
                  >
                    Interested in Men
                  </div>
                  <div
                    v-if="item.interested_in === 3"
                  >
                    Interested in Women
                  </div>
                  <div
                    v-if="item.interested_in === 1"
                  >
                    Bi
                  </div>
                </div>
                <v-row justify="end">
                  Score: {{ item.score }}
                </v-row>
              </div>
            </v-card-subtitle>

            <v-card-text class="text--primary">
              <div>&nbsp;</div>
              <div>{{ item.name }} {{ item.surname }}</div>
              <div>&nbsp;</div>
              <div>Tags: {{ item.hobbies }}</div>
              <div>&nbsp;</div>
              <div>Distance: {{ item.distance }} km</div>
            </v-card-text>
            <v-card-text class="text--primary">
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
            </v-card-text>

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
        </div>
      </v-list-item>
    </v-list>
    <div v-if="checker === false">
      <p>
        Please, 42user, go back to the welcome page and try again !
      </p>
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
    }
  },
  computed: {
    checker () {
      return this.$store.getters.checker
    },
    serverMessage () {
      return this.$store.getters.serverMessage
    },
    loadedSuggestions () {
      return this.$store.getters.loadedSuggestions
    },
    token () {
      return this.$store.getters.token
    }
  },
  async asyncData (context) {
    const mySuggestions = await axios
      .get(process.env.serverUrl + '/social/potential', {
        params: {
          number: 8
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
    return {
      mySuggestions
    }
  },
  methods: {
    filterSuggest (suggest) {
      return suggest.filter(function (suggest) {
        // love.loveAge = moment(love.date, 'X').fromNow()
        // love.date = moment(love.date, 'X').format('MMMM Do YYYY, h:mm:ss a')
        return suggest
      })
    },
    love (target) {
      context.store.dispatch('setChecker', false)
      this.$axios({
        method: 'post',
        url: process.env.serverUrl + '/social/like',
        // url: '/t/bd05h-1581710318/post',
        data: {
          username: target
        },
        headers: {
          'Authorization': 'Bearer ' + this.$store.getters.token
        }
      })
        .then((response) => {
        /* eslint-disable */
          console.log('response_POST_like', response)
          console.log('response_client', response.client)
          this.$store.dispatch('setMessage', response.client)
          context.store.dispatch('setChecker', true)
        })
        .catch((error) => {
          console.log ('error_POST_like', error)
          console.log('error_client', error.response.data.client)
          this.$store.dispatch('setMessage', error.response.data.client)
        })
    }
  }
}
</script>
