<template>
  <div class="full-w">
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

    <AppLoading v-if="$store.state.app.pageLoading"></AppLoading>

    <AppWarning v-else-if="transactionsList.length === 0">
      تراکنشی وجود ندارد
    </AppWarning>

    <v-card v-else class="mt-5" elevation="2">
      <v-simple-table>
        <template v-slot:default>
          <thead>
            <tr>
              <th
                v-for="(header, i) in HeadersTable"
                :key="i"
                class="text-center"
              >
                {{ header }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(item, index) in transactionsList"
              :key="index"
              class="text-center"
            >
              <td>{{ index + 1 }}</td>
              <td class="primary--text">
                {{
                  item.title == "admin" ? "شارژ کاربر توسط ادمین" : "خرید کاربر"
                }}
              </td>
              <td>{{ convertToPersian(item.mobileUser) }}</td>
              <td>
                {{
                  item.adminFullname === "user" ? "کاربر" : item.adminFullname
                }}
              </td>
              <td>{{ convertToPersian(separateDigits(item.amount)) }} ریال</td>
              <td class="success--text">
                {{ item.status === 2 ? "انجام شده" : "در حال انجام تراکنش" }}
              </td>
              <td>{{ convertToPersian(convertFullDate(item.createdAt)) }}</td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-card>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import store from "@/store";
import { convertFullDate } from "@/utils/date";
import AppLoading from "@/components/UI/AppLoading.vue";
import AppWarning from "@/components/UI/AppWarning.vue";
import { convertToPersian, separateDigits } from "@/utils/string";

export default Vue.extend({
  name: "TransactionsList",
  components: { AppLoading, AppWarning },
  data() {
    return {
      HeadersTable: [
        "ردیف",
        "عنوان",
        "موبایل کاربر",
        "نام ادمین",
        "مبلغ شارژ",
        "وضعیت",
        "تاریخ",
      ],
    };
  },
  methods: {
    convertFullDate,
    convertToPersian,
    separateDigits,
  },
  computed: {
    transactionsList() {
      return store.state.admin.transactionsList;
    },
  },
  created(): void {
    store.state.app.pageLoading = true;
    store.dispatch("admin/getTransactionsListPanelAdmin");
  },
});
</script>
