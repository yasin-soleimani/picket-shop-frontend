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
        تاریخچه سفارشات
      </h4>
    </div>

    <v-divider
      width="100%"
      class="grey mx-auto my-4"
      :class="[`${$vuetify.theme.dark ? 'darken-1' : 'lighten-3'}`]"
    ></v-divider>

    <div class="full-w">
      <div style="max-width: fit-content">
        <v-tabs
          height="40"
          show-arrows
          v-model="tab"
          align-with-title
          background-color="transparent"
        >
          <v-tabs-slider color="primary" class="ma-0"></v-tabs-slider>

          <v-tab class="text-subtitle-2 pa-0 ma-0">در انتظار تایید</v-tab>
          <v-tab class="text-subtitle-2 pa-0 ma-0">جاری</v-tab>
          <v-tab class="text-subtitle-2 pa-0 ma-0">انجام‌شده</v-tab>
        </v-tabs>

        <v-divider
          width="100%"
          class="grey"
          :class="[`${$vuetify.theme.dark ? 'darken-1' : 'lighten-2'}`]"
        ></v-divider>
      </div>

      <v-tabs-items v-model="tab">
        <!-- waiting -->
        <v-tab-item>
          <WaitingTab></WaitingTab>
        </v-tab-item>
        <!-- in progress -->
        <v-tab-item>
          <InProgressTab></InProgressTab>
        </v-tab-item>
        <!-- done -->
        <v-tab-item>
          <DoneTab></DoneTab>
        </v-tab-item>
      </v-tabs-items>
    </div>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
// tabs
import WaitingTab from "@/components/profile/views/tabs/WaitingTab.vue";
import InProgressTab from "@/components/profile/views/tabs/InProgressTab.vue";
import DoneTab from "@/components/profile/views/tabs/DoneTab.vue";
import store from "@/store";

export default Vue.extend({
  name: "ProfilePurchases",
  components: {
    // AppWarn,
    WaitingTab,
    InProgressTab,
    DoneTab,
  },
  data() {
    return {
      tab: null,
    };
  },
  created() {
    if (!store.state.panel.invoices.length) {
      setTimeout(function () {
        store.dispatch("panel/getInvoices");
      }, 1000);
    }
  },
});
</script>

<style lang="scss" scoped>
.theme--light.v-tabs-items {
  background-color: transparent;
}
</style>
