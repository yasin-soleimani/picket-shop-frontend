<template>
  <v-card
    width="100%"
    min-height="50vh"
    style="height: fit-content"
    class="pa-4 rounded-lg overflow-auto"
    :class="[`${$vuetify.theme.dark ? '' : 'grey lighten-5'}`]"
  >
    <div class="full-w d-flex align-center justify-space-between">
      <!-- title -->
      <h4
        class="grey--text font-weight-bold"
        :class="[
          `${$vuetify.theme.dark ? 'text--lighten-1' : 'text--darken-2'}`,
        ]"
      >
        سبد خرید
      </h4>

      <!-- pay -->
      <v-btn
        small
        height="36"
        :disabled="!$store.state.panel.cart.length"
        @click="submitProducts"
        :color="`${$vuetify.theme.dark ? 'secondary' : 'primary'}`"
      >
        <v-icon left>mdi-check</v-icon>
        ثبت سفارش
      </v-btn>

      <!-- pay alert -->
      <v-fade-transition>
        <AppModal v-if="payModal" @close="modal = false">
          <template #title> شما قادر به ثبت سفارش نیستید! </template>

          <template>
            <p
              class="my-6 text-center text-subtitle-2"
              :class="[
                `${$vuetify.theme.dark ? 'secondary--text' : 'red--text'}`,
              ]"
            >
              {{ payModalText }}
            </p>
          </template>

          <template #buttons>
            <AppModalBtn variant="outlined" @click="payModal = false"
              >باشه</AppModalBtn
            >
          </template>
        </AppModal>
      </v-fade-transition>

      <!-- credit modal -->
      <v-fade-transition>
        <AppModal v-if="modal" @close="modal = false">
          <template #title>ثبت سفارش و پرداخت</template>

          <template>
            <div
              class="pa-4 full-w d-flex flex-column align-start"
              style="gap: 0.2rem"
            >
              <p class="text-subtitle-2 grey--text">
                مبلغ کل سفارش:
                {{ convertToPersian(separateDigits(totalAmount)) }} ریال
              </p>
              <p class="text-subtitle-2 grey--text">
                موجودی کیف پول:
                {{
                  convertToPersian(
                    separateDigits($store.state.panel.user.wallet)
                  )
                }}
                ریال
              </p>
              <p
                class="full-w text-start text-subtitle-2 grey--text"
                v-if="$store.state.panel.user.address.length"
              >
                آدرس: {{ $store.state.panel.user.address }}
              </p>
              <v-text-field
                v-else
                dense
                block
                outlined
                class="full-w mt-2"
                label="آدرس"
                type="text"
                :color="`${$vuetify.theme.dark ? 'secondary' : 'primary'}`"
                v-model="address"
              ></v-text-field>
            </div>
          </template>

          <template #buttons>
            <AppModalBtn :disabled="!isValid" @click="payWithWallet"
              >پرداخت با اعتبار کیف‌پول</AppModalBtn
            >
            <AppModalBtn variant="outlined" disabled
              >پرداخت از طریق درگاه</AppModalBtn
            >
          </template>
        </AppModal>
      </v-fade-transition>
    </div>

    <v-divider
      width="100%"
      class="grey mx-auto my-4"
      :class="[`${$vuetify.theme.dark ? 'darken-1' : 'lighten-3'}`]"
    ></v-divider>

    <!-- cart products -->
    <AppWarning v-if="!products.length"
      >شما هیچ محصولی به سبد خرید اضافه نکردید</AppWarning
    >
    <v-row v-else no-gutters>
      <v-col cols="12" v-for="product in products" :key="product.id">
        <v-card
          :style="{
            height: `${$vuetify.breakpoint.mobile ? 'auto' : '140px'}`,
          }"
          class="
            py-2
            px-4
            my-2
            d-flex
            align-center
            rounded-lg
            product-container
            justify-space-between
          "
          :class="[`${$vuetify.breakpoint.mobile ? 'flex-column' : ''}`]"
        >
          <!-- image -->
          <v-img
            class="rounded-lg"
            :src="LINK + imgPrefix + product.img"
            style="min-width: 120px; max-width: 120px; max-height: 100%"
          />

          <div class="d-flex flex-column">
            <!-- title -->
            <h4
              :style="{
                width: `${$vuetify.breakpoint.mobile ? '100%' : '160px'}`,
              }"
              class="product-title grey--text text--darken-1"
              :class="`${
                $vuetify.breakpoint.mobile ? 'text-center mt-4' : 'text-start'
              }`"
            >
              {{ product.name }}
            </h4>

            <!-- description -->
            <p
              :style="{
                width: `${$vuetify.breakpoint.mobile ? '100%' : '200px'}`,
              }"
              v-if="!$vuetify.breakpoint.mobile"
              class="product-description text-subtitle-2 grey--text"
              :class="`${
                $vuetify.breakpoint.mobile ? 'text-center' : 'text-start'
              }`"
            >
              {{ product.description }}
            </p>
          </div>

          <!-- price -->
          <div
            class="d-flex align-center"
            :class="`${$vuetify.breakpoint.mobile ? 'my-4' : ''}`"
            style="gap: 8px"
          >
            <!-- amount -->
            <p v-if="!product.special_sell" class="text-subtitle-2">
              {{ convertToPersian(separateDigits(product.amount)) }}
              ریال
            </p>
            <div v-else class="d-flex flex-column align-center">
              <p
                class="
                  text-subtitle-2
                  grey--text
                  text--lighten-1 text-decoration-line-through
                "
              >
                {{ convertToPersian(separateDigits(product.amount)) }}
              </p>
              <p class="text-subtitle-2">
                {{ convertToPersian(separateDigits(product.special_sell)) }}
              </p>
            </div>
            <span class="text-subtitle-2">ریال</span>
          </div>

          <!-- qty -->
          <span class="text-subtitle-2"
            >تعداد: {{ convertToPersian(product.qty) }}</span
          >

          <!-- overlay -->
          <v-overlay
            absolute
            color="none"
            class="pa-2 d-flex flex-column align-end justify-start"
          >
            <!-- remove from cart -->
            <v-btn
              @click="removeProduct(product.id)"
              class="pa-2 elevation-8"
              :class="`${$vuetify.theme.dark ? 'secondary' : 'primary'}`"
            >
              <span class="text-caption" v-if="!$vuetify.breakpoint.mobile"
                >حذف</span
              >
              <v-icon small class="mr-1">mdi-trash-can</v-icon>
            </v-btn>
          </v-overlay>
        </v-card>
      </v-col>
    </v-row>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
import store from "@/store";
import LINK from "@/utils/link";
import AppModal from "@/components/UI/AppModal.vue";
import AppWarning from "@/components/UI/AppWarning.vue";
import AppModalBtn from "@/components/UI/AppModalBtn.vue";
import { separateDigits, convertToPersian } from "@/utils/string";

export default Vue.extend({
  name: "ProfileCart",
  components: {
    AppWarning,
    AppModal,
    AppModalBtn,
  },
  data() {
    return {
      modal: false,

      LINK: LINK,
      imgPrefix: "images/upload-product-images/",

      totalAmount: 0,

      payModal: false,
      payModalText: "",

      isValid: true,

      address: "",
    };
  },
  methods: {
    separateDigits,
    convertToPersian,
    submitProducts() {
      this.modal = true;

      // compare total amount with user wallet balance
      if (this.totalAmount > (store.state.panel.user?.wallet || 0)) {
        this.isValid = false;
        this.modal = false;
        this.payModal = true;
        this.payModalText = "موجودی کیف‌پول شما کافی نیست.";
      }

      // check user address
      if (store.state.panel.user?.address.length) {
        this.isValid = true;
      } else if (this.address.length) {
        this.isValid = true;
      } else {
        this.isValid = false;
      }
    },
    payWithWallet() {
      this.modal = false;

      // add new invoice
      if (this.isValid) {
        let productslist = [];

        for (let i in this.products) {
          const product = this.products[i];
          productslist.push({ productId: product.id, qty: product.qty });
        }

        const data = {
          products: productslist,
          address: store.state.panel.user?.address
            ? store.state.panel.user.address
            : this.address,
        };

        store.dispatch("panel/addNewInvoice", {
          data,
          totalAmount: this.totalAmount,
        });
      }
    },
    removeProduct(id: string) {
      store.dispatch("panel/removeCartItem", id);
    },
    // calculate
    calTotalAmount(): void {
      for (let i in this.products) {
        const product = this.products[i];
        if (product.special_sell !== 0) {
          this.totalAmount =
            this.totalAmount + product.special_sell * product.qty;
        } else {
          this.totalAmount = this.totalAmount + product.amount * product.qty;
        }
      }
    },
  },
  mounted() {
    this.calTotalAmount();
  },
  computed: {
    products(): any[] {
      return store.state.panel.cart;
    },
  },
});
</script>

<style lang="scss" scoped>
p {
  margin: 0;
}
.product-container {
  border: 1px solid #cccccc;
  background: inherit !important;
  box-shadow: none !important;

  .product-title {
    overflow: hidden;
    display: -webkit-box !important;
    -webkit-line-clamp: 1 !important;
    line-clamp: 1 !important;
    -webkit-box-orient: vertical !important;
  }
  .product-description {
    overflow: hidden;
    display: -webkit-box !important;
    -webkit-line-clamp: 2 !important;
    line-clamp: 2 !important;
    -webkit-box-orient: vertical !important;
  }
}
</style>
