<template>
  <v-container class="mt-8 d-flex flex-column" fluid>
    <!-- title -->
    <v-row dense align="center">
      <v-col cols="1">
        <span class="title-line" :class="[productsTitleColor]"></span>
      </v-col>
      <v-col
        cols="11"
        class="d-flex align-center justify-space-between"
        style="gap: 1rem"
      >
        <p
          :class="[
            `${
              $vuetify.breakpoint.mobile ? 'text-caption' : 'text-subtitle-2'
            }`,
            `${productsTitleColor}--text`,
          ]"
          class="grey--text pa-0 ma-0"
          style="min-width: max-content !important"
        >
          {{ productsTitle }}
        </p>

        <span class="title-line" :class="[productsTitleColor]"></span>

        <router-link class="text-decoration-none" :to="to">
          <div
            :class="[`${productsTitleColor}--text`]"
            class="text-caption d-flex align-center"
            style="min-width: max-content !important"
          >
            <p style="margin-bottom: 1px !important">مشاهده همه</p>
            <v-icon :color="productsTitleColor" small>mdi-chevron-left</v-icon>
          </div>
        </router-link>
      </v-col>
    </v-row>

    <!-- products -->
    <v-col cols="12" :class="[productsBgColor]" class="mt-2 rounded-lg">
      <div class="pa-3 d-flex" style="gap: 0.6rem; overflow: auto">
        <ProductCard
          v-for="product in products"
          :key="product.id"
          v-bind="product"
          externalClass="carousel-card"
        />
      </div>
    </v-col>
  </v-container>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";
import ProductCard from "./ProductCard.vue";

export default Vue.extend({
  name: "LandingProductsCarousel",
  components: {
    ProductCard,
  },
  props: {
    to: {
      type: String,
      required: true,
      default: "/",
    },
    products: {
      type: Array as PropType<{ id: number }[]>,
      required: true,
      default: function () {
        return [];
      },
    },
    productsTitle: {
      type: String,
      required: true,
      default: "",
    },
    productsTitleColor: {
      type: String,
      default: "grey",
    },
    productsBgColor: {
      type: String,
      default: "carousel-bg",
    },
  },
});
</script>

<style lang="scss" scoped>
@import "@/scss/core/variables";

::-webkit-scrollbar {
  height: 0;
}
.title {
  color: #625a5ace;
  // background-color: #;
}
.title-line {
  width: 100%;
  height: 1px;
  display: block;
  opacity: 0.6;
}
</style>
