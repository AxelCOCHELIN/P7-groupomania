import Vue from "vue";
import Vuex from "vuex";
import Api from "@/services/api";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    articles: [],
    currentUser: {},
    users: [],
  },
  mutations: {
    SET_ARTICLES(state, articles) {
      state.articles = articles;
    },
    LOGOUT_USER(state) {
      state.currentUser = {};
      window.localStorage.currentUser = JSON.stringify({});
    },
    SET_CURRENT_USER(state, user) {
      state.currentUser = user;
      window.localStorage.currentUser = JSON.stringify(user);
    },
    SET_USERS(state, users) {
      state.users = users;
    },
    ADD_ARTICLE(state, article) {
      let articles = state.articles.concat(article);
      state.articles = articles;
    },
  },
  actions: {
    async loadUsers({ commit }) {
      let response = await Api().get("/users");
      commit("SET_USERS", response.data);
    },
    async loadArticles({ commit }) {
      let response = await Api().get("/articles");
      commit("SET_ARTICLES", response.data);
    },
    async createArticle({ commit }, newArticle) {
      let response = await Api().post("/article/new", newArticle);
      commit("ADD_ARTICLE", response.data);
    },
    logoutUser({ commit }) {
      commit("LOGOUT_USER");
    },
    async loadCurrentUser({ commit }) {
      let user = JSON.parse(window.localStorage.currentUser);
      commit("SET_CURRENT_USER", user);
    },
    async loginUser({ commit }, userInfo) {
      try {
        let response = await Api().post("/users/login", userInfo);
        let user = response.data;
        commit("SET_CURRENT_USER", user);
      } catch {
        return {
          error:
            "La combinaison email/mot de passe est incorrecte. Merci de réessayer",
        };
      }
    },
    async registerUser({ commit }, registrationInfo) {
      try {
        let response = await Api().post(
          "/users/registration",
          registrationInfo
        );
        let user = response.data;
        commit("SET_CURRENT_USER", user);
      } catch {
        return {
          error: "Une erreur est survenue. Merci de réessayer",
        };
      }
    },
  },
  modules: {},
});
