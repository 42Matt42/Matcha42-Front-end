import Vuex from 'vuex'
import axios from 'axios'
import createPersistedState from 'vuex-persistedstate'
// const cookieparser = process.server ? require('cookieparser') : undefined

const createStore = () => {
  return new Vuex.Store({
    plugins: [createPersistedState()],
    state: {
      loadedUsers: [],
      token: null,
      serverMessage: 'default',
      loadedPictures: [],
      checker: 'false'
    },
    mutations: {
      setUserData (state, userinfo) {
        state.loadedUsers = userinfo
      },
      setUserBirthDate (state, date) {
        state.loadedUsers.birth_date = date.substr(0, 10)
      },
      setToken (state, token) {
        state.token = token
      },
      setLogout (state) {
        state.loadedUsers = []
        state.loadedPictures = []
        state.token = null
        state.serverMessage = null
        state.checker = false
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
      },
      setPictures (state, pictures) {
        for (let i = 0; i < pictures.length; i++) {
          state.loadedPictures[i] = pictures[i].link
        }
      },
      // setOnePicture (state, picture) {
      //   state.loadedPictures[0] = picture
      // },
      setOnePicture (state, picture, number) {
        state.loadedPictures[0] = picture
      }
    },
    actions: {
      setUserData (vuexContext, users) {
        vuexContext.commit('setUserData', users)
        if (users.birth_date) {
          vuexContext.commit('setUserBirthDate', users.birth_date)
        }
      },
      setLogout (vuexContext) {
        vuexContext.commit('setLogout')
      },
      getUserData (vuexContext) {
        return axios
          .get(process.env.serverUrl + '/users/user', {
            headers: {
              Authorization: 'Bearer ' + vuexContext.app.store.getters.token
            }
          })
          .then((response) => {
            // eslint-disable-next-line
            console.log(response)
            // eslint-disable-next-line
            console.log(vuexContext)
          })
          // eslint-disable-next-line
          .catch(e => console.log (vuexContext))
      },
      setMessage (vuexContext, message) {
        vuexContext.commit('setMessage', message)
      },
      setToken (vuexContext, token) {
        vuexContext.commit('setToken', token)
      },
      setChecker (vuexContext, value) {
        vuexContext.commit('setChecker', value)
      },
      setUsername (vuexContext, username) {
        vuexContext.commit('setUsername', username)
      },
      registerUser (vuexContext, user) {
        const createdUser = {
          ...user
        }
        axios
          .post(process.env.serverUrl + '/users/register', createdUser)
          .then((response) => {
            /* eslint-disable */
            console.log('response_register', response)
            vuexContext.commit('setMessage', response.client)
          //   vuexContext.commit('registerUser', { ...createdUser, id: vuexContext.data.insertId })
          })
          /* eslint-disable */
          .catch((error) => {
            console.log ('error_register', error)
            console.log('error_data_client', error.response.client)
            vuexContext.commit('setMessage', error.response.client)
          })
        return {
        }
      },
      updateUser (vuexContext, updatedUser) {
        const upUser = {
          ...updatedUser
        }
        axios
          .post(process.env.serverUrl + '/users/update', upUser)
          .then((response) => {
            /* eslint-disable */
            console.log('response_update', response)
            vuexContext.commit('setMessage', response.client)
          //   vuexContext.commit('registerUser', { ...createdUser, id: vuexContext.data.insertId })
          })
          /* eslint-disable */
          .catch((error) => {
            console.log ('error_update', error)
            console.log('error_client', error.response.client)
            vuexContext.commit('setMessage', error.response.client)
          })
        return {
        }
      },
      setPictures (vuexContext, pictures) {
        vuexContext.commit('setPictures', pictures)
      },
      setOnePicture (vuexContext, picture) { //, number) {
        vuexContext.commit('setOnePicture', picture) //, number)
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
      },
      loadedPictures (state) {
        return state.loadedPictures
      }
    }
  })
}
export default createStore
