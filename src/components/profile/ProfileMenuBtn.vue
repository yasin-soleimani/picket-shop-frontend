<template>
  <component
    :to="to"
    :is="buttonType"
    v-on="$listeners"
    style="width: 100%"
    class="
      panel-btn
      px-2
      py-2
      d-flex
      align-center
      justify-space-between
      rounded
      text-decoration-none
    "
  >
    <p class="text-caption text-md-subtitle-2 grey--text text--darken-1">
      <slot></slot>
    </p>
    <v-icon color="grey darken-1">mdi-{{ icon }}</v-icon>
  </component>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "ProfileMenuBtn",
  props: {
    to: {
      type: String,
      default: null,
    },
    icon: {
      type: String,
      default: "chevron-left",
    },
  },
  computed: {
    buttonType(): string {
      return this.to ? "router-link" : "div";
    },
  },
});
</script>

<style scoped>
p {
  margin: 0;
}
.panel-btn {
  transition: all 0.2s ease-in-out;
  cursor: pointer;
  &:hover {
    background-color: #aaaaaa20;
  }
}
.router-link-exact-active {
  background-color: #aaaaaa20;
}
</style>
