<template>
  <v-snackbar v-model="snackbar" :color="errorColor">
    <span class="font-weight-medium">{{ text }}</span>
    <template v-slot:action="{ attrs }">
      <button
        text
        color="white"
        class="white--text text-decoration-underline"
        v-bind="attrs"
        @click="hideSnackbar"
      >
        باشه
      </button>
    </template>
  </v-snackbar>
</template>

<script lang="ts">
import Vue from "vue";
import store from "@/store";

export default Vue.extend({
  name: "Snackbar",
  computed: {
    errorColor(): string {
      // set error color by status code
      const statusCode: number = store.state.app.snackbarStatus;
      return [200, 201, 202].includes(statusCode) ? "success" : "error";
    },
    snackbar(): boolean {
      return store.state.app.snackbarShow;
    },
    text(): string {
      return store.state.app.snackbarText;
    },
  },
  methods: {
    hideSnackbar(): void {
      store.state.app.snackbarShow = false;
    },
  },
});
</script>
