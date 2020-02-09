<template>
  <section class="">
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
        <br>
      </div>
      <br><br>
      pop-up:<br>
      {{ serverMessage }}
      <br><br>
    </div>
  </section>
</template>

<script>
import BigHeartLogo from '~/components/layout/BigHeartLogo.vue'

export default {
  components: {
    BigHeartLogo
  },
  computed: {
    serverMessage () {
      return this.$store.getters.serverMessage
    }
  }
}
</script>

<style scoped>

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
