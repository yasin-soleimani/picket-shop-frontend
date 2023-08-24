<template>
  <v-card
    width="100%"
    min-height="50vh"
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
        کیف پول
      </h4>

      <!-- increase balance -->
      <v-btn color="primary" small height="36">
        <v-icon left>mdi-plus</v-icon>
        افزایش اعتبار
      </v-btn>
    </div>

    <v-divider
      width="100%"
      class="grey mx-auto my-4"
      :class="[`${$vuetify.theme.dark ? 'darken-1' : 'lighten-3'}`]"
    ></v-divider>

    <div class="full-w">
      <h5 class="font-weight-medium">
        اعتبار:
        <span class="secondary--text font-weight-bold"
          >{{
            convertToPersian(separateDigits($store.state.panel.user.wallet))
          }}
          ریال</span
        >
      </h5>

      <AppWarning v-if="!$store.state.panel.transactions.length"
        >هنوز هیچ تراکنشی با کیف‌پول پیکت انجام ندادی</AppWarning
      >

      <!-- transactions -->
      <section class="container" v-else>
        <div
          class="transactions-container px-3"
          v-for="(item, i) in transactions"
          :key="item._id"
        >
          <!-- index -->
          <h4 class="grey--text text-subtitle-2">
            {{ convertToPersian(i + 1) }}
          </h4>

          <!-- title -->
          <h4 class="grey--text text-subtitle-2 text--darken-2">
            {{
              item.title == "admin"
                ? "شارژ کاربر توسط ادمین"
                : "خرید با کیف پول"
            }}
          </h4>

          <!-- amount -->
          <h4 class="secondary--text text-subtitle-2 font-weight-bold">
            {{ convertToPersian(separateDigits(item.amount)) }} ریال
          </h4>

          <!-- status -->
          <h4 class="grey--text text-subtitle-2">
            {{ item.status === 2 ? "انجام شده" : "در حال انجام" }}
          </h4>

          <!-- date -->
          <h4 class="grey--text text-subtitle-2">
            {{ convertToPersian(convertFullDate(item.createdAt)) }}
          </h4>
        </div>
      </section>
    </div>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
import store from "@/store";
import AppWarning from "../../UI/AppWarning.vue";
import { convertFullDate } from "@/utils/date";
import { convertToPersian, separateDigits } from "@/utils/string";

export default Vue.extend({
  name: "ProfileWallet",
  components: {
    AppWarning,
  },
  computed: {
    transactions() {
      return store.state.panel.transactions;
    },
  },
  created() {
    if (!store.state.panel.transactions.length) {
      setTimeout(function () {
        store.dispatch("panel/getTransactions");
      }, 1000);
    }
  },
  methods: {
    convertFullDate,
    convertToPersian,
    separateDigits,
  },
});
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 0.6rem;

  .transactions-container {
    width: 100%;
    height: 60px;
    padding: 4px;
    border-radius: 10px;
    border: 1px solid #c6c6c6;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
  }
}
</style>
