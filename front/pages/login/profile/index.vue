<template>
  <div>
    <br><v-divider /><br>
    <v-container fluid>
      <v-row>
        <v-col>
          <v-row
            justify="center"
          >
            <nuxt-link to="/login/profile/mypics">
              <v-btn
                color="purple accent-3"
                dark
              >
                My Pics
                &nbsp;
                <v-icon>
                  mdi-camera
                </v-icon>
              </v-btn>
            </nuxt-link>
          </v-row>
        </v-col>
        <v-col>
          <v-row
            justify="center"
          >
            <nuxt-link to="/login/profile/mygeoloc">
              <v-btn
                color="cyan lighten-2"
                dark
              >
                My geoLoc
                &nbsp;
                <v-icon>
                  mdi-compass
                </v-icon>
              </v-btn>
            </nuxt-link>
          </v-row>
        </v-col>
        <v-col>
          <v-row
            justify="center"
          >
            <nuxt-link to="/login/profile/settings">
              <v-btn
                color="indigo lighten-2"
                dark
              >
                Settings
                &nbsp;
                <v-icon>
                  mdi-settings
                </v-icon>
              </v-btn>
            </nuxt-link>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
    <br><v-divider /><br>
    <v-container
      class="font-weight-black"
    >
      My profile page
    </v-container>
    <v-card
      :hover="true"
      class="mx-auto"
      max-width="434"
    >
      <v-img
        :src="`data:image/*;base64,${loadedPictures[1]}`"
        aspect-ratio="2"
        class="blue lighten-2"
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
        <div
          v-if="loadedLocation.country"
        >
          Country: {{ loadedLocation.country }}
        </div>
        <div>City: {{ loadedLocation.city }}</div>
        <div
          v-if="loadedLocation.district"
        >
          District: {{ loadedLocation.district }}
        </div>
      </v-card-text>
      <v-carousel
        continuous
        height="20vh"
      >
        <v-carousel-item
          v-for="(item,i) in loadedPictures"
          :key="i"
          :src="`data:image/*;base64,${item}`"
          v-ripple="{ class: `purple--text` }"
          reverse-transition="fade-transition"
        />
      </v-carousel>
    </v-card>
  </div>
</template>

<script>
import axios from 'axios'
// import moment from 'moment'

export default {
  middleware: 'authenticated',
  data () {
    return {
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
    loadedLocation () {
      return this.$store.getters.loadedLocation
    }
  },
  // async asyncData (context) {
  //   const birthday = await moment(context.store.getters.loadedUsers.birth_date, 'YYYY-MM-DD').format('Do MMMM')
  //   return {
  //     birthday
  //   }
  // },
  async asyncData (context) {
    const usermypics = await axios
      .get(process.env.serverUrl + '/users/photos', {
        headers: {
          Authorization: 'Bearer ' + context.app.store.getters.token
        }
      })
      .then((response) => {
        /* eslint-disable */
        console.log('GET response_async_mypics', response)
        context.store.dispatch('setPictures', response.data.client)
        context.store.dispatch('setMessage', response.statusText)
      })
      .catch((error) => {
        console.log('GET error_async_mypics', error)
        // TO TEST
        // console.log('GET error_client', error.response.data.client)
        // context.store.dispatch('setMessage', error.response.data.client)
      })
    return {
      usermypics
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
}
</script>
