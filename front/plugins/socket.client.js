import Vue from 'vue'
import VueSocketIO from 'vue-socket.io'

export default function () {
  Vue.use(new VueSocketIO({
    debug: true,
    connection: 'http://10.13.6.19:8080'
  }))
}
