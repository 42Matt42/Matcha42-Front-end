<template>
  <div class="chat-wrapper">
    <div ref="chat" class="chat">
      <Message
        v-for="(message,index) in messages"
        :key="`message-${index}`"
        :name="message.name"
        :text="message.text"
        :time="message.time"
        :owner="message.id === user.id"
      />
    </div>
    <div class="chat__form">
      <ChatForm />
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import Message from '@/components/Message'
import ChatForm from '@/components/ChatForm'

export default {
  layout: 'socket',
  components: {
    Message,
    ChatForm
  },
  head () {
    return {
      title: `Room ${this.user.room}`
    }
  },
  computed: {
    ...mapState(['user', 'messages'])
  },
  watch: {
    messages () {
      setTimeout(() => {
        if (this.$refs.chat) {
          this.$refs.chat.scrollTop = this.$refs.chat.scrollHeight
        }
      }, 0)
    }
  },
  methods: {
    ...mapMutations(['newMessage'])
  }
}
</script>

<style scoped>
.chat-wrapper {
  height: 100%;
  position: relative;
  overflow: hidden;
}

.chat__form {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 1rem;
  height: 80px;
}

.chat {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 80px;
  padding: 1rem;
  overflow-y: auto;
  color: #000;
}
</style>
