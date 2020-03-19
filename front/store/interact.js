export const state = () => ({
  // Interact
  serverMessage: 'default',
  serverMessageStatus: false,
  loadedChatHistory: [],
  loadedLikes: [],
  loadedViews: []
})

export const mutations = {
  // Interact
  setMessage (state, message) {
    state.serverMessage = message
    state.serverMessageStatus = true
  },
  setMessageStatusOff (state) {
    state.serverMessageStatus = false
  },
  setChatHistory (state, history) {
    state.loadedChatHistory = history
  },
  setLikes (state, likes) {
    state.loadedLikes = likes
  },
  setViews (state, views) {
    state.loadedViews = views
  },
  setLogoutInteract (state) {
    state.serverMessage = null
    state.loadedLikes = []
    state.loadedViews = []
    state.loadedChatHistory = []
  }
}

export const actions = {
  // Interact
  setMessage ({ commit }, message) {
    commit('setMessage', message)
  },
  setMessageStatusOff ({ commit }) {
    commit('setMessageStatusOff')
  },
  setChatHistory ({ commit }, history) {
    commit('setChatHistory', history)
  },
  setLikes ({ commit }, likes) {
    commit('setLikes', likes)
  },
  setViews ({ commit }, views) {
    commit('setViews', views)
  },
  setLogoutInteract ({ commit }) {
    commit('setLogoutInteract')
  }
}

export const getters = {
  // Interact
  serverMessage (state) {
    return state.serverMessage
  },
  serverMessageStatus (state) {
    return state.serverMessageStatus
  },
  loadedChatHistory (state) {
    return state.loadedChatHistory
  },
  loadedLikes (state) {
    return state.loadedLikes
  },
  loadedViews (state) {
    return state.loadedViews
  }
}
