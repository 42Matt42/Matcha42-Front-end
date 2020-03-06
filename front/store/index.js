import Vuex from 'vuex'
import axios from 'axios'
import createPersistedState from 'vuex-persistedstate'
import socket from '~/plugins/socket.io.js'

const createStore = () => {
  return new Vuex.Store({
    plugins: [createPersistedState()],
    state: {
      loadedSnackbarStatus: false,
      loadedSnackbarMessage: '',
      loadedNotifications: {},
      serverMessage: 'default',
      token: null,
      loadedMapPosition: {},
      loadedLocation: {},
      loadedUsers: [],
      loadedPictures: [],
      loadedLikes: [],
      loadedViews: [],
      loadedSearchProfile: [],
      loadedMatchList: [],
      loadedChatHistory: [],
      loadedSuggestions: [],
      loadedSuggestionsSidebar: [],
      loadedAdvancedSearch: [],
      checker: 'false'
    },
    mutations: {
      modifySnackbar (state, { show = true, timeout = 0, color = 'success', message }) {
        state.loadedSnackbarStatus = show
        state.timeout = timeout
        state.color = color
        state.loadedSnackbarMessage = message
      },
      setSnackbarMessage (state, message) {
        state.loadedSnackbarMessage = message
      },
      setSnackbarStatus (state, value) {
        state.loadedSnackbarStatus = value
      },
      setNotifications (state, notifSocket) {
        state.loadedNotifications = notifSocket
      },
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
        state.loadedSnackbarStatus = false
        state.loadedSnackbarMessage = ''
        state.loadedNotifications = {}
        state.serverMessage = null
        state.token = null
        state.loadedMapPosition = {}
        state.loadedLocation = {}
        state.loadedUsers = []
        state.loadedPictures = []
        state.loadedLikes = []
        state.loadedViews = []
        state.loadedSearchProfile = []
        state.loadedMatchList = []
        state.loadedSuggestions = []
        state.loadedSuggestionsSidebar = []
        state.loadedAdvancedSearch = []
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
      setLikes (state, likes) {
        state.loadedLikes = likes
      },
      setViews (state, views) {
        state.loadedViews = views
      },
      setMatchList (state, matchlist) {
        state.loadedMatchList = matchlist
      },
      setChatHistory (state, history) {
        state.loadedChatHistory = history
      },
      setSearchProfile (state, profile) {
        state.loadedSearchProfile = profile
        state.loadedSearchProfile.location = JSON.parse(profile.location)
      },
      deleteSearchProfile (state) {
        state.loadedSearchProfile = []
      },
      setMapPosition (state, geoloc) {
        state.loadedMapPosition.accuracy = geoloc.accuracy
        state.loadedMapPosition.lat = geoloc.location.lat.toFixed(7)
        state.loadedMapPosition.lng = geoloc.location.lng.toFixed(7)
      },
      setLocation (state, openstreetmap) {
        state.loadedLocation.country = openstreetmap.address.country
        state.loadedLocation.city = openstreetmap.address.city
        state.loadedLocation.district = openstreetmap.address.city_district
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
      setPictures (state, pictures) {
        for (let i = 0; i < pictures.length; i++) {
          state.loadedPictures[i] = pictures[i].link
        }
      }
    },
    actions: {
      setSnackbarMessage (vuexContext, message) {
        vuexContext.commit('setSnackbarMessage', message)
        vuexContext.commit('setSnackbarStatus', true)
      },
      setSnackbarStatus (vuexContext, boolean) {
        vuexContext.commit('setSnackbarStatus', boolean)
      },
      notify (vuexContext, data) {
        vuexContext.commit('modifySnackbar', data)
      },
      setNotifications (vuexContext, notif) {
        vuexContext.commit('setNotifications', notif)
      },
      setUserData (vuexContext, users) {
        vuexContext.commit('setUserData', users)
        if (users.birth_date) {
          vuexContext.commit('setUserBirthDate', users.birth_date)
        }
      },
      setLogout (vuexContext) {
        socket.emit('disconnect', vuexContext.getters.loadedUsers.username)
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
      setUsername (vuexContext, username) {
        vuexContext.commit('setUsername', username)
      },
      setMapPosition (vuexContext, geoloc) {
        vuexContext.commit('setMapPosition', geoloc)
      },
      setLocation (vuexContext, location) {
        vuexContext.commit('setLocation', location)
      },
      setIpGeoloc (vuexContext) {
        // eslint-disable-next-line
        console.log('vuexContext', vuexContext)
        axios({
          method: 'post',
          url: 'https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyB2gxSBdA8xQ41FO66wPud8xJa1GIArZgU',
          data: {
            considerIp: 'true'
          }
        })
          .then((response) => {
          /* eslint-disable */
            console.log('response_axios_googleAPI', response)
            console.log('response_statusText', response.statusText)
            vuexContext.commit('setMapPosition', response.data)
            vuexContext.dispatch('setReverseGeoloc')
          })
          .catch((error) => {
            console.log ('error_axios_googleAPIwelcomePage', error)
        })
      },
      setReverseGeoloc (vuexContext) {
        return axios
          .get('https://nominatim.openstreetmap.org/reverse?format=json&lon=' + vuexContext.getters.loadedMapPosition.lng + '&lat=' + vuexContext.getters.loadedMapPosition.lat + '&accept-language=en', {})
          .then((response) => {
            /* eslint-disable */
            console.log('response_GET_cityfinder', response)
            vuexContext.dispatch('setLocation', response.data)
            vuexContext.dispatch('sendGeoloc')
          })
          .catch((error) => {
            console.log('error_GET_cityfinder', error)
          })
      },
      sendGeoloc (vuexContext) {
        axios ({
          method: 'post',
          url: process.env.serverUrl + '/edit/location',
          data: {
            location: JSON.stringify({
              accuracy: vuexContext.getters.loadedMapPosition.accuracy,
              lat: vuexContext.getters.loadedMapPosition.lat,
              lng: vuexContext.getters.loadedMapPosition.lng,
              country: vuexContext.getters.loadedLocation.country,
              city: vuexContext.getters.loadedLocation.city,
              district: vuexContext.getters.loadedLocation.district
            })
          },
          headers: {
            'Authorization': 'Bearer ' + vuexContext.getters.token
          }
        })
          .then((response) => {
          /* eslint-disable */
            console.log('response_axios_loadedMapPosition', response)
          })
          .catch((error) => {
            console.log ('error_axios_loadedMapPosition', error)
          })
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
            vuexContext.commit('setMessage', response.data.client)
          //   vuexContext.commit('registerUser', { ...createdUser, id: vuexContext.data.insertId })
          })
          /* eslint-disable */
          .catch((error) => {
            console.log ('error_register', error.response)
            console.log('error_data_client', error.response.data.client)
            vuexContext.commit('setMessage', error.response.data.client)
          })
        return {
        }
      },
      setChecker (vuexContext, value) {
        vuexContext.commit('setChecker', value)
      },
      setLikes (vuexContext, likes) {
        vuexContext.commit('setLikes', likes)
      },
      setViews (vuexContext, views) {
        vuexContext.commit('setViews', views)
      },
      setMatchList (vuexContext, matchList) {
        vuexContext.commit('setMatchList', matchList)
      },
      setChatHistory (vuexContext, history) {
        vuexContext.loadedChatHistory = history
      },
      setSearchProfile (vuexContext, profile) {
        vuexContext.commit('setSearchProfile', profile)
      },
      deleteSearchProfile (vuexContext) {
        vuexContext.commit('deleteSearchProfile')
      },
      setSuggestions (vuexContext, suggestions) {
        vuexContext.commit('setSuggestions', suggestions)
        vuexContext.dispatch('setSuggestionsSidebar')
      },
      setSuggestionsSidebar (vuexContext) {
        vuexContext.commit('setSuggestionsSidebar', vuexContext.getters.loadedSuggestions)
      },
      setAdvancedSearch (vuexContext, results) {
        vuexContext.commit('setAdvancedSearch', results)
      },
      setPictures (vuexContext, pictures) {
        vuexContext.commit('setPictures', pictures)
      },
      getPictures (vuexContext) {
        console.log('vuex', vuexContext)
        axios
          .get(process.env.serverUrl + '/users/photos', {
            headers: {
              Authorization: 'Bearer ' + vuexContext.getters.token
            }
          })
          .then((response) => {
            /* eslint-disable */
            console.log('GET response_store_mypics', response)
            vuexContext.commit('setPictures', response.data.client)
            vuexContext.commit('setMessage', response.statusText)
          })
          .catch((error) => {
            console.log('GET error_store_mypics', error.response)
          })
        return {
        }
      }
    },
    getters: {
      loadedSnackbarMessage (state) {
        return state.loadedSnackbarMessage
      },
      loadedSnackbarStatus (state) {
        return state.loadedSnackbarStatus
      },
      loadedNotifications (state) {
        return state.loadedNotifications
      },
      loadedUsers (state) {
        return state.loadedUsers
      },
      token (state) {
        return state.token
      },
      serverMessage (state) {
        return state.serverMessage
      },
      username (state) {
        return state.loadedUsers.username
      },
      loadedMapPosition (state) {
        return state.loadedMapPosition
      },
      loadedLocation(state) {
        return state.loadedLocation
      },
      checker (state) {
        return state.checker
      },
      loadedLikes (state) {
        return state.loadedLikes
      },
      loadedViews (state) {
        return state.loadedViews
      },
      loadedMatchList (state) {
        return state.loadedMatchList
      },
      loadedChatHistory (state) {
        return state.loadedChatHistory
      },
      loadedSearchProfile (state) {
        return state.loadedSearchProfile
      },
      loadedSuggestions (state) {
        return state.loadedSuggestions
      },
      loadedSuggestionsSidebar (state) {
        return state.loadedSuggestionsSidebar
      },
      loadedAdvancedSearch (state) {
        return state.loadedAdvancedSearch
      },
      loadedPictures (state) {
        return state.loadedPictures
      }
    }
  })
}
export default createStore
