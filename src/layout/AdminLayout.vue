<template>
  <div>
    <AppHeader />
    <main class="px-2 px-lg-16 py-4 background">
      <AppLoading v-if="!$store.state.panel.user"></AppLoading>
      <slot v-else></slot>
    </main>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import AppHeader from "@/components/layout/AppHeader.vue";
import AppLoading from "@/components/UI/AppLoading.vue";

export default Vue.extend({
  name: "AppAdminLayout",
  components: {
    AppHeader,
    AppLoading,
  },
});
</script>
