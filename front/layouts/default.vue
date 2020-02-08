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
            &nbsp; Love indicator
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
            &nbsp; Location
          </v-list-item-title>
        </v-list-item>
        <v-list-item link>
          <v-list-item-action>
            <v-icon
              color="purple lighten-5"
            >
              mdi-map-marker-radius
            </v-icon>
          </v-list-item-action>
          <v-list-item-title
            class="purple--text text--lighten-5"
          >
            &nbsp; Distance (km)
          </v-list-item-title>
        </v-list-item>
        <v-list-item link>
          <v-list-item-action>
            <v-icon
              color="purple lighten-5"
            >
              mdi-human-male-female
              mdi-human-male
              mdi-human-female
            </v-icon>
          </v-list-item-action>
          <v-list-item-title
            class="purple--text text--lighten-5"
          >
            &nbsp; LF W/M
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
      <v-toolbar-title class="mr-12 align-center">
        <span class="title purple--text text--lighten-5">Matcha</span>
      </v-toolbar-title>
      <v-spacer />
      <v-row
        align="center"
        style="max-width: 650px"
      >
        <v-text-field
          :append-icon-cb="() => {}"
          color="purple darken-1"
          label="Find the one you love !"
          outlined
          append-icon="mdi-account-circle"
          hide-details
          background-color="purple lighten-4"
        />
      </v-row>
    </v-app-bar>

    <v-content style="background-color: #E1BEE7">
      <v-container
        class="fill-height"
        style="
          background-image: url('/04_homepage_beachkiss_opacity42.png');
          background-size: cover;
          height: 100%;
        "
      >
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
  // components: {
  //   TheNavbar,
  //   TheFooter
  // },
  props: {
    // eslint-disable-next-line
    source: String
  },
  data: () => ({
    drawer: null,
    iLogin: [
      { icon: 'mdi-home', text: 'Home', url: '/' },
      { icon: 'mdi-settings', text: 'Settings', url: '/settings' },
      { icon: 'mdi-power', text: 'Logout', url: '/logout' }
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
    }
  }
  // created () {
  //   this.$vuetify.theme.dark = {
  //     primary: '#3f51b5',
  //     secondary: '#03a9f4',
  //     accent: '#673ab7',
  //     error: '#e91e63',
  //     warning: '#ff5722',
  //     info: '#9c27b0',
  //     success: '#8bc34a'
  //   }
  // methods: {
  //   logout () {
  //     this.$store.commit('setLogout', null)
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
