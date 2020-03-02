<template id="app">
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      app
      clipped
      background-color="purple lighten-2"
      color="purple darken-1"
      width="190px"
    >
      <v-list dense>
        <div v-if="`${token}` == 'null'">
          <v-list-item
            v-for="(itemLogout,exit) in iLogout"
            :key="exit"
            link
          >
            <nuxt-link :to="{ path: `${itemLogout.url}` }">
              <v-list-item-action>
                <v-btn
                  class="ma-2"
                  color="purple lighten-3"
                  dark
                >
                  {{ itemLogout.text }}
                  &nbsp;
                  <v-icon
                    class="purple--text text--lighten-5"
                  >
                    {{ itemLogout.icon }}
                  </v-icon>
                </v-btn>
              </v-list-item-action>
            </nuxt-link>
          </v-list-item>
        </div>
        <div v-else>
          <v-list-item
            v-for="itemLogin in iLogin"
            :key="itemLogin.text"
            link
          >
            <nuxt-link :to="{ path: `${itemLogin.url}` }">
              <v-list-item-action>
                <v-btn
                  class="ma-2"
                  color="purple lighten-3"
                  dark
                >
                  {{ itemLogin.text }}
                  &nbsp;
                  <v-icon
                    class="purple--text text--lighten-5"
                  >
                    {{ itemLogin.icon }}
                  </v-icon>
                </v-btn>
              </v-list-item-action>
            </nuxt-link>
          </v-list-item>
        </div>
        <div v-if="token">
          <v-subheader
            class="mt-4 title purple font-italic font-weight-light darken-4 purple--text text--lighten-5 justify-center"
          >
            Suggestions&nbsp;
          </v-subheader>
          <v-list
            v-for="(itemSuggest, j) in loadedSuggestionsSidebar"
            :key="j"
          >
            <v-list-item>
              <nuxt-link
                :to="{ path: `/login/user/${itemSuggest.username}` }"
                style="display: flex; justify-content: center;"
              >
                <v-list-item-avatar>
                  <img
                    :src="`data:image/*;base64,${itemSuggest.photo}`"
                    alt=""
                  >
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title
                    v-text="itemSuggest.username"
                    class="purple--text text--lighten-5"
                  />
                  <v-list-item-subtitle
                    v-text="`${myGender[itemSuggest.gender_id - 1] }`"
                    class="purple--text text--lighten-5"
                  />
                  <v-list-item-subtitle
                    v-text="`${itemSuggest.age} y/o`"
                    class="purple--text text--lighten-5"
                  />
                </v-list-item-content>
              </nuxt-link>
            </v-list-item>
            <v-divider />
          </v-list>
          <v-list-item
            class="mt-4"
            link
          >
            <v-list-item-action>
              <v-icon
                color="purple lighten-5"
              >
                mdi-heart-pulse
              </v-icon>
            </v-list-item-action>
            <v-list-item-title
              class="purple--text text--lighten-5"
            >
              &nbsp; {{ loadedUsers.score }}
            </v-list-item-title>
          </v-list-item>
          <v-list-item link>
            <v-list-item-action>
              <v-icon
                color="purple lighten-5"
              >
                mdi-map-marker
              </v-icon>
            </v-list-item-action>
            <v-list-item-title
              class="purple--text text--lighten-5"
            >
              &nbsp; {{ loadedLocation.city }}
            </v-list-item-title>
          </v-list-item>
          <v-list-item
            v-for="itemInterestedIn in filterInterestedInLayout(itemsInterestedIn, loadedUsers.interested_in)"
            :key="itemInterestedIn.id"
            color="purple--text text--lighten-5"
          >
            <v-icon
              class="purple--text text--lighten-5"
            >
              {{ itemInterestedIn.icon }}
            </v-icon>
            <v-list-item-title
              class="purple--text text--lighten-5"
            >
              &nbsp;LF {{ itemInterestedIn.name }}
            </v-list-item-title>
          </v-list-item>
        </div>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      app
      clipped-left
      color="purple darken-4"
      height=""
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" class="purple--text text--lighten-5" />
      <v-row
        class="hidden-xs-only"
        align="center"
        justify="space-between"
      >
        <v-col cols="2">
          <v-row>
            <v-toolbar-title class="mr-12 align-center">
              <span class="title purple--text text--lighten-5 hidden-sm-only">&nbsp;&nbsp;Matcha</span>
            </v-toolbar-title>
          </v-row>
        </v-col>
        <v-col cols="6">
          <v-row
            justify="end"
          >
            <v-form @submit.prevent="keySearchUser">
              <v-text-field
                v-model.lazy.trim="searchUsername"
                :append-icon-cb="() => {}"
                append-icon="mdi-account-search"
                color="purple darken-1"
                label="Find the one you love !"
                outlined
                hide-details
                background-color="purple lighten-4"
                clearable
              />
            </v-form>
          </v-row>
        </v-col>
        <v-col
          v-if="loadedPictures[0]"
          cols="2"
        >
          <v-row
            justify="center"
            align="end"
            class="fill-height"
          >
            <v-avatar
              tile
              class="profile indigo accent-4"
              size="50"
            >
              <v-img
                :src="`data:image/*;base64,${loadedPictures[0]}`"
              />
            </v-avatar>
          </v-row>
        </v-col>
        <v-col
          v-if="token"
          cols="2"
        >
          <v-row
            class="purple--text text--lighten-4 hidden-sm-only"
            justify="end"
          >
            Connected:&nbsp;&nbsp;
          </v-row>
          <v-row
            class="purple--text text--lighten-4"
            justify="end"
          >
            <b>{{ loadedUsers.username }}</b>&nbsp;&nbsp;
          </v-row>
        </v-col>
      </v-row>
    </v-app-bar>

    <v-content style="background-color: #E1BEE7">
      <v-container
        style="
          background-image: url('/04_homepage_beachkiss_opacity42.png');
          background-size: cover;
          height: 100%;
          background-attachment: fixed;
          background-repeat: no-repeat;
        "
      >
        <div class="text-center ma-2">
          <v-snackbar
            v-model="snackbar"
            :timeout="timeoutDuration"
            top
            right
            color="purple accent-3"
          >
            <div class="font-italic font-weight-medium">
              Notification:&nbsp;{{ serverMessage }}
            </div>
            <v-btn
              @click="snackbar = false"
              color="purple lighten-5"
              text
            >
              Close
            </v-btn>
          </v-snackbar>
        </div>
        <nuxt />
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  props: {
    // eslint-disable-next-line
    source: String
  },
  data: () => ({
    drawer: null,
    snackbar: true,
    searchUsername: '',
    timeoutDuration: 4242,
    counter: 0,
    myGender: ['Bi', 'Man', 'Woman'],
    iLogin: [
      { icon: 'mdi-home', text: 'Home', url: '/' },
      { icon: 'mdi-duck', text: 'Match me', url: '/login/matchme' },
      { icon: 'mdi-heart-multiple-outline', text: 'My crush', url: '/login/mycrush' },
      { icon: 'mdi-account-circle', text: 'Profile', url: '/login/profile' },
      { icon: 'mdi-power', text: '', url: '/login/logout' }
    ],
    iLogout: [
      { icon: 'mdi-home', text: 'Home', url: '/' },
      { icon: 'mdi-login', text: 'Login', url: '/login' },
      { icon: 'mdi-content-save', text: 'Register', url: '/register' }
    ],
    itemsInterestedIn: [
      { id: 1, name: 'Men & Women', icon: 'mdi-human-male-female' },
      { id: 2, name: 'Men', icon: 'mdi-human-male' },
      { id: 3, name: 'Women', icon: 'mdi-human-female' }
    ]
  }),
  computed: {
    loadedUsers () {
      return this.$store.getters.loadedUsers
    },
    token () {
      return this.$store.getters.token
    },
    serverMessage () {
      return this.$store.getters.serverMessage
    },
    loadedLocation () {
      return this.$store.getters.loadedLocation
    },
    loadedPictures () {
      return this.$store.getters.loadedPictures
    },
    // loadedSuggestions () {
    //   return this.$store.getters.loadedSuggestions
    // },
    loadedSuggestionsSidebar () {
      return this.$store.getters.loadedSuggestionsSidebar
    }
  },
  methods: {
    keySearchUser (event) {
      this.$router.push('/login/user/' + `${this.searchUsername}`)
    },
    filterInterestedInLayout (itemFilterLayout, sex) {
      return itemFilterLayout.filter(function (itemFilterLayout) {
        return itemFilterLayout.id === sex
      })
    }
  }
  //   logout () {
  //     this.$store.dispatch('setLogout', null)
  //     this.$router.push('/')
  //   }
  // }
}
</script>

<style>
  #keep
  .v-navigation-drawer__border {
    display: none
  }
</style>
