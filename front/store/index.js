import Vuex from 'vuex'
import axios from 'axios'
import createPersistedState from 'vuex-persistedstate'
// const cookieparser = process.server ? require('cookieparser') : undefined

const createStore = () => {
  return new Vuex.Store({
    plugins: [createPersistedState()],
    state: {
      // madeInitRequest: false,
      loadedUsers: [],
      token: null,
      serverMessage: 'default',
      checker: 'false'
    },
    mutations: {
      setConnected (state, connected) {
        state.loadedUsers = connected.data[0]
        state.token = connected.meta.token
        state.serverMessage = connected.meta.access
      },
      setToken (state, token) {
        state.token = token
      },
      setLogout (state) {
        state.loadedUsers = []
        state.token = null
        state.serverMessage = null
      },
      registerUser (state, user) {
        state.loadedUsers.registered = user
      },
      setMessage (state, message) {
        state.serverMessage = message
      },
      setChecker (state, value) {
        state.checker = value
      },
      setUsername (state, username) {
        state.loadedUsers.username = username
      }
    },
    actions: {
      setConnected (vuexContext, users) {
        vuexContext.commit('setConnected', users)
      },
      setLogout (vuexContext) {
        vuexContext.commit('setLogout')
      },
      getUserData (vuexContext) {
        return axios
          .get(process.env.serverUrl + '/user', {
            headers: {
              Authorization: 'Bearer ' + vuexContext.app.store.getters.token,
              user_id: vuexContext.app.store.getters.loadedUsers.id
            }
          })
          .then((result) => {
            // eslint-disable-next-line
            console.log(result)
            // eslint-disable-next-line
            console.log(vuexContext)
          })
          // eslint-disable-next-line
          .catch(e => console.log (vuexContext))
      },
      setMessage (vuexContext, message) {
        vuexContext.commit('setMessage', message)
      },
      setChecker (vuexContext, value) {
        vuexContext.commit('checker', value)
      },
      setUsername (vuexContext, username) {
        vuexContext.commit('setUsername', username)
      },
      registerUser (vuexContext, user) {
        const createdUser = {
          ...user
        }
        return axios
          .post(process.env.serverUrl + '/register', createdUser)
          // .then((result) => {
          //   vuexContext.commit('registerUser', { ...createdUser, id: vuexContext.data.insertId })
          // })
        // eslint-disable-next-line
        .catch(e => console.log (e))
      }
    },
    getters: {
      loadedUsers (state) {
        return state.loadedUsers
      },
      token (state) {
        return state.token
      },
      serverMessage (state) {
        return state.serverMessage
      },
      checker (state) {
        return state.checker
      },
      username (state) {
        return state.loadedUsers.username
      }
    }
  })
}

export default createStore
