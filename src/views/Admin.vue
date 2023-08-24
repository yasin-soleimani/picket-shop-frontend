<template>
  <AdminLayout>
    <!-- show admin actions on admin route (not child routes) -->
    <AdminActions v-if="$route.name === 'admin'"></AdminActions>
    <router-view style="min-height: 90vh"></router-view>
  </AdminLayout>
</template>

<script lang="ts">
import Vue from "vue";
import store from "@/store";
import AdminLayout from "@/layout/AdminLayout.vue";
import AdminActions from "@/components/admin/AdminActions.vue";

export default Vue.extend({
  name: "AdminPage",
  components: {
    AdminLayout,
    AdminActions,
  },
  created() {
    const user = store.state.panel.user;
    const token = localStorage.getItem("picketUser");

    // if user exists
    if (user !== null && user !== undefined) {
      // if user isn't admin
      if (user.role !== "admin") {
        // go to landing page
        this.$router.push({ name: "landing" });
      }
    } else {
      // if user not logged in
      if (token) {
        // start page loading
        store.state.app.pageLoading = true;

        // if there's token on localStorage
        setTimeout(function () {
          store.dispatch("panel/getProfile");
        }, 1000);
      } else {
        this.$router.push({ name: "login" });
      }
    }
  },
  computed: {
    adminRole() {
      return store.state.panel.user?.role || null;
    },
  },
  watch: {
    adminRole(newVal) {
      if (newVal !== "admin") {
        this.$router.push({ name: "landing" });
      }
    },
  },
});
</script>
