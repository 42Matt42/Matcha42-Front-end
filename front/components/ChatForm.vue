<template>
  <v-text-field
    ref="msg"
    v-model="text"
    @click:append="send"
    @keydown.enter="send"
    label="Message..."
    outlined
    append-icon="mdi-send-circle-outline"
  />
</template>

<script>
import { mapState } from 'vuex'
export default {
  data: () => ({
    text: '',
    roomRules: [v => !!v || 'Enter the room']
  }),
  computed: {
    ...mapState(['user'])
  },
  methods: {
    send () {
      if (this.text.length) {
        this.$socket.emit(
          'createMessage',
          {
            text: this.text,
            id: this.user.id
          },
          (data) => {
            this.text = ''
          }
        )
      }
    }
  }
}
</script>
