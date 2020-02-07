<template id="app">
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      app
      clipped
      background-color="purple lighten-2"
      color="purple accent-1"
    >
      <v-list dense>
        <v-list-item
          v-for="item in items"
          :key="item.text"
          link
        >
          <nuxt-link :to="{ path: `${item.url}` }">
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-subtitle>
                {{ item.text }}
              </v-list-item-subtitle>
            </v-list-item-content>
          </nuxt-link>
        </v-list-item>
        <v-subheader
          class="mt-4 title purple darken-4 purple--text text--lighten-5"
        >
          Suggestions
        </v-subheader>
        <v-list>
          <v-list-item
            v-for="item in items2"
            :key="item.text"
            link
          >
            <v-list-item-avatar>
              <img
                :src="`https://randomuser.me/api/portraits/women/${item.picture}.jpg`"
                alt=""
              >
            </v-list-item-avatar>
            <v-list-item-title v-text="item.username" />
            <v-list-item-subtitle v-text="item.sex" />
            <v-list-item-subtitle v-html="item.age" />
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
              mdi-heart-outline
            </v-icon>
          </v-list-item-action>
          <v-list-item-title
            class="indigo purple--text text--lighten-4"
          >
            Blabla #42
          </v-list-item-title>
        </v-list-item>
        <v-list-item link>
          <v-list-item-action>
            <v-icon
              color="grey"
            >
              mdi-settings
            </v-icon>
          </v-list-item-action>
          <v-list-item-title
            class="indigo purple--text text--lighten-4"
          >
            YOUPI TRALALA #42
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
      <v-icon
        class="mx-4"
      >
        fab fa-youtube
      </v-icon>
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
          color="purple lighten-5"
          label="Find the one you love !"
          outlined
          append-icon=""
          hide-details
          background-color="purple accent-1"
        />
      </v-row>
    </v-app-bar>

    <v-content>
      <v-container class="fill-height">
        <nuxt />
        <!-- <v-row
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
    items: [
      { icon: 'Home', text: 'Welcome Page', url: '/' },
      { icon: 'Login', text: 'Let s connect !', url: '/login' },
      { icon: 'Register', text: 'Start the adventure...', url: '/register' },
      { icon: 'Settings', text: 'Custom your params', url: '/settings' },
      { icon: 'Logout', text: 'The end', url: '/logout' }
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
  },
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
  methods: {
    logout () {
      this.$store.commit('setLogout', null)
      this.$router.push('/')
    }
  }
}
</script>

<style>
  #keep
  .v-navigation-drawer__border {
    display: none
  }
</style>
