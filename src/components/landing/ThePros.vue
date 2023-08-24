<template>
  <v-container class="mt-14">
    <!-- title -->
    <v-row dense align="center">
      <v-col
        cols="12"
        class="d-flex align-center justify-space-between"
        style="gap: 1rem"
      >
        <span class="title-line grey"></span>
        <p
          class="grey--text text-subtitle-2 pa-0 ma-0"
          style="min-width: max-content !important"
        >
          چرا پیکت؟
        </p>

        <span class="title-line grey"></span>
      </v-col>
    </v-row>

    <!-- items -->
    <v-row dense justify="center" class="mt-6">
      <v-col
        v-for="(pro, i) in pros"
        :key="i"
        :class="[`${$vuetify.breakpoint.mobile ? 'mx-0' : 'mx-0'}`]"
        cols="6"
        sm="3"
        style="max-width: max-content"
      >
        <div
          :class="[
            `${
              $vuetify.breakpoint.mobile
                ? 'mx-auto'
                : $vuetify.breakpoint.width > 900
                ? 'mx-2'
                : ''
            }`,
          ]"
          class="
            pt-4
            pb-2
            pt-sm-6
            pb-sm-4
            d-flex
            flex-column
            align-center
            justify-center
            landing-pros-bg
            rounded-lg
          "
          style="gap: 0.6rem"
          :style="{
            width: `${
              $vuetify.breakpoint.mobile
                ? '160px'
                : $vuetify.breakpoint.width > 900
                ? '180px'
                : '130px'
            }`,
            boxShadow: `${
              $vuetify.theme.dark
                ? '0px 0px 32px 0px #00000040'
                : '0px 0px 32px 0px #eee'
            }`,
          }"
        >
          <v-icon color="primary">
            {{ pro.icon }}
          </v-icon>
          <p
            class="primary--text"
            :class="[
              `${$vuetify.breakpoint.mobile ? 'text-caption' : 'text-body-2'}`,
            ]"
          >
            {{ pro.title }}
          </p>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "Pros",
  data() {
    return {
      pros: [
        {
          title: "بسته‌بندی مناسب",
          icon: "fas fa-box",
        },
        {
          title: "پرداخت درب منزل",
          icon: "far fa-credit-card",
        },
        {
          title: "ارسال با پیک",
          icon: "fas fa-motorcycle",
        },
        {
          title: "ارسال رایگان",
          icon: "fas fa-truck",
        },
      ],
    };
  },
});
</script>

<style lang="scss" scoped>
.title {
  color: #625a5ace;
}
.title-line {
  width: 100%;
  height: 1px;
  display: block;
  opacity: 0.6;
}
</style>
