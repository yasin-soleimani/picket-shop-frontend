<template>
  <v-btn
    v-bind="{ [buttonVariantKey]: true }"
    v-on="$listeners"
    :disabled="disabled"
    large
    style="flex: 1"
    :color="`${$vuetify.theme.dark ? ' secondary' : 'primary'}`"
  >
    <slot></slot>
  </v-btn>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "AppModalButton",
  props: {
    disabled: {
      type: Boolean,
      required: false,
      default: false,
    },
    variant: {
      type: String,
      default: null,
      validator: function (value) {
        // NOTE: if you want flat type, leave this props null
        return ["outlined", "text"].includes(value);
      },
    },
  },
  computed: {
    buttonVariantKey(): string {
      const { variant } = this;
      return variant && variant !== "flat" ? variant : "default";
    },
  },
});
</script>
