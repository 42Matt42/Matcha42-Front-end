<template>
  <div>
    reset password
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      checker: {
        id: false,
        username: ''
      }
    }
  },
  async asyncData (context) {
    const user = await axios
      .get(process.env.serverUrl + '/password', {
        params: {
          id: context.query.id,
          username: context.query.username
        }
      })
      .then((res) => {
        /* eslint-disable */
        // console.log(context)
        // console.log(this.$route.query)
        // console.log(res)
        res
      })
      .catch(function(error) {
        /* eslint-disable */
        console.log(context.query)
        // console.log(this.$route.query)
        console.log(error)
      })
      return {
        user
      }
    }
}
</script>
