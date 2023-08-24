<template>
  <router-view v-if="$route.name !== 'admin-all-products'"></router-view>
  <AppLoading v-else-if="$store.state.app.pageLoading"></AppLoading>
  <v-container v-else>
    <!-- previous link -->
    <div class="full-w d-flex align-center justify-end">
      <v-btn
        to="/admin"
        :color="`${$vuetify.theme.dark ? 'secondary' : 'primary'}`"
        text
      >
        بازگشت
        <v-icon right>mdi-arrow-left</v-icon>
      </v-btn>
    </div>

    <p>لطفا یک دسته‌بندی جهت مشاهده محصولات زیر مجموعه انتخاب کنید:</p>
    <v-select
      outlined
      hide-details
      label="دسته‌بندی"
      item-text="title"
      item-value="value"
      :items="categories"
      v-model="selectedCategory"
    ></v-select>

    <div class="full-w" v-if="selectedCategory">
      <!-- header -->
      <div
        style="gap: 1rem"
        class="full-w mt-6 d-flex align-center justify-start"
      >
        <h4>همه محصولات این دسته‌بندی</h4>
        <v-btn
          outlined
          :color="`${$vuetify.theme.dark ? 'secondary' : 'primary'}`"
          @click="addProduct"
          >ایجاد محصول جدید در این دسته‌بندی</v-btn
        >
      </div>

      <!-- products -->
      <AppWarning class="mt-16" v-if="!products.length"
        >هیچ آگهی در این دسته بندی وجود ندارد</AppWarning
      >
      <v-row v-else class="full-w mt-4">
        <v-col
          cols="6"
          sm="4"
          md="3"
          lg="2"
          v-for="product in products"
          :key="product.id"
        >
          <ProductCard v-bind="product" editable></ProductCard>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import store from "@/store";
import router from "@/router";
import { separateDigits, convertToPersian } from "@/utils/string";
import AppLoading from "@/components/UI/AppLoading.vue";
import ProductCard from "@/components/landing/products/ProductCard.vue";
import AppWarning from "@/components/UI/AppWarning.vue";

export default Vue.extend({
  name: "AdminAllProducts",
  data() {
    return {
      selectedCategory: null,
    };
  },
  components: {
    AppLoading,
    ProductCard,
    AppWarning,
  },
  computed: {
    categories(): string[] {
      const categories = store.state.panel.categories;

      let items: any[] = [];

      categories.forEach((category: any) => {
        const item = {
          title: `${category.title}: ${this.pathStyle(category.parentPath)}`,
          value: category["_id"],
        };
        items.push(item);
      });

      return items;
    },
    products(): any[] {
      return store.state.admin.adminProducts || [];
    },
  },
  methods: {
    separateDigits,
    convertToPersian,
    pathStyle(text: string): string {
      return text.split("/").splice(1).join(" > ");
    },
    getProducts(id: string): void {
      setTimeout(function () {
        store.dispatch("admin/getProducts", id);
      }, 2000);
    },
    addProduct(): void {
      router.push({
        name: "admin-add-product",
        query: { id: this.selectedCategory },
      });
    },
    editProduct(id: string): void {
      router.push({
        name: "admin-edit-product",
        query: { id: id },
      });
    },
    deleteProduct(id: string): void {
      store.dispatch("admin/deleteProduct", id);
    },
  },
  watch: {
    selectedCategory(newVal) {
      this.getProducts(newVal);
    },
  },
});
</script>

<style lang="scss" scoped>
@import "@/scss/core/variables";

.product {
  max-width: 250px;
  height: 170px;
  border: 2px solid $primary;
  border-radius: 12px;
  p,
  h3 {
    padding: 0 !important;
    margin: 0 !important;
    overflow: hidden;
    display: -webkit-box !important;
    -webkit-line-clamp: 1 !important;
    line-clamp: 1 !important;
    -webkit-box-orient: vertical !important;
  }
}
</style>
