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
      },
      setLogout (state) {
        state.loadedUsers = []
        state.token = null
        state.serverMessage = null
      }
    },
    actions: {
      setConnected (vuexContext, users) {
        vuexContext.commit('setConnected', users)
      },
      setLogout (vuexContext) {
        vuexContext.commit('setLogout')
      },
      getUserData (data) {
        return axios
          .get(process.env.serverUrl + '/user', {
            headers: {
              Authorization: 'Bearer ' + data.app.store.getters.token,
              user_id: data.app.store.getters.loadedUsers.id
            }
          })
          .then((result) => {
            // eslint-disable-next-line
            console.log(result)
            // eslint-disable-next-line
            console.log(data)
          })
          // eslint-disable-next-line
          .catch(e => console.log (data))
      },
      registerUser (vuexContext, user) {
        const createdUser = {
          ...user
        }
        return axios
          .post(process.env.serverUrl + '/register', createdUser)
          // .then((result) => {
          //   // eslint-disable-next-line
          //   console.log(vuexContext)
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
      }
    }
  })
}

export default createStore
