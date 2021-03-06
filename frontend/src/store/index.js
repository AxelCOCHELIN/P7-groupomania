import Vue from "vue";
import Vuex from "vuex";
import Api from "@/services/api";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    articles: [],
    currentUser: {},
    users: [],
    snackbars: [],
  },
  mutations: {
    // Articles part
    SET_ARTICLES(state, articles) {
      state.articles = articles;
    },
    ADD_ARTICLE(state, article) {
      let articles = state.articles.concat(article);
      state.articles = articles;
    },
    DELETE_ARTICLE(state, articleId) {
      let articles = state.articles.filter((a) => a.id != articleId);
      state.articles = articles;
    },
    EDIT_ARTICLE(state, article) {
      state.articles.forEach((a) => {
        if (a.id == article.id) {
          a = article;
        }
      });
    },

    // Users part
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
    DELETE_USER(state, userId) {
      let users = state.users.filter((u) => u.id != userId);
      state.users = users;
    },

    //snackbar
    SET_SNACKBAR(state, snackbar) {
      state.snackbars = state.snackbars.concat(snackbar);
    },
  },
  actions: {
    // articles part
    async loadArticles({ commit }) {
      let response = await Api().get("/articles");
      commit("SET_ARTICLES", response.data);
    },
    async createArticle({ commit }, newArticle) {
      let response = await Api().post("/article/new", newArticle);
      let savedArticle = response.data;
      commit("ADD_ARTICLE", savedArticle);
      return savedArticle;
    },
    async deleteArticle({ commit }, article) {
      let response = await Api().delete(`/article/${article.id}`);
      if (response.status == 200 || response.status == 201) {
        commit("DELETE_ARTICLE", article.id);
      }
    },
    async editArticle({ commit }, article) {
      let response = await Api().put(`/article/${article.id}`, article);
      let newArticle = response.data;
      commit("EDIT_ARTICLE", newArticle);
      return newArticle;
    },

    // users part
    async loadUsers({ commit }) {
      let response = await Api().get("/users");
      commit("SET_USERS", response.data);
    },
    logoutUser({ commit }) {
      commit("LOGOUT_USER");
    },
    async loadCurrentUser({ commit }) {
      let user = JSON.parse(window.localStorage.currentUser || {});
      commit("SET_CURRENT_USER", user);
    },
    async deleteUser({ commit }, user) {
      let response = await Api().delete(`/users/${user.id}`);
      if (response.status == 200 || response.status == 204) {
        commit("DELETE_USER", user.id);
      }
    },
    async loginUser({ commit }, userInfo) {
      try {
        let response = await Api().post("/users/login", userInfo);
        let user = response.data;
        commit("SET_CURRENT_USER", user);
        return user;
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
        return user;
      } catch {
        return {
          error: "Une adresse e-mail est déjà enregistrée pour ce compte",
        };
      }
    },
    //snackbar
    setSnackbar({ commit }, snackbar) {
      snackbar.showing = true;
      snackbar.color = snackbar.color || "success";
      commit("SET_SNACKBAR", snackbar);
    },
  },
  modules: {},
});
