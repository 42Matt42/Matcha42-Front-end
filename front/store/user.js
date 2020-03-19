import axios from 'axios'
import socket from '~/plugins/socket.io.js'

export const state = () => ({
  // User
  token: null,
  checker: 'false',
  loadedUsers: [],
  loadedPictures: []
})

export const mutations = {
  // User
  setToken (state, token) {
    state.token = token
  },
  setChecker (state, value) {
    state.checker = value
  },
  setUserData (state, userinfo) {
    state.loadedUsers = userinfo
  },
  setUsername (state, username) {
    state.loadedUsers.username = username
  },
  setUserBirthDate (state, date) {
    state.loadedUsers.birth_date = date.substr(0, 10)
  },
  registerUser (state, user) {
    state.loadedUsers.registered = user
  },
  setPictures (state, pictures) {
    for (let i = 0; i < pictures.length; i++) {
      state.loadedPictures[i] = pictures[i].link
    }
  },
  setLogoutUser (state) {
    state.token = null
    state.checker = false
    state.loadedUsers = []
    state.loadedPictures = []
  }
}

export const actions = {
  // User
  setToken ({ commit }, token) {
    commit('setToken', token)
  },
  setChecker ({ commit }, value) {
    commit('setChecker', value)
  },
  setUserData ({ commit }, users) {
    commit('setUserData', users)
    if (users.birth_date) {
      commit('setUserBirthDate', users.birth_date)
    }
  },
  setUsername ({ commit }, username) {
    commit('setUsername', username)
  },
  getUserData ({ state, commit }) {
    return axios
      .get(process.env.serverUrl + '/users/user', {
        headers: {
          Authorization: 'Bearer ' + state.token
        }
      })
      .then((response) => {
        // eslint-disable-next-line
        console.log(response)
      })
      // eslint-disable-next-line
      .catch(e => console.log (e))
  },
  registerUser ({ commit }, user) {
    const createdUser = {
      ...user
    }
    axios
      .post(process.env.serverUrl + '/users/register', createdUser)
      .then((response) => {
        /* eslint-disable */
        console.log('response_register', response)
        commit('setMessage', response.data.client)
      //   vuexContext.commit('registerUser', { ...createdUser, id: vuexContext.data.insertId })
      })
      /* eslint-disable */
      .catch((error) => {
        console.log ('error_register', error.response)
        console.log('error_data_client', error.response.data.client)
        commit('setMessage', error.response.data.client)
      })
    return {
    }
  },
  setPictures ({ commit }, pictures) {
    commit('setPictures', pictures)
  },
  getPictures ({ state, commit }) {
    axios
      .get(process.env.serverUrl + '/users/photos', {
        headers: {
          Authorization: 'Bearer ' + state.token
        }
      })
      .then((response) => {
        /* eslint-disable */
        console.log('GET response_store_mypics', response)
        commit('setPictures', response.data.client)
        commit('setMessage', response.statusText)
      })
      .catch((error) => {
        console.log('GET error_store_mypics', error.response)
      })
    return {
    }
  },
  setLogoutUser ({ commit, getters }) {
    socket.emit('logout', getters.loadedUsers.username)
    commit('setLogoutUser') 
  }
}

export const getters = {
  // User
  token (state) {
    return state.token
  },
  checker (state) {
    return state.checker
  },
  loadedUsers (state) {
    return state.loadedUsers
  },
  loadedPictures (state) {
    return state.loadedPictures
  }
}
