<template>
  <nav class="nav">
    <div class="logo">
      <br>
      <nuxt-link :to="{name: 'index'}" class="logo text-lg">
        Home_Page
      </nuxt-link>
      <br>
      <nuxt-link to="/settings">
        Settings
      </nuxt-link>
      <br>
      <div v-if="$store.state.token">
        <p>
          <nuxt-link to="/auth">
            Authenticated users only /!\
          </nuxt-link>
          <br>
        </p>
        <br>
        <button @click="logout">
          Logout
        </button>
        <br>
        <br>
      </div>
      <p v-else>
        <nuxt-link to="/login">
          Login !
        </nuxt-link>
        <br>
        <nuxt-link to="/register">
          Register !
        </nuxt-link>
        <br>
        <nuxt-link to="/auth">
          Authenticated users only /!\
        </nuxt-link>
        <br>
      </p>
      <nuxt-link to="/reset">
        Reset password
      </nuxt-link>
      <br>
      <h1>
        Matcha
      </h1>
      <br>
      <span class="subheader">Will you find the one you dream about ?</span>
      <!-- <br>
      <div class="">Username: {{ loadedAuths.username }}</div>
      <div class="">Profile picture: {{ loadedAuths.picture }}</div> -->
      <br>
      username:
      {{ loadedUsers.username }}
      <br>
      email:
      {{ loadedUsers.email }}
      <br>
      Token:
      {{ token }}
      <br>
      serverMessage:
      {{ serverMessage }}
    </div>
  </nav>
</template>

<script>
// import Cookies from 'js-cookie'

export default {
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
  methods: {
    logout () {
      this.$store.dispatch('setLogout', null)
      this.$router.push('/')
    }
  }
}
// control doesnt' work?? ==> to review validate (data) {}
// validate (data) {
//   return /^\d+$/.test(data.params.id)
// }

</script>
<style scoped>
  nav {
    z-index: 4;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 70px;
    font-weight: lighter;
    letter-spacing: 0.5px;
  }

  .nav .logo {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .nav .logo .subheader {
    opacity: 0.70;
    font-size: 0.9rem;
    color: white;
  }

  .nav .nav-content {
    font-size: 1rem;
  }

  .nav-content ul {
    display: flex;
    list-style: none;
  }

  .nav-content ul li {
    padding: 2px 10px;
  }

  .nav-content ul li:not(:first-of-type) {
    border-left: 1px solid rgb(255, 255, 255, 0.2);
  }
</style>
