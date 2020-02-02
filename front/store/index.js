import Vuex from 'vuex'
import axios from 'axios'
import createPersistedState from 'vuex-persistedstate'
const cookieparser = process.server ? require('cookieparser') : undefined

const createStore = () => {
  return new Vuex.Store({
    plugins: [createPersistedState()],
    state: {
      loadedUsers: [],
      token: null,
      serverMessage: 'default'
    },
    mutations: {
      setConnected (state, connected) {
        state.loadedUsers = connected.data[0]
        state.token = connected.meta.token
        state.serverMessage = connected.meta.access
      },
      registerUser (state, user) {
        state.loadedUsers.registered = user
      },
      setToken (state, token) {
        state.token = token
      }
    },
    actions: {
      nuxtServerInit (vuexContext, context) {
        let token = null
        if (context.headers.cookie) {
          const parsed = cookieparser.parse(context.headers.cookie)
          try {
            token = JSON.parse(parsed.token)
          } catch (err) {
            // No valid cookie found
          }
        }
        vuexContext.commit('setToken', token)
      },
      setConnected (vuexContext, users) {
        vuexContext.commit('setConnected', users)
      },
      registerUser (vuexContext, user) {
        const createdUser = {
          ...user
        }
        return axios
          .post('https://cors-anywhere.herokuapp.com/https://matcha42saubinbartol.herokuapp.com/register', createdUser)
          .then((result) => {
            // eslint-disable-next-line
            console.log(vuexContext)
            vuexContext.commit('registerUser', { ...createdUser, id: result.data.insertId })
          })
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
      }
    }
  })
}

export default createStore
