<template>
  <article class="container">
    <h3>لطفا منتظر بمانید ...</h3>
  </article>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "AppLoading",
});
</script>

<style scoped>
.container {
  width: 100vw;
  height: 90vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
