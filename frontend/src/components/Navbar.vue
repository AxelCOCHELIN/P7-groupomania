<template>
  <v-app-bar
    app
    color="deep-orange lighten-3"
    dense
    class="headline text-uppercase"
  >
    <v-toolbar-title>
      <router-link to="/">
        <v-img
          alt="Groupomania Logo"
          class="shrink mr-2"
          to="/"
          src="../assets/icon-left-font-monochrome-black.png"
          transition="scale-transition"
          width="250"
          height="60"
        />
      </router-link>
    </v-toolbar-title>
    <div v-if="currentUser.isAdmin">
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            fab
            plain
            small
            aria-label="Admin page"
            v-bind="attrs"
            v-on="on"
            to="/admin"
            ><v-icon>mdi-account-cowboy-hat</v-icon></v-btn
          ></template
        ><span dark color="black">Admin</span></v-tooltip
      >
    </div>

    <v-spacer></v-spacer>
    <div class="title" v-if="currentUser.username">
      <v-btn text class="hidden-xs-only">{{ currentUser.username }}</v-btn>

      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            fab
            plain
            small
            aria-label="Fil d'actualité"
            v-bind="attrs"
            v-on="on"
            to="/feed"
            class="hidden-xs-only"
            ><v-icon>mdi-newspaper-variant-outline</v-icon></v-btn
          ></template
        ><span dark color="black">Fil d'actualité</span></v-tooltip
      >

      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            fab
            plain
            small
            aria-label="Se déconnecter"
            v-bind="attrs"
            v-on="on"
            @click="logoutUser"
            to="/"
            ><v-icon>mdi-logout</v-icon></v-btn
          ></template
        ><span dark color="black">Se déconnecter</span></v-tooltip
      >
    </div>
    <div v-else>
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            fab
            plain
            small
            aria-label="S'identifier"
            v-bind="attrs"
            v-on="on"
            to="/login"
            ><v-icon>mdi-login</v-icon></v-btn
          ></template
        ><span dark color="black">S'identifier</span></v-tooltip
      >
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            fab
            plain
            small
            aria-label="S'enregistrer"
            v-bind="attrs"
            v-on="on"
            to="/registration"
            ><v-icon>mdi-new-box</v-icon></v-btn
          ></template
        ><span dark color="black">S'enregistrer</span></v-tooltip
      >
    </div>
  </v-app-bar>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Navbar",
  methods: {
    logoutUser() {
      this.$store.dispatch("logoutUser");
      this.$store.dispatch("setSnackbar", {
        color: "info",
        text: "Au revoir , vous êtes déconnecté!",
      });
    },
  },
  computed: {
    ...mapState(["currentUser"]),
  },
  data() {
    return {
      drawer: false,
    };
  },
};
</script>
