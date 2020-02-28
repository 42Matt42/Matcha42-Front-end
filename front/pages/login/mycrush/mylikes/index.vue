<template>
  <div>
    <v-container
      class="font-weight-black purple--text text--lighten-5"
    >
      Likes
    </v-container>
    <v-container style="background-color: transparent">
      <v-list style="background-color: transparent">
        <v-list-item
          v-for="(item, i) in filterLikes(loadedLikes)"
          :key="i"
        >
          <v-icon
            class="purple--text text--lighten-5"
          >
            mdi-heart
          </v-icon>
          <v-list-item-title
            class="purple--text text--lighten-5"
          >
            &nbsp;msaubin&nbsp;liked your profile {{ item.loveAge }} ({{ item.date }})
          </v-list-item-title>
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
      return this.$store.getters.serverMessage
    },
    loadedLikes () {
      return this.$store.getters.loadedLikes
    },
    token () {
      return this.$store.getters.token
    }
  },
  async asyncData (context) {
    const myLikes = await axios
      .get(process.env.serverUrl + '/social/like', {
        headers: {
          Authorization: 'Bearer ' + context.app.store.getters.token
        }
      })
      .then((response) => {
        /* eslint-disable */
        console.log('response_GET_like', response)
        context.store.dispatch('setLikes', response.data.client)
        context.store.dispatch('setMessage', response.client)
      })
      .catch((error) => {
        console.log('error_GET_like', error)
        console.log('error_client', error.response.data.client)
        context.store.dispatch('setMessage', error.response.data.client)
      })
    return {
      myLikes
    }
  },
  methods: {
    filterLikes (love) {
      return love.filter(function (love) {
        love.loveAge = moment(love.date, 'X').fromNow()
        love.date = moment(love.date, 'X').format('MMMM Do YYYY, h:mm:ss a')
        return love
      })
    }
  }
}
</script>
