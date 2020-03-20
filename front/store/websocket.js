export const state = () => ({
  // Websocket
  loadedSnackbarStatus: false,
  loadedSnackbarMessage: '',
  loadedNotifications: {},
  loadedStatus: {}
})
export const mutations = {
  // Websocket
  setSnackbarMessage (state, message) {
    state.loadedSnackbarMessage = message
  },
  setSnackbarStatus (state, value) {
    state.loadedSnackbarStatus = value
  },
  setNotifications (state, notif) {
    state.loadedNotifications = notif
  },
  readNotifications (state, notifId) {
    for (let i = 0; state.loadedNotifications.length; i++) {
      if (state.loadedNotifications[i].id === notifId) {
        state.loadedNotifications[i].read = 1
      }
    }
  },
  setLogoutWebsocket (state) {
    state.loadedSnackbarStatus = false
    state.loadedSnackbarMessage = ''
    state.loadedNotifications = {}
    state.loadedStatus = {}
  },
  setStatus (state, status) {
    state.loadedStatus = status
  }
}
export const actions = {
  // Websocket
  setSnackbarMessage ({ commit }, message) {
    commit('setSnackbarMessage', message)
    commit('setSnackbarStatus', true)
  },
  setSnackbarStatus ({ commit }, boolean) {
    commit('setSnackbarStatus', boolean)
  },
  setNotifications ({ commit }, notif) {
    commit('setNotifications', notif)
  },
  readNotifications ({ commit }, notifId) {
    commit('readNotifications', notifId)
  },
  setLogoutWebsocket ({ commit }) {
    commit('setLogoutWebsocket')
  },
  setStatus ({ commit }, status) {
    commit('setStatus', status)
  }
}

export const getters = {
  // Websocket
  loadedSnackbarMessage (state) {
    return state.loadedSnackbarMessage
  },
  loadedSnackbarStatus (state) {
    return state.loadedSnackbarStatus
  },
  loadedNotifications (state) {
    return state.loadedNotifications
  },
  loadedStatus (state) {
    return state.loadedStatus
  }
}
