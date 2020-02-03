<template>
  <div class="admin-page">
    <section class="new-post">
      <br>
      <button @click="gettest">
        GET_test
      </button>
      <br>
      <button @click="successnow">
        GET_go
      </button>
      <br>
      <button @click="letitwork">
        GET_let it work please
      </button>
      <br>
      <!-- <button @click="lasttry">
        GET_last try
      </button> -->
      <br>
      {{ token }}
    </section>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  middleware: 'notAuthenticated',
  data () {
    return {
      user: null
    }
  },
  computed: {
    loadedUsers () {
      return this.$store.getters.loadedUsers
    },
    token () {
      return this.$store.getters.token
    }
  },
  methods: {
    successnow (token) {
      axios.defaults.baseURL = 'https://cors-anywhere.herokuapp.com/https://matcha42saubinbartol.herokuapp.com/user'
      if (process.server) {
        return
      }
      axios.interceptors.request.use((request) => {
        request.baseURL = 'https://cors-anywhere.herokuapp.com/https://matcha42saubinbartol.herokuapp.com/user'
        /* eslint-disable */
        console.log('tok1', token)
        if (this.token) {
          request.headers.common.Authorization = token
        }
        /* eslint-disable */
        console.log('tok2', token)
        return request
      })
      this.$store.dispatch('getUserData')
    },
    gettest () {
      this.$store.dispatch('getUserData')
      this.$router.push('/')
    },
    letitwork () {
      axios({
        method: 'get',
        url: 'https://matcha42saubinbartol.herokuapp.com/user', // 'https://cors-anywhere.herokuapp.com/https://matcha42saubinbartol.herokuapp.com/user',
        // headers: {'Origin': 'https://matcha42saubinbartol.herokuapp.com/user'}
      })
    }
    // lasttry () {
    //   var express = require('express')
    //   var cors = require('cors')
    //   var app = express()
    //   //app.use(cors())
    //   app.use(cors({
    //     origin: 'http://localhost:3000',
    //     credentials: true
    //   }))
    //   this.$store.dispatch('getUserData')
    // }
  }
}
</script>

<style scoped>
.admin-page {
  padding: 20px;
}

.new-post {
  text-align: center;
  border-bottom: 2px solid #ccc;
  padding-bottom: 10px;
}

.existing-posts h1 {
  text-align: center;
}
</style>

