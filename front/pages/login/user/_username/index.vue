<template>
  <div>
    pop-up:<br>
    {{ serverMessage }}
    <br><br>
    <div>
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
          :src="`data:image/*;base64,${loadedPictures[1]}`"
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
                  :src="`data:image/*;base64,${loadedPictures[0]}`"
                />
              </v-avatar>
            </v-col>
          </v-row>
        </v-img>
        <v-card-subtitle>
          <div>
            <v-row justify="end">
              Online
            </v-row>
            <div class="headline font-weight-bold purple--text text--accent-4">
              {{ loadedUsers.username }}
            </div>
            <div class="title font-italic purple--text text--accent-3">
              <div
                v-if="loadedUsers.gender_id === 1"
              >
                Male, {{ loadedUsers.age }} y/o
              </div>
              <div
                v-else
              >
                Female, {{ loadedUsers.age }} y/o
              </div>
            </div>
            <div class="title font-italic purple--text text--accent-3">
              <div
                v-if="loadedUsers.interested_in === 2"
              >
                Interested in Men
              </div>
              <div
                v-if="loadedUsers.interested_in === 3"
              >
                Interested in Women
              </div>
              <div
                v-else
              >
                Bi
              </div>
            </div>
            <v-row justify="end">
              Score: {{ loadedUsers.score }}
            </v-row>
          </div>
        </v-card-subtitle>

        <v-card-text class="text--primary">
          <div>&nbsp;</div>
          <div>{{ loadedUsers.name }} {{ loadedUsers.surname }}</div>
          <div>Anniversary: {{ birthday }}</div>
          <div>&nbsp;</div>
          <div>Tags: {{ loadedUsers.tags }}</div>
          <div>&nbsp;</div>
          <div>Description: {{ loadedUsers.bio }}</div>
        </v-card-text>

        <v-card-text class="text--primary">
          <div>&nbsp;</div>
          <div>Location {{ geoLoc }}</div>
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
      valid: true
    }
  },
  computed: {
    serverMessage () {
      return this.$store.getters.serverMessage
    },
    loadedUsers () {
      return this.$store.getters.loadedUsers
    },
    loadedPictures () {
      return this.$store.getters.loadedPictures
    },
    token () {
      return this.$store.getters.token
    },
    geoLoc () {
      return this.$store.getters.geoLoc
    }
  },
  // async asyncData (context) {
  //   const birthday = await moment(context.store.getters.loadedUsers.birth_date, 'YYYY-MM-DD').format('Do MMMM')
  //   return {
  //     birthday
  //   }
  // },
  async asyncData (context) {
    if (context.params.username !== context.store.getters.loadedUsers.username) {
      /* eslint-disable */
      console.log('context', context)
      // if (context.store.getters.token) {
      const iView = await axios({
        method: 'post',
        // url: '/t/bd05h-1581710318/post',
        url: process.env.serverUrl + '/social/view',
        data: {
          username: this.$route.params.username
        }
      })
        .then((response) => {
        /* eslint-disable */
          console.log('response_POST_view', response)
          console.log('response_statusText', response.client)
          context.store.dispatch('setMessage', response.client)
          context.store.dispatch('setGeoLoc', response.data)
        })
        .catch((error) => {
          console.log ('error_POST_view', error)
          console.log('error_client', error.response.data.client)
          context.store.dispatch('setMessage', error.response.data.client)
        })
      return {
        iView
      }
    }
  },
  // async asyncData (context) {
  //   let [birthday, gender] = await Promise.all([
  //     birthday = moment(context.store.getters.loadedUsers.birth_date, 'YYYY-MM-DD').format('Do MMMM'),
  //     gender = context.store.getters.loadedUsers.gender_id
  //   ])
  //   return {
  //     birthday: birthday,
  //     gender: gender
  //   }
  // },
  // methods: {
  //   strGender (gender) {
  //     if (gender === 1) {
  //       return 'Male'
  //     }
  //     if (gender === 2) {
  //       return 'Female'
  //     }
  //     return 'Undefined'
  //   }
  // }
  methods: {
    love () {
      this.$axios({
        method: 'post',
        url: process.env.serverUrl + '/social/like',
        // url: '/t/bd05h-1581710318/post',
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
