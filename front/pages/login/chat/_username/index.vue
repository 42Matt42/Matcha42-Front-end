<template>
  <div>
    <v-container
      class="font-weight-black purple--text text--lighten-5"
    >
      <br>Welcome !
    </v-container>
    <div>
      {{ chatListener }}
      <br>
      <v-form
        ref="form"
        v-model="valid"
        lazy-validation
      >
        <v-container>
          <v-row>
            <v-col
              cols="10"
            >
              <div>
                <v-text-field
                  v-model.trim="chatMessage"
                  counter="42"
                  label="Type your message"
                  required
                />
              </div>
            </v-col>
          </v-row>
          <br>
          <v-row>
            <v-col>
              <v-btn
                @click="sendChatMessage"
                :disabled="!valid"
                color="blue lighten-4"
                class="mr-4"
              >
                Send Message !
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-form>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  data () {
    return {
      login: {
        username: '',
        password: ''
      },
      chatMessage: '',
      chatListener: '',
      valid: true,
      // chatRules: [
      //   v => !!v || 'Username is required',
      //   // v => v.length >= 3 || 'Pass must be more than 3 characters',
      //   v => (v && v.length <= 20) || 'Password must be less than 20 characters',
      //   v => /.{3,}/.test(v) || '3 characters minimum.',
      //   v => /^[a-zA-Z0-9_.-]*$/.test(v) || 'Must be alphanumeric characters [Abc123...]'
      // ]
      passwordVisible: false
    }
  },
  computed: {
    serverMessage () {
      return this.$store.getters.serverMessage
    },
    loadedUsers () {
      return this.$store.getters.loadedUsers
    }
  },
  created () {
    // eslint-disable-next-line
    // window.onbeforeunload = () => {
    //   socket.emit('disconnect', this.username)
    // }
    this.store.getters.loadedSocket.on('chat', (data) => {
      // eslint-disable-next-line
      console.log('CREATED__test')
      this.chatListener = data
      this.store.dispatch('setMessage', data)
    })
  },
  // mounted () {
  //   const socket = io.connect(process.env.serverUrlsocketio)
  //   // eslint-disable-next-line
  //   // window.onbeforeunload = () => {
  //   //   socket.emit('disconnect', this.username)
  //   // }
  //   socket.on('chat', (data) => {
  //     // eslint-disable-next-line
  //     console.log('MOUNTED__test')
  //     this.chatListener = data
  //     this.store.dispatch('setMessage', data)
  //   })
  // },
  methods: {
    sendChatMessage () {
      if (this.$refs.form.validate()) {
        this.store.getters.loadedSocket.emit('chat', this.loadedUsers.username, this.loadedUsers.username, this.chatMessage)
        console.log('Chat message: ', this.chatMessage)
        console.log('sent by: ', this.loadedUsers.username)
        console.log('to: ', this.loadedUsers.username)
      }
    }
  }
}
</script>
