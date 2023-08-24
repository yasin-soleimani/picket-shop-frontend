<template>
  <v-overlay color="black" :dark="false">
    <v-card
      width="360"
      :color="`grey ${$vuetify.theme.dark ? 'darken-3' : 'lighten-4'}`"
      class="pa-4 rounded-lg d-flex flex-column align-start justify-start"
    >
      <div class="full-w d-flex align-center justify-space-between">
        <h4
          class="grey--text font-weight-bold"
          :class="`${
            $vuetify.theme.dark ? 'text--lighten-2' : 'text--darken-2'
          }`"
        >
          <slot name="title"></slot>
        </h4>

        <v-btn icon @click="close">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </div>

      <v-divider
        width="100%"
        class="grey my-1"
        :class="[`${$vuetify.theme.dark ? 'darken-1' : 'lighten-2'}`]"
      ></v-divider>

      <!-- modal body -->
      <slot></slot>

      <!-- modal buttons -->
      <div class="full-w d-flex" style="gap: 0.4rem">
        <slot name="buttons"></slot>
      </div>
    </v-card>
  </v-overlay>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "AppModal",
  methods: {
    close(): void {
      this.$emit("close");
    },
  },
});
</script>
