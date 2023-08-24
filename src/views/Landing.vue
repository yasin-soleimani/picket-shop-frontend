<template>
  <DefaultLayout>
    <v-container class="landing-container" fluid>
      <!-- banners -->
      <TopBanner />

      <!-- category -->
      <AppCategory />

      <!-- special products -->
      <SpecialProducts />

      <!-- the pros -->
      <ThePros />

      <!-- sale products -->
      <SaleProducts />

      <!-- newest products -->
      <NewestProducts />
    </v-container>
  </DefaultLayout>
</template>

<script lang="ts">
import Vue from "vue";
import TopBanner from "@/components/landing/TopBanner.vue";
import DefaultLayout from "@/layout/DefaultLayout.vue";
import AppCategory from "@/components/landing/AppCategory.vue";
import SpecialProducts from "@/components/landing/products/SpecialProducts.vue";
import SaleProducts from "@/components/landing/products/SaleProducts.vue";
import NewestProducts from "@/components/landing/products/NewestProducts.vue";
import ThePros from "@/components/landing/ThePros.vue";

export default Vue.extend({
  name: "LandingPage",
  components: {
    DefaultLayout,
    TopBanner,
    AppCategory,
    SpecialProducts,
    SaleProducts,
    NewestProducts,
    ThePros,
  },
});
</script>

<style lang="scss" scoped>
@import "../scss/core/variables";
.landing-container {
  position: relative;
}
</style>
