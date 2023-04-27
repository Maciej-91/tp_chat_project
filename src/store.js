import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    username: '',
    connectedUsers: [] // tableau des utilisateurs connectés
  },
  mutations: {
    setUsername(state, value) {
      state.username = value
    },
    addConnectedUser(state, user) { // ajouter un utilisateur connecté
      state.connectedUsers.push(user)
    },
    // removeConnectedUser(state, user) { // supprimer un utilisateur connecté
    //   state.connectedUsers = state.connectedUsers.filter(u => u !== user)
    // }
  },
  getters: {
    username(state) {
      return state.username
    },
    connectedUsers(state) { // getter pour la liste des utilisateurs connectés
      return state.connectedUsers
    }
  }
})
