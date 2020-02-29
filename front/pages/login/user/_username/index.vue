<template>
  <div>
    <div v-if="checker === true">
      <v-container
        class="font-weight-black"
      >
        {{ target }}'s profile page !
      </v-container>
      <v-card
        :hover="true"
        v-ripple="{ class: `purple--text` }"
        class="mx-auto"
        max-width="434"
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
            <v-row justify="end">
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
          <div>Anniversary: {{ birthday }}</div>
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
        </v-card-text>

        <v-card-actions>
          <v-btn
            @click="show = !show"
            icon
            right
          >
            <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
          </v-btn>
          <v-spacer />
          <v-btn
            @click="love"
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
  </div>
</template>

<script>
// import axios from 'axios'
// import moment from 'moment'

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
    loadedPictures () {
      return this.$store.getters.loadedPictures
    },
    token () {
      return this.$store.getters.token
    },
    loadedMapPosition () {
      return this.$store.getters.loadedMapPosition
    },
    loadedLocation () {
      return this.$store.getters.loadedLocation
    }
  },
  // async asyncData (context) {
  //   if (context.params.username !== context.store.getters.loadedUsers.username) {
  //     /* eslint-disable */
  //     console.log('context', context)
  //     // if (context.store.getters.token) {
  //     const iView = await axios({
  //       method: 'post',
  //       url: process.env.serverUrl + '/social/view',
  //       data: {
  //         username: context.route.params.username
  //       },
  //       headers: {
  //         Authorization: 'Bearer ' + context.store.getters.token
  //       }
  //     })
  //       .then((response) => {
  //       /* eslint-disable */
  //         console.log('response_POST_view', response)
  //         console.log('response_statusText', response.data.client)
  //         context.store.dispatch('setMessage', response.data.client)
  //       })
  //       .catch((error) => {
  //         console.log ('error_POST_view', error)
  //         console.log('error_client', error.response.data.client)
  //         context.store.dispatch('setMessage', error.response.data.client)
  //       })
  //     context.store.dispatch('setChecker', false)
  //     const getXuserInfo = await axios
  //       .get(process.env.serverUrl + '/users/profile', {
  //         params: {
  //           username: context.route.params.username
  //         },
  //         headers: {
  //           Authorization: 'Bearer ' + context.app.store.getters.token
  //         }
  //       })
  //       .then((response) => {
  //         /* eslint-disable */
  //         console.log('response_async_XuserInfo', response)
  //         context.store.dispatch('setSearchProfile', response.data.userdata)
  //         context.store.dispatch('setMessage', response.statusText)
  //         context.store.dispatch('setChecker', true)
  //       })
  //       .catch((error) => {
  //         console.log('error_async_XuserInfo', error)
  //         console.log('error_client', error.response.statusText)
  //         context.store.dispatch('setMessage', error.response.statusText)
  //       })
  //     const birthday = await moment(context.store.getters.loadedUsers.birth_date, 'YYYY-MM-DD').format('Do MMMM')
  //     return {
  //       iView,
  //       getXuserInfo,
  //       birthday
  //     }
  //   }
  // },
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
          console.log('response_client', response.client)
          this.$store.dispatch('setMessage', response.client)
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
