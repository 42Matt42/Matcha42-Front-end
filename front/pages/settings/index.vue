<template>
  <div class="admin-page">
    <section class="new-post">
      <br>
      <button @click="gettest">
        GET_test
      </button>
      <br>
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
  async asyncData () {
    const user = await axios
      .get('https://cors-anywhere.herokuapp.com/https://matcha42saubinbartol.herokuapp.com/user',
        { withCredentials: true })
      .then((res) => {
        /* eslint-disable */
        console.log(res)
        console.log(res.meta)
        return res
      })
      .catch(function(error) {
        console.log(error)
      })
    return {
      user
    }
  },
  methods: {
    gettest () {
      this.$store.dispatch('getUserData')
      this.$router.push('/')
    }
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

