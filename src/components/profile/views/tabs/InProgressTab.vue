<template>
  <section class="section full-w mt-4">
    <AppWarning v-if="!list.length"
      >شما هیچ سفارشی در حال اجرا ندارید</AppWarning
    >
    <template v-else>
      <div class="container" v-for="invoice in list" :key="invoice._id">
        <!-- id -->
        <h3 class="text-subtitle-2 grey--text text--darken-2">
          کد پیگیری: {{ invoice._id }}
        </h3>

        <!-- totle amount -->
        <h3 class="text-subtitle-2 grey--text text--darken-2">
          قیمت نهایی:
          {{ convertToPersian(separateDigits(invoice.totalAmount)) }} ریال
        </h3>

        <div
          class="products-container"
          :style="{
            backgroundColor: `${$vuetify.theme.dark ? '#424242' : '#e1e1e1'}`,
          }"
        >
          <div
            class="product"
            :style="{
              backgroundColor: `${$vuetify.theme.dark ? '#1e1e1e' : '#ffffff'}`,
            }"
            v-for="(product, index) in invoice.productsDetails"
            :key="index"
          >
            <!-- image -->
            <v-img
              class="product-image"
              :src="LINK + imgPrefix + product.products.img"
            />

            <!-- title -->
            <h4 class="product-title grey--text text--darken-2 text-subtitle-2">
              {{ product.products.name }}
            </h4>

            <!-- quantity -->
            <p class="grey--text text-caption">
              تعداد:
              <span class="text-subtitle-2 grey--text text--darken-2">{{
                convertToPersian(product.qty)
              }}</span>
            </p>

            <!-- price -->
            <p class="grey--text text-caption">
              قیمت کل:
              <span class="text-subtitle-2 grey--text text--darken-2"
                >{{
                  convertToPersian(separateDigits(product.amount))
                }}
                ریال</span
              >
            </p>

            <!-- date -->
            <p class="grey--text text-caption mt-2">
              ایجاد شده در
              {{ convertToPersian(convertDate(product.products.createdAt)) }}
            </p>
          </div>
        </div>
      </div>
    </template>
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import store from "@/store";
import LINK from "@/utils/link";
import { convertDate } from "@/utils/date";
import { convertToPersian, separateDigits } from "@/utils/string";
import AppWarning from "@/components/UI/AppWarning.vue";

export default Vue.extend({
  name: "InProgressTab",
  components: {
    AppWarning,
  },
  data() {
    return {
      LINK: LINK,
      imgPrefix: "images/upload-product-images/",
    };
  },
  computed: {
    list() {
      return store.state.panel.invoices.filter(
        (invoice: any) => invoice.status == 1
      );
    },
  },
  methods: {
    separateDigits,
    convertToPersian,
    convertDate,
  },
});
</script>

<style lang="scss" scoped>
p {
  margin: 0 !important;
}

.section {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 0.4rem;
}

.container {
  width: 100%;
  border-radius: 12px;
  border: 1px solid #c6c6c6;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: flex-start;
  gap: 0.8rem;
  .products-container {
    width: 100%;
    max-width: 100%;
    padding: 8px;
    border-radius: 8px;
    overflow-x: auto;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 0.8rem;
    .product {
      width: 160px;
      border-radius: 8px;
      padding: 6px;
      display: flex;
      flex-direction: column;
      align-items: start;
      justify-content: flex-start;
      gap: 0.4rem;
      .product-image {
        border-radius: 8px;
      }
      .product-title {
        overflow: hidden;
        display: -webkit-box !important;
        -webkit-line-clamp: 2 !important;
        line-clamp: 2 !important;
        -webkit-box-orient: vertical !important;
      }
    }
  }
}

::-webkit-scrollbar {
  display: none;
}
</style>
