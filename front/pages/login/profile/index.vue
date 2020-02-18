<template>
  <div>
    pop-up:<br>
    {{ serverMessage }}
    <br><br>
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
                  <v-icon
                    class="purple--text text--lighten-5"
                  >
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
                  <v-icon
                    class="purple--text text--lighten-5"
                  >
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
                  <v-icon
                    class="purple--text text--lighten-5"
                  >
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
      </v-card>
    </div>
  </div>
</template>

<script>
// import axios from 'axios'
import moment from 'moment'

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
    geoLoc () {
      return this.$store.getters.geoLoc
    }
  },
  async asyncData (context) {
    const birthday = await moment(context.store.getters.loadedUsers.birth_date, 'YYYY-MM-DD').format('Do MMMM')
    return {
      birthday
    }
  }
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
