<template>
  <section class="container">
    <div>
      <BigHeartLogo />
      <h1 class="title">
        Matcha
      </h1>
      <h2 class="subtitle">
        The lovely dating platform !
      </h2>
      <div class="links">
        <a
          class="button--red"
        >Let's find The One ~~</a>
        <!-- <a
          class="button--grey"
        >
        </a> -->
      </div>
      <div v-if="$store.state.token">
        <p>
          You are authenticated. You can see the
          <NuxtLink to="/auth">
            secret page
          </NuxtLink>!
        </p>
        <button @click="logout">
          Logout
        </button>
      </div>
      <p v-else>
        Please
        <NuxtLink to="/login">
          login
        </NuxtLink>.
      </p>
    </div>
  </section>
</template>

<script>
import BigHeartLogo from '~/components/layout/BigHeartLogo.vue'
const Cookie = process.client ? require('js-cookie') : undefined

export default {
  components: {
    BigHeartLogo
  },
  methods: {
    logout () {
      Cookie.remove('token')
      this.$store.commit('setToken', null)
    }
  }
}
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
  'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
}

.links {
  padding-top: 15px;
}
</style>
