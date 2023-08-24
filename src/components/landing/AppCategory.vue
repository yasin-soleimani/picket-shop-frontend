<template>
  <v-row class="my-4" justify="center">
    <v-col
      cols="1"
      md="1"
      lg="1"
      v-for="category in categories"
      :key="category.name"
      class="d-flex align-center justify-center"
      style="min-width: fit-content"
    >
      <router-link :to="category.name" class="text-decoration-none">
        <div
          class="
            category-container category-card-bg
            lighten-1
            d-flex
            flex-column
            align-center
            py-4
            rounded-lg
          "
          style="gap: 0.4rem"
        >
          <v-img
            width="40"
            :src="require(`@/assets/img/category/blue-${category.icon}.png`)"
          />
          <h5 class="primary--text text-caption font-weight-bold">
            {{ category.title }}
          </h5>
        </div>
      </router-link>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "AppCategory",
  data() {
    return {
      categories: [
        {
          name: "digital-devices",
          title: "کالای دیجیتال",
          icon: "laptop",
        },
        {
          name: "home-and-kitchen",
          title: "خانه و آشپزخانه",
          icon: "teapot",
        },
        {
          name: "health-and-beauty",
          title: "سلامت و زیبایی",
          icon: "cream",
        },
        {
          name: "sport",
          title: "ورزش و سرگرمی",
          icon: "yoga",
        },
        {
          name: "grocery",
          title: "مواد غذایی",
          icon: "milk",
        },
        {
          name: "clothes",
          title: "پوشاک",
          icon: "shirt",
        },
      ],
    };
  },
});
</script>

<style lang="scss" scoped>
.category-container {
  width: 150px;
  transition: all ease-in-out 0.2s;
  &:hover {
    transform: scale(1.02);
  }
}
</style>
