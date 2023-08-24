<template>
  <v-app>
    <router-view />
    <AppSnackbar />
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import AppSnackbar from "@/components/layout/AppSnackbar.vue";
import store from "./store";

export default Vue.extend({
  name: "App",
  components: {
    AppSnackbar,
  },
  data() {
    return {
      themeMode: null,
    };
  },
  created(): void {
    // right-to-left setup
    this.$vuetify.rtl = true;

    // get user profile if token exists
    if (localStorage.getItem("picketUser")) {
      // setTimeout(function () {
      store.dispatch("panel/getProfile");
      // }, 2000);
    }

    // get app categories on first load
    // setTimeout(function () {
    store.dispatch("panel/getCategories");
    // }, 800);

    // get cart items from localStorage on first load
    store.dispatch("panel/getCartItems");

    // set theme mode saved in localstorage
    const config = JSON.parse(localStorage.getItem("picketConfig") as string);
    this.themeMode = config ? config.theme : null;
    store.dispatch("app/switchTheme", {
      theme: this.themeMode,
      component: this,
    });
  },
});
</script>

<style lang="scss">
@import "./scss/core/variables";
// base style
.full-w {
  width: 100%;
}

// scrollbar setting
::-webkit-scrollbar {
  width: 6px;
}
::-webkit-scrollbar-track {
  background-color: #fbf9f9;
}
::-webkit-scrollbar-thumb {
  background: $primary;
  border-radius: 25px;
}
</style>
