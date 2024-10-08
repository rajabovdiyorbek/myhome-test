import axios from "@/axios/axios";

const state = {
  token: localStorage.getItem("userToken") || null,
  errorMessage: "",
};

const mutations = {
  SET_TOKEN(state, token) {
    state.token = token;
    localStorage.setItem("userToken", token);
  },
  SET_ERROR(state, message) {
    state.errorMessage = message;
  },
  CLEAR_ERROR(state) {
    state.errorMessage = "";
  },
};

const actions = {
  async login({ commit }, { username, password }) {
    try {
      const response = await axios.post("/auth/login/", {
        username,
        password,
      });

      const { key } = response.data;
      commit("SET_TOKEN", key);
      commit("CLEAR_ERROR");
    } catch (error) {
      commit("SET_ERROR", "Неправильные данные");
      console.error("Login error:", error);
      setTimeout(() => {
        commit("CLEAR_ERROR");
      }, 3000);
    }
  },
};

const getters = {
  isAuthenticated(state) {
    return !!state.token;
  },
  getErrorMessage(state) {
    return state.errorMessage;
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
