import axios from 'axios'

export const state = () => ({
  // Geoloc
  loadedMapPosition: {},
  loadedLocation: {}
})
export const mutations = {
  // Geoloc
  setMapPosition (state, geoloc) {
    state.loadedMapPosition.accuracy = geoloc.accuracy
    state.loadedMapPosition.lat = geoloc.location.lat.toFixed(7)
    state.loadedMapPosition.lng = geoloc.location.lng.toFixed(7)
  },
  setLocation (state, openstreetmap) {
    state.loadedLocation.country = openstreetmap.address.country
    state.loadedLocation.district = openstreetmap.address.city_district
    if (openstreetmap.address.city) {
      state.loadedLocation.city = openstreetmap.address.city
    } else if (openstreetmap.address.county) {
      state.loadedLocation.city = openstreetmap.address.county
    } else {
      state.loadedLocation.city = 'City'
    }
  },
  setLogoutGeoloc (state) {
    state.loadedMapPosition = {}
    state.loadedLocation = {}
  }
}
export const actions = {
  // Geoloc
  setMapPosition ({ commit }, geoloc) {
    commit('setMapPosition', geoloc)
  },
  setLocation ({ commit }, location) {
    commit('setLocation', location)
  },
  setLogoutGeoloc ({ commit }) {
    commit('setLogoutGeoloc')
  },
  setIpGeoloc ({ commit, dispatch }) {
    // eslint-disable-next-line
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
        commit('setMapPosition', response.data)
        dispatch('setReverseGeoloc')
      })
      .catch((error) => {
        console.log ('error_axios_googleAPIwelcomePage', error)
    })
  },
  setReverseGeoloc ({ state, dispatch }) {
    return axios
      .get('https://nominatim.openstreetmap.org/reverse?format=json&lon=' + state.loadedMapPosition.lng + '&lat=' + state.loadedMapPosition.lat + '&accept-language=en', {})
      .then((response) => {
        /* eslint-disable */
        console.log('response_GET_cityfinder', response)
        dispatch('setLocation', response.data)
        dispatch('sendGeoloc')
      })
      .catch((error) => {
        console.log('error_GET_cityfinder', error)
      })
  },
  sendGeoloc ({ state, dispatch, rootGetters }) {
    axios ({
      method: 'post',
      url: process.env.serverUrl + '/edit/location',
      data: {
        location: JSON.stringify({
          accuracy: state.loadedMapPosition.accuracy,
          lat: state.loadedMapPosition.lat,
          lng: state.loadedMapPosition.lng,
          country: state.loadedLocation.country,
          city: state.loadedLocation.city,
          district: state.loadedLocation.district
        })
      },
      headers: {
        'Authorization': 'Bearer ' + rootGetters['user/token']
      }
    })
      .then((response) => {
      /* eslint-disable */
        console.log('response_axios_loadedMapPosition', response)
        dispatch('interact/setMessage', "Geolocalisation updated !", { root: true })
      })
      .catch((error) => {
        console.log ('error_axios_loadedMapPosition', error)
      })
  }
}

export const getters = {
  // Geoloc
  loadedMapPosition (state) {
    return state.loadedMapPosition
  },
  loadedLocation(state) {
    return state.loadedLocation
  }
}
