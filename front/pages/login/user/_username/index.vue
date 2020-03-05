<template>
  <div>
    <div v-if="checker === true">
      <v-container
        class="font-weight-black purple--text text--lighten-5"
        style="display: flex; justify-content: center;"
      >
        {{ target }}'s profile page !
      </v-container>
      <v-card
        :hover="true"
        v-ripple="{ class: `purple--text` }"
        class="mx-auto"
        max-width="434"
        color="deep-purple lighten-5"
      >
        <v-img
          :src="`data:image/*;base64,${loadedSearchProfile.photos[1]}`"
          aspect-ratio="2"
          class="spacer blue lighten-2"
          no-gutters
        >
          <v-row
            align="end"
            class="fill-height"
          >
            <v-col
              align-self="start"
              class="pa-0"
              cols="12"
            >
              <v-avatar
                class="profile indigo accent-4"
                size="164"
              >
                <v-img
                  :src="`data:image/*;base64,${loadedSearchProfile.photos[0]}`"
                />
              </v-avatar>
            </v-col>
          </v-row>
        </v-img>
        <v-card-subtitle>
          <div>
            <v-row
              v-if="loadedSearchProfile.last_connection"
              justify="end"
              class="font-italic"
            >
              Offline ({{ lastConnectionSearchProfile }})&nbsp;
            </v-row>
            <v-row
              v-else
              justify="end"
            >
              Online&nbsp;
            </v-row>
            <div class="headline font-weight-bold purple--text text--accent-4">
              {{ loadedSearchProfile.username }}
            </div>
            <div class="title font-italic purple--text text--accent-3">
              {{ myGender[loadedSearchProfile.gender_id - 1] }} {{ loadedSearchProfile.age }} y/o
            </div>
            <div class="title font-italic purple--text text--accent-3">
              Interested in {{ genderLF[loadedSearchProfile.interested_in - 1] }}
            </div>
            <v-row justify="end">
              Score: {{ loadedSearchProfile.score }}&nbsp;
            </v-row>
          </div>
        </v-card-subtitle>

        <v-card-text class="text--primary">
          <div>&nbsp;</div>
          <div>{{ loadedSearchProfile.name }} {{ loadedSearchProfile.surname }}</div>
          <div>Anniversary: {{ birthdaySearchProfile }}</div>
          <div>&nbsp;</div>
          <div>Tags: {{ loadedSearchProfile.tags.toString() }}</div>
          <div>&nbsp;</div>
          <div>Description: {{ loadedSearchProfile.bio }}</div>
        </v-card-text>
        <v-card-text class="text--primary">
          <div
            v-if="loadedSearchProfile.location.country"
          >
            Country: {{ loadedSearchProfile.location.country }}
          </div>
          <div>City: {{ loadedSearchProfile.location.city }}</div>
          <div
            v-if="loadedSearchProfile.location.district"
          >
            District: {{ loadedSearchProfile.location.district }}
          </div>

          <v-card-actions>
            <v-row
              align-start
            >
              <v-col>
                <v-btn
                  @click="love"
                  fab
                  color="deep-purple lighten-5"
                  absolute
                  x-large
                >
                  <v-icon
                    color="deep-purple accent-3"
                  >
                    mdi-cards-heart
                  </v-icon>
                </v-btn>
              </v-col>
              <v-col>
                <v-btn
                  @click="dislike"
                  fab
                  color="deep-purple lighten-5"
                  absolute
                  x-large
                >
                  <v-icon
                    color="deep-purple accent-3"
                  >
                    mdi-heart-broken
                  </v-icon>
                </v-btn>
              </v-col>
              <v-col cols="2" />
              <v-col>
                <v-btn
                  @click="block"
                  fab
                  color="deep-purple lighten-5"
                  absolute
                  x-large
                >
                  <v-icon
                    color="indigo accent-1"
                  >
                    mdi-account-cancel
                  </v-icon>
                </v-btn>
              </v-col>

              <v-col>
                <v-btn
                  @click="report"
                  fab
                  color="deep-purple lighten-5"
                  absolute
                  x-large
                >
                  <v-icon
                    color="indigo accent-1"
                  >
                    mdi-alert-octagon-outline
                  </v-icon>
                </v-btn>
              </v-col>
            </v-row>
          </v-card-actions>
        </v-card-text>
      </v-card>
      <br><br>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import moment from 'moment'
import socket from '~/plugins/socket.io.js'

export default {
  middleware: 'authenticated',
  data () {
    return {
      target: this.$route.params.username,
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
    loadedUsers () {
      return this.$store.getters.loadedUsers
    },
    loadedSearchProfile () {
      return this.$store.getters.loadedSearchProfile
    },
    token () {
      return this.$store.getters.token
    },
    loadedLikes () {
      return this.$store.getters.loadedLikes
    }
  },
  async asyncData (context) {
    if (context.params.username !== context.store.getters.loadedUsers.username) {
      /* eslint-disable */
      console.log('context', context)
      // if (context.store.getters.token) {
      const iView = await axios({
        method: 'post',
        url: process.env.serverUrl + '/social/view',
        data: {
          username: context.route.params.username
        },
        headers: {
          Authorization: 'Bearer ' + context.store.getters.token
        }
      })
        .then((response) => {
        /* eslint-disable */
          console.log('response_POST_view', response)
          console.log('response_statusText', response.data.client)
          socket.emit('view', context.store.getters.loadedUsers.username, context.route.params.username)
          context.store.dispatch('setMessage', response.data.client)
        })
        .catch((error) => {
          console.log ('error_POST_view', error)
          console.log('error_client', error.response.data.client)
          context.store.dispatch('setMessage', error.response.data.client)
        })
      context.store.dispatch('setChecker', false)
      const getXuserInfo = await axios
        .get(process.env.serverUrl + '/users/profile', {
          params: {
            username: context.route.params.username
          },
          headers: {
            Authorization: 'Bearer ' + context.app.store.getters.token
          }
        })
        .then((response) => {
          /* eslint-disable */
          console.log('response_async_XuserInfo', response)
          context.store.dispatch('setSearchProfile', response.data.userdata)
          context.store.dispatch('setMessage', response.statusText)
          context.store.dispatch('setChecker', true)
        })
        .catch((error) => {
          console.log('error_async_XuserInfo', error)
          console.log('error_client', error.response.statusText)
          context.store.dispatch('deleteSearchProfile')
          context.redirect('/')
        })
      const myLikes = await axios
        .get(process.env.serverUrl + '/social/like', {
          headers: {
            Authorization: 'Bearer ' + context.app.store.getters.token
          }
        })
        .then((response) => {
          /* eslint-disable */
          console.log('response_GET_like', response)
          context.store.dispatch('setLikes', response.data.client)
          context.store.dispatch('setMessage', response.client)
        })
        .catch((error) => {
          console.log('error_GET_like', error)
          console.log('error_client', error.response.data.client)
          context.store.dispatch('setMessage', error.response.data.client)
        })
      const birthdaySearchProfile = await moment(context.store.getters.loadedSearchProfile.birth_date, 'YYYY-MM-DDTHH:mm:ss[Z]').format('Do MMMM')
      const lastConnectionSearchProfile = await moment(context.store.getters.loadedSearchProfile.last_connection, 'YYYY-MM-DDTHH:mm:ss[Z]').format('L')
      return {
        iView,
        // getXuserInfo,
        // myLikes,
        birthdaySearchProfile,
        lastConnectionSearchProfile
      }
    }
    else {
      context.store.dispatch('deleteSearchProfile')
      context.redirect('/login/profile')
    }
  },
  methods: {
    love () {
      this.$axios({
        method: 'post',
        url: process.env.serverUrl + '/social/like',
        data: {
          username: this.target
        },
        headers: {
          'Authorization': 'Bearer ' + this.$store.getters.token
        }
      })
        .then((response) => {
        /* eslint-disable */
          console.log('response_POST_like', response)
          console.log('response_client', response.data.client)
          if (response.data.client.includes('Liked and matched with')) {
            socket.emit('likeback', this.$store.getters.loadedUsers.username, this.target)
          }
          else {
            socket.emit('like', this.$store.getters.loadedUsers.username, this.target)
          }
          this.$store.dispatch('setMessage', response.client)
        })
        .catch((error) => {
          console.log('error_LIKE_client', error.response.data.client)
          this.$store.dispatch('setMessage', error.response.data.client)
        })
    },
    dislike () {
      this.$axios({
        method: 'post',
        url: process.env.serverUrl + '/social/dislike',
        data: {
          username: this.target
        },
        headers: {
          'Authorization': 'Bearer ' + this.$store.getters.token
        }
      })
        .then((response) => {
        /* eslint-disable */
          console.log('response_DISLIKE', response)
          console.log('response_client', response.client)
          if (response.data.client.includes('Disliked and unmatched')) {
            socket.emit('dislike', this.$store.getters.loadedUsers.username, this.target)
          }
          this.$store.dispatch('setMessage', response.client)
        })
        .catch((error) => {
          console.log('error_DISLIKE_client', error.response.data.client)
          this.$store.dispatch('setMessage', error.response.data.client)
        })
    },
    block () {
      this.$axios({
        method: 'post',
        url: process.env.serverUrl + '/social/block',
        data: {
          username: this.target
        },
        headers: {
          'Authorization': 'Bearer ' + this.$store.getters.token
        }
      })
        .then((response) => {
        /* eslint-disable */
          console.log('response_POST_block', response)
          console.log('response_client', response.client)
          this.$store.dispatch('setMessage', response.client)
        })
        .catch((error) => {
          console.log ('error_POST_block', error)
          console.log('error_client', error.response.data.client)
          this.$store.dispatch('setMessage', error.response.data.client)
        })
    },
    report () {
      this.$axios({
        method: 'post',
        url: process.env.serverUrl + '/social/report',
        data: {
          username: this.target
        },
        headers: {
          'Authorization': 'Bearer ' + this.$store.getters.token
        }
      })
        .then((response) => {
        /* eslint-disable */
          console.log('response_POST_report', response)
          console.log('response_client', response.client)
          this.$store.dispatch('setMessage', response.client)
        })
        .catch((error) => {
          console.log ('error_POST_report', error)
          console.log('error_client', error.response.data.client)
          this.$store.dispatch('setMessage', error.response.data.client)
        })
    },
    // filterLove (lovers, target) {
    //   return lovers.filter(function (lover) {
    //     console.log('lover', lover.user_liked)
    //     console.log('target', target)
    //     return lover.user_liked === target
    //   })
    // }
  }
}
</script>
