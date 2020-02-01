import Vuex from 'vuex'
import axios from 'axios'

const createStore = () => {
  return new Vuex.Store({
    state: {
      loadedUsers: [],
      loadedInfos: []
    },
    mutations: {
      setConnected (state, connected) {
        state.loadedUsers.stats = connected.data[0]
        state.loadedUsers.token = connected.meta.token
        state.loadedUsers.checker = connected.meta.access
      },
      registerUser (state, user) {
        state.loadedUsers.registered = user
      },
      // editUsers (state, editedUser) {
      //   const userIndex = state.loadedUsers.findIndex(
      //     user => user.id === editedUser.id
      // )
      // state.loadedUsers[userIndex] = editedUser
      // }
      setInfos (state, infos) {
        state.loadedInfos = infos
      }
    },
    actions: {
      nuxtServerInit (vuexContext, context) {
        // add URL of the DATABASE, return an object with the properties so we need to convert it in array
        return axios
          .get('https://cors-anywhere.herokuapp.com/https://matcha42saubinbartol.herokuapp.com')
          .then((res) => {
            // eslint-disable-next-line
            console.log(res.meta.access)
            if (res.meta.access === 'granted') {
              // const usersArray = []
              // for (const key in res.data) {
              //   usersArray.push({ ...res.data[key], id: key })
              // }
              vuexContext.commit('setConnected', res)
            }
          })
          .catch(e => context.error(e))
        // return new Promise ((resolve, reject) => {
        //   vuexContext.commit("setUsers", [
        //     {
        //       id: "888",
        //       username: "user_888",
        //       password: "secretcryptomagicpass",
        //       name: "name_888",
        //       surname: "surname_888",
        //       token: "token_888",
        //       email: "email888@888_testmatcha.fr",
        //       birth_date: "01/04/2000",
        //       location: "",
        //       photo: "",
        //     }
        //   ])
        //   resolve ()
        // })
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
      },
      // editUser (vuexContext, editedUser) {
      //   return axios.put('https://cors-anywhere.herokuapp.com/https://matcha42saubinbartol.herokuapp.com/register')
      //     .then((res) => {
      //       vuexContext.commit('editUser', editedUser)
      //     })
      //   // eslint-disable-next-line
      //   .catch(e => console.log (e))
      // },
      setInfos (vuexContext, infos) {
        vuexContext.commit('setInfos', infos)
      }
    },
    getters: {
      loadedUsers (state) {
        return state.loadedUsers
      },
      loadedInfos (state) {
        return state.loadedInfos
      }
    }
  })
}

export default createStore
