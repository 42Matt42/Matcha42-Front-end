<template>
  <v-container>
    Redirection page, the URL you typed does not exist.
  </v-container>
</template>

<script>
export default {
  middleware: 'redirection',
  computed: {
    serverMessage () {
      return this.$store.getters.serverMessage
    }
  }
}
</script>
