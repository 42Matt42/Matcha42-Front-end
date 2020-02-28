import Vuex from 'vuex'
import axios from 'axios'
import createPersistedState from 'vuex-persistedstate'
// const cookieparser = process.server ? require('cookieparser') : undefined

const createStore = () => {
  return new Vuex.Store({
    plugins: [createPersistedState()],
    state: {
      serverMessage: 'default',
      token: null,
      loadedMapPosition: {},
      loadedLocation: {},
      loadedUsers: [],
      loadedLikes: [],
      loadedViews: [],
      loadedSearchProfile: [],
      loadedSuggestions: [],
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
        state.loadedMapPosition = {}
        state.loadedLocation = {}
        state.loadedLikes = []
        state.loadedViews = []
        state.loadedSearchProfile = []
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
      setSearchProfile (state, profile) {
        state.loadedSearchProfile = profile
        // state.loadedSearchProfile.photos = profile.photos
        state.loadedSearchProfile.location = JSON.parse(profile.location)
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
        for (let i = 0; i < parseInt(suggestions.lenght); i++) {
          state.loadedSuggestions[i].location = JSON.parse(suggestions.data[i].location)
        }
      },
      setPictures (state, pictures) {
        for (let i = 0; i < pictures.length; i++) {
          state.loadedPictures[i] = pictures[i].link
        }
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
      setUsername (vuexContext, username) {
        vuexContext.commit('setUsername', username)
      },
      setMapPosition (vuexContext, geoloc) {
        vuexContext.commit('setMapPosition', geoloc)
      },
      setLocation (vuexContext, location) {
        vuexContext.commit('setLocation', location)
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
      // updateUser (vuexContext, updatedUser) {
      //   const upUser = {
      //     ...updatedUser
      //   }
      //   axios
      //     .post(process.env.serverUrl + '/users/update', upUser)
      //     .then((response) => {
      //       /* eslint-disable */
      //       console.log('response_updateUser', response)
      //       vuexContext.commit('setMessage', response.client)
      //     //   vuexContext.commit('registerUser', { ...createdUser, id: vuexContext.data.insertId })
      //     })
      //     /* eslint-disable */
      //     .catch((error) => {
      //       console.log ('error_updateUser', error)
      //       console.log('error_client', error.response.client)
      //       vuexContext.commit('setMessage', error.response.client)
      //     })
      //   return {
      //   }
      // },
      setChecker (vuexContext, value) {
        vuexContext.commit('setChecker', value)
      },
      setLikes (vuexContext, likes) {
        vuexContext.commit('setLikes', likes)
      },
      setViews (vuexContext, views) {
        vuexContext.commit('setViews', views)
      },
      setSearchProfile (vuexContext, profile) {
        vuexContext.commit('setSearchProfile', profile)
      },
      setSuggestions (vuexContext, suggestions) {
        vuexContext.commit('setSuggestions', suggestions)
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
      loadedSearchProfile (state) {
        return state.loadedSearchProfile
      },
      loadedSuggestions (state) {
        return state.loadedSuggestions
      },
      loadedPictures (state) {
        return state.loadedPictures
      }
    }
  })
}
export default createStore
