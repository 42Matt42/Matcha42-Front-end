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
            v-for="item in iLogout"
            :key="item.text"
            link
          >
            <nuxt-link :to="{ path: `${item.url}` }">
              <v-list-item-action>
                <v-btn
                  class="ma-2"
                  color="purple lighten-3"
                  dark
                >
                  {{ item.text }}
                  &nbsp;
                  <v-icon
                    class="purple--text text--lighten-5"
                  >
                    {{ item.icon }}
                  </v-icon>
                </v-btn>
                <!-- <v-list-item-subtitle class="purple--text text--lighten-5">
                  {{ item.text }}
                </v-list-item-subtitle> -->
              </v-list-item-action>
            </nuxt-link>
          </v-list-item>
        </div>
        <div v-else>
          <v-list-item
            v-for="item in iLogin"
            :key="item.text"
            link
          >
            <nuxt-link :to="{ path: `${item.url}` }">
              <v-list-item-action>
                <v-btn
                  class="ma-2"
                  color="purple lighten-3"
                  dark
                >
                  {{ item.text }}
                  &nbsp;
                  <v-icon
                    class="purple--text text--lighten-5"
                  >
                    {{ item.icon }}
                  </v-icon>
                </v-btn>
                <!-- <v-list-item-subtitle class="purple--text text--lighten-5">
                  {{ item.text }}
                </v-list-item-subtitle> -->
              </v-list-item-action>
            </nuxt-link>
          </v-list-item>
        </div>
        <v-subheader
          class="mt-4 title purple darken-4 purple--text text--lighten-5"
        >
          &nbsp; Suggestions
        </v-subheader>
        <v-list>
          <v-list-item
            v-for="item in items2"
            :key="item.text"
            link
          >
            <v-list-item-avatar>
              <img
                alt=""
              >
            </v-list-item-avatar>
            <v-list-item-title v-text="item.username" />
            <v-list-item-subtitle
              v-text="item.sex"
              class="purple--text text--lighten-5"
            />
            <v-list-item-subtitle
              v-html="item.age"
              class="purple--text text--lighten-5"
            />
          </v-list-item>
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
          v-for="item in filterInterestedIn(itemsInterestedIn, loadedUsers.interested_in)"
          :key="item.id"
          color="purple--text text--lighten-5"
        >
          <v-icon
            class="purple--text text--lighten-5"
          >
            {{ item.icon }}
          </v-icon>
          <v-list-item-title
            class="purple--text text--lighten-5"
          >
            &nbsp;LF {{ item.name }}
          </v-list-item-title>
        </v-list-item>
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
        <!-- <v-spacer /> -->
        <v-col cols="6">
          <v-row
            justify="end"
          >
            <v-form @submit.prevent="keySearchUser">
              <v-text-field
                v-model="searchUsername"
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
        <!-- <v-row
          :src="`https://randomuser.me/api/portraits/women/${item.picture}.jpg`"
          justify="center"
          align="center"
        >
          <v-col class="shrink">
            <v-tooltip right>
              <nuxt />
            </v-tooltip>
            <v-tooltip right>
              <template v-slot:activator="{ on }">
                <v-btn
                  v-on="on"
                  icon
                  large
                  href="www.google.fr"
                  target="_blank"
                >
                  <v-icon
                    large
                  >
                    mdi-codepen
                  </v-icon>
                </v-btn>
              </template>
              <span>Codepen</span>
            </v-tooltip>
          </v-col>
        </v-row> -->
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
    items2: [
      // { picture: 28, text: '<span class='text--primary'>Hippopotame<span>', sex: 'W', age: 24 },
      { picture: 38, text: 'Panda', sex: 'W', age: 22 },
      { picture: 48, text: 'Girafe', sex: 'W', age: 28 },
      { picture: 58, text: 'Tortue', sex: 'W', age: 18 },
      { picture: 78, text: 'Colombe', sex: 'W', age: 40 }
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
    }
  },
  methods: {
    keySearchUser (event) {
      /* eslint-disable */
      // console.log('event', event)
      // console.log('this', this)
      this.$router.push('/login/user/' + `${this.searchUsername}`)
    },
    filterInterestedIn (item, interested_in) {
      return item.filter(function (item) {
        return item.id === interested_in
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
