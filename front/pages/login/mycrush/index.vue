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
    <v-list style="background-color: transparent">
      <v-list-item
        v-for="(item, no) in loadedMatch"
        :key="no"
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
            &nbsp;Username: {{ item.username }}
          </v-list-item-title>
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
// import axios from 'axios'

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
  methods: {
    love (target) {
      // eslint-disable-next-line
      console.log('thisTEST', this)
      this.store.dispatch('setChecker', false)
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
