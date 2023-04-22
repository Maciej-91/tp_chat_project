import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    username: ''
  },
  mutations: {
    setUsername(state, value) {
      state.username = value
    }
  },
  getters: {
    username(state) {
      return state.username
    }
  }
})
