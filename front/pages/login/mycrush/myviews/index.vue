<template>
  <div>
    <v-container
      class="font-weight-black purple--text text--lighten-5"
    >
      My views
    </v-container>
    <v-container style="background-color: transparent">
      <v-list style="background-color: transparent">
        <v-list-item
          v-for="(item, i) in filterViews(loadedViews)"
          :key="i"
        >
          <v-icon
            class="purple--text text--lighten-5"
          >
            mdi-target-account
          </v-icon>
          <v-list-item-title
            class="purple--text text--lighten-5"
          >
            &nbsp;msaubin&nbsp;viewed your profile {{ item.viewAge }} ({{ item.date }})
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
    loadedViews () {
      return this.$store.getters.loadedViews
    },
    token () {
      return this.$store.getters.token
    }
  },
  async asyncData (context) {
    const myViews = await axios
      .get(process.env.serverUrl + '/social/view', {
        headers: {
          Authorization: 'Bearer ' + context.app.store.getters.token
        }
      })
      .then((response) => {
        /* eslint-disable */
        console.log('response_GET_view', response)
        context.store.dispatch('setViews', response.data.client)
      })
      .catch((error) => {
        console.log('error_GET_view', error)
        console.log('error_client', error.response.data.client)
        context.store.dispatch('setMessage', error.response.data.client)
      })
    return {
      myViews
    }
  },
  methods: {
    filterViews (view) {
      return view.filter(function (view) {
        view.viewAge = moment(view.date, 'X').fromNow()
        view.date = moment(view.date, 'X').format('MMMM Do YYYY, h:mm:ss a')
        return view
      })
    }
  }
}
</script>
