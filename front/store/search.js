export const state = () => ({
  // Search
  loadedSearchProfile: [],
  loadedMatchList: [],
  loadedSuggestions: [],
  loadedSuggestionsSidebar: [],
  loadedAdvancedSearch: []
})

export const mutations = {
  // Search
  setSearchProfile (state, profile) {
    state.loadedSearchProfile = profile
    state.loadedSearchProfile.location = JSON.parse(profile.location)
  },
  deleteSearchProfile (state) {
    state.loadedSearchProfile = []
  },
  setMatchList (state, matchlist) {
    state.loadedMatchList = matchlist
  },
  setSuggestions (state, suggestions) {
    state.loadedSuggestions = suggestions.data
    for (let i = 0; i < parseInt(suggestions.length); i++) {
      state.loadedSuggestions[i].location = suggestions.data[i].location
      state.loadedSuggestions[i].hobbies = suggestions.data[i].hobbies.toString()
    }
  },
  setSuggestionsSidebar (state, suggestionsFormatted) {
    for (let i = 0; i < 3; i++) {
      state.loadedSuggestionsSidebar[i] = suggestionsFormatted[i]
    }
  },
  setAdvancedSearch (state, results) {
    state.loadedAdvancedSearch = results.data
    // for (let i = 0; i < parseInt(results.length); i++) {
    //   state.loadedAdvancedSearch[i].location = JSON.parse(results.data[i].location)
    // }
  },
  setLogoutSearch (state) {
    state.loadedSearchProfile = []
    state.loadedMatchList = []
    state.loadedSuggestions = []
    state.loadedSuggestionsSidebar = []
    state.loadedAdvancedSearch = []
  }
}

export const actions = {
  // Search
  setSearchProfile ({ commit }, profile) {
    commit('setSearchProfile', profile)
  },
  setMatchList ({ commit }, matchList) {
    commit('setMatchList', matchList)
  },
  deleteSearchProfile ({ commit }) {
    commit('deleteSearchProfile')
  },
  setSuggestions ({ commit, dispatch }, suggestions) {
    commit('setSuggestions', suggestions)
    dispatch('setSuggestionsSidebar')
  },
  setSuggestionsSidebar ({ commit, getters }) {
    commit('setSuggestionsSidebar', getters.loadedSuggestions)
  },
  setAdvancedSearch ({ commit }, results) {
    commit('setAdvancedSearch', results)
  },
  setLogoutSearch ({ commit }) {
    commit('setLogoutSearch')
  }
}

export const getters = {
  // Search
  loadedSearchProfile (state) {
    return state.loadedSearchProfile
  },
  loadedMatchList (state) {
    return state.loadedMatchList
  },
  loadedSuggestions (state) {
    return state.loadedSuggestions
  },
  loadedSuggestionsSidebar (state) {
    return state.loadedSuggestionsSidebar
  },
  loadedAdvancedSearch (state) {
    return state.loadedAdvancedSearch
  }
}
