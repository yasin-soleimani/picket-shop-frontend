<template>
  <v-container
    class="fill-width fill-height"
    style="position: relative"
    :style="{
      background: `${
        $vuetify.theme.dark
          ? 'linear-gradient(to bottom right, #242424, #384150)'
          : 'linear-gradient(to bottom right, #bad7e9, #e9f3f9)'
      }`,
    }"
    fluid
  >
    <v-card
      class="
        d-flex
        flex-column flex-lg-row
        mx-auto
        rounded-xl
        overflow-hidden
        elevation-24
      "
    >
      <div
        class="rounded-0 px-6"
        :class="`${$vuetify.theme.dark ? 'grey darken-2' : 'primary'}`"
      >
        <v-img
          width="400"
          height="100%"
          src="../assets/img/login-illustration.svg"
          alt="sign in svg"
        />
      </div>
      <v-form
        class="
          auth-form-bg
          lighten-1
          px-4 px-lg-12
          pt-8
          pb-6 pb-lg-12
          mx-0
          d-flex
          flex-column
          align-start
          justify-between
          rounded-0
        "
      >
        <!-- title -->
        <p class="text-h6 font-weight-bold mb-8">
          {{ title }}
          <span
            class="text-h5 mx-2 font-weight-black"
            :class="[
              `${$vuetify.theme.dark ? 'secondary--text' : 'primary--text'}`,
            ]"
            >پیکت</span
          >
        </p>

        <!-- fields -->
        <slot name="fields"></slot>
      </v-form>
    </v-card>

    <!-- absolute box -->
    <div class="absolute-box primary lighten-4 px-4 py-2 rounded-lg">
      <!-- home -->
      <router-link to="/" class="ml-2">
        <v-icon color="primary">mdi-home</v-icon>
      </router-link>

      <!-- theme -->
      <v-icon color="primary" class="mx-1" @click="switchTheme">
        {{ themeModeIcon }}
      </v-icon>
    </div>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import store from "@/store";

export default Vue.extend({
  name: "AuthLayout",
  props: {
    title: {
      type: String,
      required: true,
      default: "",
    },
  },
  methods: {
    switchTheme(): void {
      store.dispatch("app/switchTheme", {
        theme: null,
        component: this,
      });
    },
  },
  computed: {
    themeModeIcon(): string {
      return store.state.app.theme === "light"
        ? "mdi-weather-night"
        : "mdi-weather-sunny";
    },
  },
});
</script>

<style lang="scss" scoped>
@import "@/scss/core/variables";
.absolute-box {
  position: absolute;
  top: 0.6rem;
  right: 0.6rem;
}
</style>
