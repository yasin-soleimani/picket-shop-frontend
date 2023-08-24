<template>
  <v-hover>
    <template v-slot:default="{ hover }">
      <v-card
        :to="`/products/${id}`"
        :disabled="editable ? false : inventory === 0"
        :class="[
          `${$vuetify.theme.dark ? 'dark-card' : 'light-card'}`,
          externalClass,
        ]"
        class="
          product
          carousel-card-bg
          pa-3
          px-lg-4
          py-lg-2
          overflow-hidden
          d-flex
          flex-column
          rounded-lg
          align-center
          justify-space-between
        "
        style="gap: 0.4rem"
        elevation="0"
        width="220"
        max-width="100%"
        min-height="300px"
        max-height="300px"
      >
        <!-- image -->
        <div
          style="width: 100%; height: 160px"
          class="
            my-2
            d-flex
            align-center
            justify-center
            rounded-lg
            overflow-hidden
          "
        >
          <img v-if="img.length" width="100%" :src="LINK + imgPrefix + img" />
        </div>

        <!-- title -->
        <p
          class="
            product-title
            carousel-card-title--text
            text-caption text-start
          "
          style="width: 100%"
        >
          {{ name }}
        </p>

        <!-- pricing -->
        <div v-if="inventory" style="width: 100%">
          <span
            v-if="!special_sell"
            class="text-subtitle-2"
            :class="`${
              $vuetify.theme.dark ? 'grey--text' : 'grey--text text--darken-3'
            }`"
          >
            {{ convertToPersian(separateDigits(amount)) }}</span
          >

          <span
            v-else
            class="text-caption text--lighten-1 text-decoration-line-through"
            :class="`${
              $vuetify.theme.dark ? 'grey--text text--darken-2' : 'grey--text'
            }`"
          >
            {{ convertToPersian(separateDigits(amount)) }}
          </span>
          <span
            v-if="special_sell"
            class="mr-1 secondary--text text-subtitle-2 font-weight-bold"
            >{{ convertToPersian(separateDigits(special_sell)) }}</span
          >
          <span
            class="mr-1 text-caption"
            :class="`${
              $vuetify.theme.dark ? 'grey--text' : 'grey--text text--darken-3'
            }`"
            >ریال</span
          >
        </div>

        <p v-else class="red--text font-weight-bold text-subtitle-2 text-start">
          اتمام موجودی
        </p>

        <!-- comments -->
        <div
          class="d-flex align-center justify-space-start"
          style="width: 100%; gap: 0.6rem"
        >
          <!-- comments -->
          <div class="d-flex align-center justify-center" style="gap: 4px">
            <v-icon small color="grey" class="text--lighten-1"
              >mdi-forum</v-icon
            >
            <span class="text-caption font-weight-light grey--text"
              >{{ userOpinions.length }} نظر</span
            >
          </div>
        </div>

        <!-- overlay: md =< -->
        <v-fade-transition v-if="$vuetify.breakpoint.width > 820">
          <v-overlay
            v-if="hover"
            absolute
            color="none"
            class="pa-2 d-flex flex-column align-end justify-start"
          >
            <!-- add to cart -->
            <v-btn
              v-if="!editable"
              class="pa-2 elevation-8"
              :class="`${$vuetify.theme.dark ? 'secondary' : 'primary'}`"
            >
              <span class="text-caption">افزودن به سبد خرید</span>
              <v-icon small class="mr-1">mdi-cart-plus</v-icon>
            </v-btn>

            <!-- edit -->
            <v-btn
              v-else
              :to="{ name: 'admin-edit-product', query: { id: id } }"
              class="pa-2 elevation-8"
              :class="`${$vuetify.theme.dark ? 'secondary' : 'primary'}`"
            >
              <span class="text-caption">ویرایش محصول</span>
              <v-icon small class="mr-1">mdi-pencil</v-icon>
            </v-btn>
          </v-overlay>
        </v-fade-transition>

        <!-- overlay: md > -->
        <v-overlay
          v-else
          absolute
          color="none"
          class="pa-2 d-flex flex-column align-end justify-start"
        >
          <!-- add to cart -->
          <v-btn
            v-if="!editable"
            :class="`${$vuetify.theme.dark ? 'secondary' : 'primary'}`"
            class="pa-0 ma-0 elevation-4 rounded-lg"
            icon
          >
            <v-icon small color="white">mdi-cart-plus</v-icon>
          </v-btn>

          <!-- edit -->
          <v-btn
            v-else
            :to="{ name: 'admin-edit-product', query: { id: id } }"
            :class="`${$vuetify.theme.dark ? 'secondary' : 'primary'}`"
            class="pa-0 ma-0 elevation-4 rounded-lg"
            icon
          >
            <v-icon small color="white">mdi-pencil</v-icon>
          </v-btn>
        </v-overlay>
      </v-card>
    </template>
  </v-hover>
</template>

<script lang="ts">
import Vue from "vue";
import LINK from "@/utils/link";
import { convertToPersian, separateDigits } from "@/utils/string";

export default Vue.extend({
  name: "LandingProductCard",
  data() {
    return {
      LINK: LINK,
      imgPrefix: "images/upload-product-images/",
    };
  },
  props: {
    // data
    id: {
      type: [String, Number],
      required: true,
    },
    name: {
      type: String,
      required: true,
      default: "",
    },
    amount: {
      type: Number,
      required: true,
      default: NaN,
    },
    img: {
      type: String,
      default: "",
    },
    special_sell: {
      type: Number,
      default: null,
    },
    inventory: {
      type: Number,
      required: true,
      default: 0,
    },
    userOpinions: {
      type: Array,
      required: true,
      default: function () {
        return [];
      },
    },
    // setting
    externalClass: {
      type: String,
      required: false,
      default: "",
    },
    editable: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  methods: {
    separateDigits,
    convertToPersian,
  },
});
</script>

<style lang="scss" scoped>
@import "@/scss/core/variables";
p {
  margin: 0;
}
.product {
  position: relative !important;
  transition: all 0.1s ease-in-out;
}
.dark-card {
  box-shadow: 0px 0px 6px 1px #101010 !important;
  &:hover {
    box-shadow: 0px 0px 6px 1px #000000 !important;
  }
}
.light-card {
  box-shadow: 0px 0px 6px 3px #eeeeee !important;
  &:hover {
    box-shadow: 0px 0px 6px 3px #dddddd !important;
  }
}
.carousel-card {
  border: 0;
  border-radius: 0px !important;
  box-shadow: none !important;
  &:first-child {
    border-top-right-radius: 12px !important;
    border-bottom-right-radius: 12px !important;
  }
  &:last-child {
    border-top-left-radius: 12px !important;
    border-bottom-left-radius: 12px !important;
  }
}
.product-title {
  overflow: hidden;
  display: -webkit-box !important;
  -webkit-line-clamp: 2 !important;
  line-clamp: 2 !important;
  -webkit-box-orient: vertical !important;
}
</style>
