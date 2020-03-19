<template>
  <div>
    <v-container
      class="font-weight-black purple--text text--lighten-5"
    >
      My Notifications
    </v-container>
    <v-container
      v-if="loadedNotifications"
      style="background-color: transparent"
    >
      <v-list style="background-color: transparent">
        <v-list-item
          v-for="(itemNotif, y) in filterNotif(loadedNotifications)"
          :key="y"
        >
          <nuxt-link
            to="/"
          >
            <div>
              <p
                class="text-xs-right"
              >
                <v-list-item-title
                  class="purple--text text--lighten-5 text-xs-left"
                >
                  <v-icon
                    class="purple--text text--lighten-5"
                  >
                    mdi-heart
                  </v-icon>
                  {{ itemNotif }} {{ itemNotif }} ({{ itemNotif }})
                </v-list-item-title>
              </p>
            </div>
          </nuxt-link>
        </v-list-item>
      </v-list>
    </v-container>
  </div>
</template>

<script>
import axios from 'axios'
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
      return this.$store.getters['interact/serverMessage']
    },
    loadedNotifications () {
      return this.$store.getters['interact/loadedNotifications']
    },
    token () {
      return this.$store.getters['user/token']
    }
  },
  async asyncData (context) {
    const myNotif = await axios
      .get(process.env.serverUrl + '/social/notification', {
        headers: {
          Authorization: 'Bearer ' + context.app.store.getters['user/token']
        }
      })
      .then((response) => {
        /* eslint-disable */
        console.log('response_GET_notif', response)
        context.store.dispatch('websocket/setNotifications', response.data.client)
      })
      .catch((error) => {
        console.log('error_GET_notif', error)
        console.log('error_client', error.response.data.client)
      })
    return {
      myNotif
    }
  },
  methods: {
    filterNotif (notif) {
      return notif.received.filter(function (notif) {
        notif.notifAge = moment(notif.date, 'YYYY-MM-DDTHH:mm:ss[Z]').fromNow()
        notif.notifDate = moment(notif.date, 'YYYY-MM-DDTHH:mm:ss[Z]').format('MMMM Do YYYY, h:mm:ss a')
        return notif
      })
    }
  }
}
</script>
