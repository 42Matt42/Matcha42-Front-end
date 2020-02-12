<template>
  <section class="">
    <v-container
      justify-center
      align-center
    >
      <BigHeartLogo />
      <h1 class="display-3 font-italic font-weight-medium text-center">
        <br><br>Matcha<br><br>
      </h1>
      <h2 class="display-2 font-italic font-weight-light text-center">
        The lovely dating platform !
      </h2>
      <div class="overline display-2 text-center">
        <br>Let's find The One ~~<br>
      </div>
      <br><br>
      pop-up:<br>
      {{ serverMessage }}
      <br><br>
    </v-container>
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
