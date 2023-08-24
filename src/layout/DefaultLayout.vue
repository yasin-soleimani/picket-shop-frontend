<template>
  <div>
    <AppHeader />
    <main class="px-2 px-lg-16 py-4 background">
      <slot></slot>
    </main>
    <AppFooter />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import AppHeader from "@/components/layout/AppHeader.vue";
import AppFooter from "@/components/layout/AppFooter.vue";

export default Vue.extend({
  name: "AppDefaultLayout",
  components: {
    AppHeader,
    AppFooter,
  },
});
</script>
