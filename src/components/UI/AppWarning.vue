<template>
  <div
    class="full-w my-6 d-flex align-center justify-center"
    style="gap: 0.4rem"
  >
    <v-icon small color="grey">mdi-information-outline</v-icon>
    <p class="text-caption grey--text">
      <slot></slot>
    </p>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "AppWarning",
});
</script>

<style lang="scss" scoped>
p {
  margin: 0 !important;
}
</style>
