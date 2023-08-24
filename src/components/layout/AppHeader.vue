<template>
  <header
    class="
      header-bg
      px-2 px-md-4
      py-0
      d-flex
      align-center
      justify-space-between
    "
  >
    <div class="d-flex align-center" style="gap: 1rem">
      <!-- logo on small screens -->
      <router-link
        v-if="$vuetify.breakpoint.mobile"
        to="/"
        class="text-decoration-none"
      >
        <h2 class="mt-1" id="title">پـیـکـت</h2>
        <p class="blue-grey--text text--lighten-3 text-caption mt-n2">
          منتهی به کیفیت!
        </p>
      </router-link>

      <!-- logo on larger sizes -->
      <router-link v-else to="/" class="text-decoration-none">
        <h1 id="title">پــیــکــت</h1>
        <p class="blue-grey--text text--lighten-3 text-subtitle-2 mt-n3">
          منتهی به کیفیت!
        </p>
      </router-link>

      <!-- searchbar & navbar -->
      <div class="searchbar">
        <v-icon @click="search" color="#9495a96a">mdi-magnify</v-icon>
        <input
          ref="searchInput"
          v-model="searchText"
          type="text"
          class="primary--text text--lighten-2"
          placeholder="جستجو کنید"
        />
      </div>

      <AppNavbar v-if="$vuetify.breakpoint.width > 1060" />
    </div>

    <!-- other options -->
    <div
      class="d-flex align-center"
      :style="[{ gap: $vuetify.breakpoint.mobile ? '0.1rem' : '0.4rem' }]"
    >
      <v-btn icon class="user-cart pa-1" to="/profile/cart">
        <span class="user-cart-qty" v-if="$store.state.panel.cart.length">{{
          $store.state.panel.cart.length
        }}</span>
        <v-icon color="secondary">mdi-cart-outline</v-icon>
      </v-btn>

      <v-icon color="secondary" class="mx-1" @click="switchTheme">
        {{ themeModeIcon }}
      </v-icon>

      <v-divider vertical class="my-2"></v-divider>

      <PanelMenu />
    </div>
  </header>
</template>

<script lang="ts">
import Vue from "vue";
import AppNavbar from "@/components/AppNavbar.vue";
import PanelMenu from "../PanelMenu.vue";
import store from "@/store";

export default Vue.extend({
  name: "AppHeader",
  components: {
    AppNavbar,
    PanelMenu,
  },
  data() {
    return {
      searchText: "",
    };
  },
  methods: {
    search(): void {
      // if user has written something, search it. If not, just focus on search input
      if (!this.searchText.length) {
        (this as any).$refs.searchInput.focus();
      } else {
        // search script here
      }
    },
    switchTheme(): void {
      store.dispatch("app/switchTheme", {
        theme: null,
        component: this,
      });
    },
  },
  computed: {
    // mode setting
    themeModeIcon(): string {
      return store.state.app.theme === "light"
        ? "mdi-weather-night"
        : "mdi-weather-sunny";
    },
  },
});
</script>

<style lang="scss" scoped>
@import "../../scss/core/variables";
#title {
  font-family: lalezar;
}
header {
  border-bottom: 1px solid #e5e4e4;
}
.searchbar {
  width: 38vw !important;
  background-color: #b7b7c728;
  padding: 6px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 8px;
  border-radius: 6px;
  input {
    width: 100%;
    font-size: 14px;
    height: 100%;
    opacity: 0.8;
    padding: 2px 0;
    &:focus {
      outline: none;
    }
    &::placeholder {
      opacity: 0.6;
    }
  }
}
.user-cart {
  position: relative;
  .user-cart-qty {
    position: absolute;
    width: 14px;
    height: 14px;
    top: -4px;
    right: 0;
    border-radius: 50%;
    color: white;
    background-color: red;
    font-size: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 30;
  }
}
</style>
