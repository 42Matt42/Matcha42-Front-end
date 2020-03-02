<template>
  <div>
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
    <v-container
      class="font-weight-black purple--text text--lighten-5"
    >
      My crushes
    </v-container>
    <v-container style="background-color: transparent">
      <v-list style="background-color: transparent">
        <v-list-item
          v-for="(itemMatchs, a) in loadedMatchList"
          :key="a"
        >
          <nuxt-link
            :to="{ path: `/login/user/${itemMatchs.username}` }"
          >
            <div>
              <p
                class="text-xs-right"
              >
                <v-list-item-title
                  class="purple--text text--lighten-5 text-xs-left"
                >
                  <v-icon
                    class="purple--text text--lighten-5"
                  >
                    mdi-heart
                  </v-icon>
                  {{ itemMatchs.username }}
                  <v-icon
                    class="purple--text text--lighten-5"
                  >
                    mdi-heart
                  </v-icon>
                </v-list-item-title>
              </p>
            </div>
          </nuxt-link>
        </v-list-item>
      </v-list>
    </v-container>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  middleware: 'authenticated',
  data () {
    return {
      valid: true,
      myGender: ['Bi', 'Man', 'Woman'],
      genderLF: ['Men & Women', 'Men', 'Women']
    }
  },
  computed: {
    // checker () {
    //   return this.$store.getters.checker
    // },
    serverMessage () {
      return this.$store.getters.serverMessage
    },
    loadedSuggestions () {
      return this.$store.getters.loadedSuggestions
    },
    loadedMatchList () {
      return this.$store.getters.loadedMatchList
    },
    token () {
      return this.$store.getters.token
    }
  },
  async asyncData (context) {
    const matchList = await axios
      .get(process.env.serverUrl + '/social/match', {
        headers: {
          'Authorization': 'Bearer ' + context.app.store.getters.token
        }
      })
      .then((response) => {
        /* eslint-disable */
        console.log('response_asyncGET_matchList', response)
        console.log('response.data.client', response.data.client)
        if (response.data.client.length != 0) {
          console.log('Test_A')
          context.store.dispatch('setMatchList', response.data.client)
        }
        else {
          context.store.dispatch('setMessage', 'No match so far')
        }
      })
      .catch(function(error) {
        /* eslint-disable */
        console.log('error_asyncGET_matchList', error)
        context.store.dispatch('setMessage', error.response.data.client)
      })
      return {
        matchList
      }
  },
  methods: {
    love (target) {
      // eslint-disable-next-line
      this.$axios({
        method: 'post',
        url: process.env.serverUrl + '/social/like',
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
        })
        .catch((error) => {
          console.log ('error_POST_like', error)
          console.log('error_client', error.response.data.client)
          this.$store.dispatch('setMessage', error.response.data.client)
        })
    },
    // matchList () {
    //   axios
    //     .get(process.env.serverUrl + '/social/match', {
    //       headers: {
    //         Authorization: 'Bearer ' + this.$store.getters.token
    //       }
    //     })
    //     .then((response) => {
    //       /* eslint-disable */
    //       console.log('response_GET_matchList', response)
    //       this.$store.dispatch('setMatchList', response.data.client)
    //       this.$store.dispatch('setMessage', response.statusText)
    //     })
    //     .catch((error) => {
    //       console.log('error_GET_matchList', error)
    //       console.log('error_client', error.response.statusText)
    //       this.$store.dispatch('setMessage', error.response.statusText)
    //     })
    // }
  }
}
</script>
