<template>
  <ProductsCarousel
    to="/special-products"
    :products-bg-color="`${
      $vuetify.theme.dark ? 'secondary lighten-2' : 'primary lighten-5'
    }`"
    products-title="محصولات منتخب"
    :products-title-color="`${$vuetify.theme.dark ? 'secondary' : 'primary'}`"
    :products="products"
  />
</template>

<script lang="ts">
import Vue from "vue";
import ProductsCarousel from "./ProductsCarousel.vue";

export default Vue.extend({
  name: "LandingSpecialProducts",
  components: {
    ProductsCarousel,
  },
  data() {
    return {
      products: [
        {
          id: 621454212453,
          name: "گوشی موبایل سامسونگ مدل Galaxy A14 دو سیم کارت ظرفیت 64 گیگابایت و رم 4 گیگابایت",
          amount: 5499000,
          img: "1691997064253.6077red-ferrari.png",
          special_sell: 0,
          inventory: 10,
          userOpinions: [{ userName: "2nya", message: "Niiice!!!" }],
        },
        {
          id: 451249214258,
          name: "گوشی موبایل سامسونگ مدل Galaxy A14 دو سیم کارت ظرفیت 64 گیگابایت و رم 4 گیگابایت",
          amount: 5499000,
          img: "1691997064253.6077red-ferrari.png",
          special_sell: 5120000,
          inventory: 10,
          userOpinions: [{ userName: "2nya", message: "Niiice!!!" }],
        },
        {
          id: 127451245342,
          name: "گوشی موبایل سامسونگ مدل Galaxy A14 دو سیم کارت ظرفیت 64 گیگابایت و رم 4 گیگابایت",
          amount: 5499000,
          img: "1691997064253.6077red-ferrari.png",
          special_sell: 0,
          inventory: 0,
          userOpinions: [{ userName: "2nya", message: "Niiice!!!" }],
        },
        {
          id: 121254214214,
          name: "گوشی موبایل سامسونگ مدل Galaxy A14 دو سیم کارت ظرفیت 64 گیگابایت و رم 4 گیگابایت",
          amount: 5499000,
          img: "1691997064253.6077red-ferrari.png",
          special_sell: 5120000,
          inventory: 10,
          userOpinions: [{ userName: "2nya", message: "Niiice!!!" }],
        },
        {
          id: 124456658142,
          name: "گوشی موبایل سامسونگ مدل Galaxy A14 دو سیم کارت ظرفیت 64 گیگابایت و رم 4 گیگابایت",
          amount: 5499000,
          img: "1691997064253.6077red-ferrari.png",
          special_sell: 5120000,
          inventory: 10,
          userOpinions: [{ userName: "2nya", message: "Niiice!!!" }],
        },
        {
          id: 534542245312,
          name: "گوشی موبایل سامسونگ مدل Galaxy A14 دو سیم کارت ظرفیت 64 گیگابایت و رم 4 گیگابایت",
          amount: 5499000,
          img: "1691997064253.6077red-ferrari.png",
          special_sell: 0,
          inventory: 0,
          userOpinions: [{ userName: "2nya", message: "Niiice!!!" }],
        },
      ],
    };
  },
});
</script>
