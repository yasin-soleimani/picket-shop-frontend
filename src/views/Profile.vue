<template>
  <DefaultLayout>
    <AppLoading
      v-if="$store.state.app.pageLoading || !$store.state.panel.user"
    ></AppLoading>
    <v-container v-else fluid>
      <v-row justify="space-around" class="mx-auto" style="max-width: 1000px">
        <v-col
          v-if="!$vuetify.breakpoint.mobile || $route.name === 'profile'"
          fill-height
          cols="12"
          sm="4"
          md="3"
        >
          <ProfileMenu></ProfileMenu>
        </v-col>
        <v-col
          md="9"
          sm="8"
          cols="12"
          style="gap: 6px"
          v-if="$route.name !== 'profile'"
          :class="`${
            $vuetify.breakpoint.mobile ? 'd-flex flex-column align-end' : ''
          }`"
        >
          <!-- previous link -->
          <v-btn
            to="/profile"
            color="primary"
            v-if="$vuetify.breakpoint.mobile && $route.name !== 'profile'"
          >
            بازگشت
            <v-icon right>mdi-arrow-left</v-icon>
          </v-btn>
          <router-view></router-view>
        </v-col>
      </v-row>
    </v-container>
  </DefaultLayout>
</template>

<script lang="ts">
import Vue from "vue";
import store from "@/store";
import router from "@/router";
import DefaultLayout from "@/layout/DefaultLayout.vue";
import ProfileMenu from "@/components/profile/ProfileMenu.vue";
import AppLoading from "@/components/UI/AppLoading.vue";
import token from "@/static/JWT";

export default Vue.extend({
  name: "ProfilePage",
  components: {
    DefaultLayout,
    ProfileMenu,
    AppLoading,
  },
  computed: {
    mobileSize() {
      return this.$vuetify.breakpoint.mobile;
    },
  },
  watch: {
    mobileSize() {
      // push to child route if it's on larger screen
      if (!this.$vuetify.breakpoint.mobile && this.$route.name === "profile")
        router.push("/profile/personal-info");
    },
  },
  created() {
    // get user profile
    if (store.state.panel.user || token) {
      // start page loading
      store.state.app.pageLoading = true;

      setTimeout(function () {
        store.dispatch("panel/getProfile");
      }, 500);
    } else {
      router.push({ name: "login" });
    }

    // move to child route if it's on larger screen on first mount
    if (!this.$vuetify.breakpoint.mobile && this.$route.name === "profile")
      router.push("/profile/personal-info");
  },
});
</script>
