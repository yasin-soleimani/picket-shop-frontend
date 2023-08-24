<template>
  <ProductsCarousel
    products-title="تخفیف‌های ویژه"
    to="/most-sale-products"
    :products="products"
  />
</template>

<script lang="ts">
import Vue from "vue";
import ProductsCarousel from "./ProductsCarousel.vue";

export default Vue.extend({
  name: "LandingMostSaleProductss",
  components: {
    ProductsCarousel,
  },
  data() {
    return {
      products: [
        {
          id: 621454212453,
          name: "ماسک زیر چشم بایو آکوا مدل PEACH EXTRACT حجم 80 میلی لیتر بسته 60 عددی",
          amount: 5499000,
          img: "1691997064253.6077red-ferrari.png",
          special_sell: 0,
          inventory: 10,
          userOpinions: [{ userName: "2nya", message: "Niiice!!!" }],
        },
        {
          id: 451249214258,
          name: "ماسک زیر چشم بایو آکوا مدل PEACH EXTRACT حجم 80 میلی لیتر بسته 60 عددی",
          amount: 5499000,
          img: "1691997064253.6077red-ferrari.png",
          special_sell: 5120000,
          inventory: 0,
          userOpinions: [{ userName: "2nya", message: "Niiice!!!" }],
        },
        {
          id: 127451245342,
          name: "ماسک زیر چشم بایو آکوا مدل PEACH EXTRACT حجم 80 میلی لیتر بسته 60 عددی",
          amount: 5499000,
          img: "1691997064253.6077red-ferrari.png",
          special_sell: 0,
          inventory: 10,
          userOpinions: [{ userName: "2nya", message: "Niiice!!!" }],
        },
        {
          id: 121254214214,
          name: "ماسک زیر چشم بایو آکوا مدل PEACH EXTRACT حجم 80 میلی لیتر بسته 60 عددی",
          amount: 5499000,
          img: "1691997064253.6077red-ferrari.png",
          special_sell: 5120000,
          inventory: 10,
          userOpinions: [{ userName: "2nya", message: "Niiice!!!" }],
        },
        {
          id: 124456658142,
          name: "ماسک زیر چشم بایو آکوا مدل PEACH EXTRACT حجم 80 میلی لیتر بسته 60 عددی",
          amount: 5499000,
          img: "1691997064253.6077red-ferrari.png",
          special_sell: 5120000,
          inventory: 0,
          userOpinions: [{ userName: "2nya", message: "Niiice!!!" }],
        },
        {
          id: 534542245312,
          name: "ماسک زیر چشم بایو آکوا مدل PEACH EXTRACT حجم 80 میلی لیتر بسته 60 عددی",
          amount: 5499000,
          img: "1691997064253.6077red-ferrari.png",
          special_sell: 0,
          inventory: 10,
          userOpinions: [{ userName: "2nya", message: "Niiice!!!" }],
        },
      ],
    };
  },
});
</script>
