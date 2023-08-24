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

    <AppWarning v-else-if="adminsList.length === 0">
      هیچ ادمینی وجود ندارد وجود ندارد
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
              v-for="(admin, index) in adminsList"
              :key="admin.name"
              class="text-center"
            >
              <td>{{ index + 1 }}</td>
              <td>{{ admin.fullname }}</td>
              <td>{{ convertToPersian(admin.mobile) }}</td>
              <td>{{ convertToPersian(separateDigits(admin.wallet)) }} ریال</td>
              <td>
                <v-img
                  :src="
                    admin.avatar !== ''
                      ? LINK + 'images/upload-profile-images/' + admin.avatar
                      : defaultAvatar
                  "
                  width="40"
                  max-witdh="56"
                  class="rounded-circle mx-auto"
                  alt="user default"
                />
              </td>
              <td>{{ admin.city }}</td>
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
import LINK from "@/utils/link";
import AppLoading from "@/components/UI/AppLoading.vue";
import { convertToPersian, separateDigits } from "@/utils/string";
import AppWarning from "@/components/UI/AppWarning.vue";

export default Vue.extend({
  name: "AdminAdminsList",
  components: { AppLoading, AppWarning },
  data() {
    return {
      userId: "",

      dialog: false,
      editDialog: false,

      LINK: LINK,
      defaultAvatar: require("@/assets/img/default-user.png"),

      HeadersTable: [
        "ردیف",
        "نام و نام خانوادگی",
        "موبایل",
        "موجودی",
        "پروفایل",
        "شهر",
      ],
    };
  },
  computed: {
    adminsList(): any[] {
      return store.state.admin.adminsList;
    },
  },
  methods: {
    separateDigits,
    convertToPersian,
  },
  created(): void {
    if (!store.state.admin.adminsList.length) {
      store.state.app.pageLoading = true;
      store.dispatch("admin/getAdminsList");
    }
  },
});
</script>
