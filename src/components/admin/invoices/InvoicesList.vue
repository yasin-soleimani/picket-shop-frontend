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

    <AppWarning v-else-if="invoicesList.length === 0">
      هنوز سفارشی ثبت نشده
    </AppWarning>

    <v-card v-else class="mt-5" elevation="2">
      <v-simple-table>
        <template v-slot:default>
          <thead>
            <tr>
              <th
                v-for="(header, i) in tableHeaders"
                :key="i"
                class="text-center"
              >
                {{ header }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(item, index) in invoicesList"
              :key="item._id"
              class="text-center"
            >
              <td>{{ index + 1 }}</td>
              <td>{{ item.address }}</td>
              <td>
                {{ convertToPersian(separateDigits(item.totalAmount)) }} ریال
              </td>
              <td>{{ checkStatus(item.status) }}</td>
              <td>
                {{ convertFullDate(item.createdAt) }}
              </td>

              <td class="success--text">
                <v-btn
                  :color="`${$vuetify.theme.dark ? 'secondary' : 'primary'}`"
                  text
                  @click.prevent="editInvoice(item.status, item._id)"
                  v-if="item.status !== 2"
                >
                  <!-- edit -->
                  {{
                    item.status === 0 && item.status !== 2
                      ? "تایید سفارش"
                      : "پایان سفارش"
                  }}
                </v-btn>
              </td>

              <td>
                <v-btn
                  text
                  @click="dialog = true"
                  :color="`${$vuetify.theme.dark ? 'secondary' : 'primary'}`"
                  >مشاهده محصولات</v-btn
                >

                <!-- dialog -->

                <v-dialog class="my-dialog" v-model="dialog" max-width="600">
                  <v-card>
                    <v-card-title> محصولات موجود در فاکتور </v-card-title>
                    <v-card-text>
                      <div class="mx-1">
                        <v-simple-table>
                          <template v-slot:default>
                            <thead>
                              <tr>
                                <th class="text-center">ردیف</th>
                                <th class="text-center">نام محصول</th>
                                <th class="text-center">تعداد</th>
                                <th class="text-center">قیمت</th>
                                <th class="text-center">قیمت با تخفیف</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr
                                v-for="(product, index) in item.productsDetails"
                                :key="product.index"
                                class="text-center"
                              >
                                <td>{{ index + 1 }}</td>
                                <td>{{ product.products.name }}</td>
                                <td>{{ product.qty }}</td>
                                <td>
                                  {{ separateDigits(product.amount) }} ریال
                                </td>
                                <td>
                                  {{
                                    separateDigits(
                                      product.products.special_sell === 0
                                        ? product.products.amount
                                        : product.products.special_sell
                                    )
                                  }}
                                  ریال
                                </td>
                              </tr>
                            </tbody>
                          </template>
                        </v-simple-table>
                      </div>
                    </v-card-text>
                  </v-card>
                </v-dialog>
              </td>
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
import AppWarning from "@/components/UI/AppWarning.vue";
import AppLoading from "@/components/UI/AppLoading.vue";
import { convertToPersian, separateDigits } from "@/utils/string";
export default Vue.extend({
  name: "InvoicesList",

  components: { AppLoading, AppWarning },

  data() {
    return {
      dialog: false,

      tableHeaders: [
        "ردیف",
        "آدرس",
        "مجموع قیمت فاکتور",
        "وضعیت",
        "تاریخ",
        "وضعیت نهایی",
        "محصولات",
      ],
    };
  },

  computed: {
    invoicesList() {
      return store.state.admin.invoicesList;
    },
  },

  methods: {
    checkStatus(status: number) {
      if (status === 0) {
        return "در انتظار تایید";
      } else if (status === 1) {
        return "در حال ارسال";
      } else if (status === 2) {
        return "انجام شده";
      }
    },
    editInvoice(status: number, id: string) {
      if (status === 0) {
        store.dispatch("admin/acceptInvoice", id);
      } else {
        store.dispatch("admin/endInvoice", id);
      }
    },
    convertFullDate,
    separateDigits,
    convertToPersian,
  },

  created(): void {
    if (!store.state.admin.invoicesList.length) {
      store.state.app.pageLoading = true;
      store.dispatch("admin/getInvoicesList");
    }
  },
});
</script>
