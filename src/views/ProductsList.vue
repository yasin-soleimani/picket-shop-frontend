<template>
  <DefaultLayout>
    <!-- loading -->
    <div
      class="full-w d-flex align-center justify-center"
      v-if="!$store.state.panel.products.length"
      style="height: 60vh"
    >
      <p v-if="$store.state.app.loading" class="font-weight-bold">
        در حال دریافت محصولات ...
      </p>
      <p
        v-else-if="
          !$store.state.app.loading && !$store.state.panel.products.length
        "
        class="font-weight-bold"
      >
        محصولی یافت نشد!
      </p>
    </div>

    <!-- products -->
    <v-row
      class="full-w"
      v-if="$store.state.panel.products.length"
      style="min-height: 60vh"
    >
      <v-col
        cols="6"
        sm="4"
        md="3"
        lg="2"
        v-for="(product, i) in products"
        :key="i"
      >
        <ProductCard v-bind="product"></ProductCard>
      </v-col>
    </v-row>
  </DefaultLayout>
</template>

<script lang="ts">
import Vue from "vue";
import store from "@/store";
import ProductCard from "@/components/landing/products/ProductCard.vue";
import DefaultLayout from "@/layout/DefaultLayout.vue";
import { panelService } from "@/http/panel";

export default Vue.extend({
  name: "ProductsList",
  components: {
    DefaultLayout,
    ProductCard,
  },
  mounted() {
    store.state.app.loading = true;
    setTimeout(this.showProducts, 2500);
  },
  computed: {
    path() {
      return this.$route.path;
    },
    products() {
      return store.state.panel.products;
    },
    categories() {
      return store.state.panel.categories;
    },
  },
  methods: {
    showProducts() {
      // clear former products
      store.state.panel.products = [];

      // get category data
      const category: any = store.state.panel.categories.find(
        (category: any) => category.parentPath == this.path
      );

      // move to landing page if the user put wrong category name
      if (!category && this.categories.length === 0) {
        store.commit("app/showSnackbar", {
          message: "دسته بندی مورد نظر یافت نشد",
          status: 400,
        });
        this.$router.push({ name: "landing" });
      }

      // category id (if it's correct)
      const id: any = category.id;

      store.state.app.pageLoading = true;

      // get products
      if (category.parent !== null) {
        // if it's not parent, just get the products
        setTimeout(function () {
          store.dispatch("panel/getProductsById", id);
        }, 1000);
      } else {
        // if it's a parent, get its subcategories' products

        const relatedCategories = store.state.panel.categories.filter(
          (ctg: any) => ctg.parent === id
        );

        for (let categoryIndex in relatedCategories) {
          panelService
            .getProducts(relatedCategories[categoryIndex]._id)
            .then((res) => {
              store.state.app.loading = true;

              const products = store.state.panel.products;
              const concatedProducts = products.concat(res.data.data.products);

              store.commit("panel/setProducts", concatedProducts);
            })
            .catch((error) => {
              store.commit("app/showSnackbar", error.response.data);

              store.state.app.loading = false;
            });
        }
      }
    },
  },
  watch: {
    categories() {
      store.state.app.loading = true;
      setTimeout(this.showProducts, 1000);
    },
    path() {
      store.state.app.loading = true;
      setTimeout(this.showProducts, 1000);
    },
  },
});
</script>
