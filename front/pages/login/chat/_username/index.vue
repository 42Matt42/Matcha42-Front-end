<template>
  <div>
    <v-container
      class="font-weight-black purple--text text--lighten-5"
    >
      <br>Chat room with {{ target }}
    </v-container>
    <div>
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
                color="purple accent-4"
                class="mr-4 purple--text text--lighten-5"
              >
                Send Message !
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-form>
    </div>
    <v-list
      subheader
      two-line
      style="background-color: transparent"
    >
      <v-list-item
        v-for="(itemChatHistory, arrayLine) in loadedChatHistory"
        :key="arrayLine"
      >
        <v-row
          v-if="itemChatHistory.username == target"
        >
          <v-col cols="2" />
          <v-col cols="10">
            <v-list-item-content>
              <v-list-item-subtitle>{{ itemChatHistory.username }}:</v-list-item-subtitle>
              <v-list-item-title>{{ itemChatHistory.message_text }}</v-list-item-title>
            </v-list-item-content>
          </v-col>
        </v-row>
        <v-row
          v-else
        >
          <v-col>
            <v-list-item-content>
              <v-list-item-subtitle>{{ itemChatHistory.username }}:</v-list-item-subtitle>
              <v-list-item-title>{{ itemChatHistory.message_text }}</v-list-item-title>
            </v-list-item-content>
          </v-col>
        </v-row>
      </v-list-item>
    </v-list>
    <v-list
      subheader
      style="background-color: transparent"
    >
      <v-list-item
        v-for="(itemChat, arrayLine) in chatListener"
        :key="arrayLine"
      >
        <v-row
          v-if="itemChat.split(':', 1)[0] == target"
        >
          <v-col cols="2" />
          <v-col cols="10">
            <v-list-item-content>
              <v-list-item-subtitle>
                {{ itemChat.split(':', 1)[0] }}:
              </v-list-item-subtitle>
              <v-list-item-title>
                {{ itemChat.split(/^\w+:/, 2)[1] }}
              </v-list-item-title>
            </v-list-item-content>
          </v-col>
        </v-row>
        <v-row
          v-else
        >
          <v-col>
            <v-list-item-content>
              <v-list-item-subtitle>
                {{ itemChat.split(':', 1)[0] }}:
              </v-list-item-subtitle>
              <v-list-item-title>
                {{ itemChat.split(/^\w+:/, 2)[1] }}
              </v-list-item-title>
            </v-list-item-content>
          </v-col>
        </v-row>
      </v-list-item>
    </v-list>
  </div>
</template>

<script>
import axios from 'axios'
import socket from '~/plugins/socket.io.js'

/* eslint-disable */
export default {
  data () {
    return {
      target: this.$route.params.username,
      // conversationId: this.$route.params.username.conversationId,
      login: {
        username: '',
        password: ''
      },
      chatMessage: '',
      chatListener: [],
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
    },
    loadedChatHistory () {
      return this.$store.getters.loadedChatHistory
    },
    loadedMatchList () {
      return this.$store.getters.loadedMatchList
    }
  },
  created () {
    // eslint-disable-next-line
    // window.onbeforeunload = () => {
    //   socket.emit('disconnect', this.username)
    // }
    socket.on('chat', (data) => {
      // eslint-disable-next-line
      console.log('CREATED__chat', data)
      this.chatListener.push(data)
      this.$store.dispatch('setMessage', 'New PM')
    })
  },
  async asyncData (context) {
    const matchDiscussion = await context.store.getters.loadedMatchList.filter(function (matchData) {
      return matchData.username === context.route.params.username
    })
    const conversationHistory = await axios
      .get(process.env.serverUrl + '/social/messages', {
        params: {
          conversation_id: matchDiscussion[0].conversationId,
        },
        headers: {
          Authorization: 'Bearer ' + context.app.store.getters.token
        }
      })
      .then((response) => {
        /* eslint-disable */
        console.log('response_GET_ChatHistory', response)
        context.store.dispatch('setChatHistory', response.data.client)
        context.store.dispatch('setMessage', response.statusText)
      })
      .catch((error) => {
        console.log('error_GET_ChatHistory', error)
        console.log('error_client', error.response.statusText)
        context.store.dispatch('setMessage', error.response.statusText)
      })
    return {
      matchDiscussion,
      conversationHistory
    }
  },
  methods: {
    sendChatMessage () {
      if (this.$refs.form.validate()) {
        socket.emit('chat', this.loadedUsers.username, this.target, this.chatMessage)
        console.log('Chat message: ', this.chatMessage)
        console.log('sent by: ', this.loadedUsers.username)
        console.log('to: ', this.target)
      }
    }
  }
}
</script>
