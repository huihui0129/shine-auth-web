import {createStore} from 'vuex'

export default createStore({
  state: {
    user: JSON.parse(localStorage.getItem("user") || "{}"),
    token: localStorage.getItem("token"),
  },
  getters: {
    getToken(state) {
      return state.token;
    },
    getUser(state) {
      return state.user;
    },
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
      localStorage.setItem("token", token);
    },
    setUser(state, user) {
      state.user = user;
      localStorage.setItem("user", JSON.stringify(user));
    },
  },
  actions: {},
  modules: {}
})
