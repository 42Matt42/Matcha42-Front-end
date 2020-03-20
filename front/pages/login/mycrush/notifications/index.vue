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
          v-for="itemNotif in filterNotif(loadedNotifications)"
          :key="itemNotif.id"
        >
          <div>
            <p
              class="text-xs-right"
            >
              <v-list-item-title
                class="purple--text text--lighten-5 text-xs-left"
              >
                <v-icon
                  v-if="itemNotif.read === 0"
                  class="purple--text text--lighten-5"
                >
                  mdi-email
                </v-icon>
                <v-icon
                  v-else
                  class="purple--text text--lighten-5"
                >
                  mdi-bookmark-check
                </v-icon>
                {{ itemNotif.message }}
                <v-btn
                  v-if="itemNotif.read === 0"
                  @click="readNotif(itemNotif.id)"
                  color="indigo darken-3"
                  class="mr-4 purple--text text--lighten-5"
                >
                  Mark as read
                  &nbsp;
                  <v-icon>
                    mdi-email-check-outline
                  </v-icon>
                </v-btn>
              </v-list-item-title>
            </p>
          </div>
        </v-list-item>
      </v-list>
    </v-container>
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
      return this.$store.getters['interact/serverMessage']
    },
    loadedNotifications () {
      return this.$store.getters['websocket/loadedNotifications']
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
      return notif.filter(function (notif) {
        // notif.notifAge = moment(notif.date, 'YYYY-MM-DDTHH:mm:ss[Z]').fromNow()
        // notif.notifDate = moment(notif.date, 'YYYY-MM-DDTHH:mm:ss[Z]').format('MMMM Do YYYY, h:mm:ss a')
        return notif
      })
    },
    readNotif (notifId) {
      this.$axios({
        method: 'post',
        url: process.env.serverUrl + '/social/notification',
        data: {
          notificationId: notifId
        },
        headers: {
          'Authorization': 'Bearer ' + this.$store.getters['user/token']
        }
      })
        .then((response) => {
        /* eslint-disable */
          console.log('response_POST_readNotif', response)
          this.$store.dispatch('websocket/readNotifications', notifId)
        })
        .catch((error) => {
        })
    }
  }
}
</script>
