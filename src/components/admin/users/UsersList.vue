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

    <AppWarning v-else-if="usersListData.length === 0">
      هیچ کاربری وجود ندارد
    </AppWarning>

    <v-card v-else class="mt-5" elevation="2">
      <!-- table -->
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
              v-for="(user, index) in usersListData"
              :key="user.name"
              class="text-center"
            >
              <td>{{ index + 1 }}</td>
              <td>{{ user.fullname }}</td>
              <td>{{ convertToPersian(user.mobile) }}</td>
              <td>{{ convertToPersian(separateDigits(user.wallet)) }} ریال</td>
              <td>
                <v-img
                  width="36"
                  style="max-width: 36px !important"
                  class="rounded-circle mx-auto"
                  :src="
                    user.avatar !== ''
                      ? LINK + 'images/upload-profile-images/' + user.avatar
                      : defaultAvatar
                  "
                  alt="user"
                ></v-img>
              </td>
              <td>
                <v-btn
                  text
                  :color="`${$vuetify.theme.dark ? 'secondary' : 'primary'}`"
                  @click="showDialog(user._id)"
                  >شارژ کیف پول</v-btn
                >
              </td>

              <td>
                <v-btn
                  text
                  :color="`${$vuetify.theme.dark ? 'secondary' : 'primary'}`"
                  @click="showEditDialog(user)"
                  >ویرایش حساب</v-btn
                >
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>

      <!-- ----dialogs---- -->

      <!-- wallet charge dialog -->
      <v-dialog class="my-dialog" v-model="dialog" max-width="600">
        <v-card>
          <v-card-title> شارژ کیف پول کاربر </v-card-title>
          <v-card-text>
            <div class="mx-1">
              <v-text-field
                color="secondary"
                outlined
                label="مبلغ (ریال)"
                class="register-text-field rounded-lg subtitle-2"
                type="number"
                v-model="amount"
                oninput="this.value=this.value.slice(0,this.dataset.maxlength)"
              >
              </v-text-field>
            </div>

            <div class="d-flex justify-center text-center">
              <v-card
                class="pointer ma-2 pt-3"
                @click="amount = 100000"
                max-width="170px"
                min-width="170px"
                min-height="50px"
              >
                <span>{{ convertToPersian("100,000") }} ریال</span>
              </v-card>
              <v-card
                class="pointer ma-2 pt-3"
                @click="amount = 200000"
                max-width="170px"
                min-width="170px"
                min-height="50px"
              >
                <span>{{ convertToPersian("200,000") }} ریال</span>
              </v-card>
              <v-card
                class="pointer ma-2 pt-3"
                @click="amount = 500000"
                max-width="170px"
                min-width="170px"
                min-height="50px"
              >
                <span>{{ convertToPersian("500,000") }} ریال</span>
              </v-card>
            </div>
            <div class="mt-3">
              <v-btn
                class="white--text"
                @click="chargeUserWallet"
                color="primary"
                block
                :disabled="
                  amount === 0 ||
                  amount === null ||
                  String(amount).length === 0 ||
                  amount < 1000
                "
              >
                <span class="my-3">شارژ کیف پول </span>
              </v-btn>
            </div>
          </v-card-text>
        </v-card>
      </v-dialog>

      <!-- edit user profile dialog -->
      <v-dialog class="my-dialog" v-model="editDialog" max-width="600">
        <v-card>
          <v-card-title>ویرایش اطلاعات کاربر</v-card-title>
          <v-card-text>
            <div
              style="gap: 1rem"
              class="full-w mb-4 d-flex align-center justify-start"
            >
              <!-- image -->
              <v-img
                :src="
                  selectedUser.avatar !== ''
                    ? LINK +
                      'images/upload-profile-images/' +
                      selectedUser.avatar
                    : $store.state.admin.userProfile.avatar !== ''
                    ? $store.state.admin.userProfile.avatar
                    : defaultAvatar
                "
                style="width: 40px; max-width: 40px"
                class="rounded-circle"
                alt="user default"
              />

              <div
                class="d-flex align-center justify-center"
                style="gap: 0.4rem"
              >
                <!-- upload -->
                <v-btn
                  small
                  class="pa-0"
                  color="grey lighten-2 elevation-0 grey--text text--darken-3"
                >
                  <label
                    style="width: 100%; height: 100%"
                    class="upload-avatar px-4 py-2"
                    @change="uploadAvatar($event)"
                  >
                    آپلود عکس
                    <input
                      type="file"
                      accept="image/png, image/jpeg, image/jpg"
                    />
                  </label>
                </v-btn>

                <!-- remove -->
                <v-btn
                  text
                  small
                  class="ma-0"
                  color="secondary"
                  @click="removeAvatar"
                  v-if="$store.state.admin.userProfile.avatar !== ''"
                  >حذف تصویر</v-btn
                >
              </div>
            </div>
            <div>
              <!-- fullname -->
              <v-text-field
                outlined
                type="text"
                label="نام"
                v-model="name"
              ></v-text-field>

              <!-- mobile -->
              <v-text-field
                type="number"
                label="شماره موبایل"
                :value="selectedUser.mobile"
                disabled
              ></v-text-field>
              <!-- address -->
              <v-text-field
                outlined
                type="text"
                label="آدرس"
                v-model="address"
              ></v-text-field>
              <!-- provinces -->
              <v-select
                color="secondary"
                class="text-subtitle-2"
                label="استان"
                :items="provinces()"
                v-model="province"
                outlined
              ></v-select>

              <!-- cities -->
              <v-select
                color="secondary"
                class="text-subtitle-2"
                label="شهر"
                :items="cities($store.state.admin.userProfile.province)"
                v-model="city"
                :disabled="$store.state.admin.userProfile.province === ''"
                outlined
              ></v-select>

              <v-btn
                block
                x-large
                color="primary"
                @click.prevent="editUserProfile"
                >ثبت تغییرات</v-btn
              >
            </div>
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-card>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import store from "@/store";
import LINK from "@/utils/link";
import { provinces, cities } from "@/utils/geography";
import AppLoading from "@/components/UI/AppLoading.vue";
import AppWarning from "@/components/UI/AppWarning.vue";
import { convertToPersian, separateDigits } from "@/utils/string";

export default Vue.extend({
  name: "AdminsUsersList",
  components: { AppLoading, AppWarning },
  data() {
    return {
      userId: "",

      selectedUser: {
        id: "",
        avatar: "",
        mobile: "",
      },

      LINK: LINK,
      defaultAvatar: require("@/assets/img/default-user.png"),

      dialog: false,
      editDialog: false,
      HeadersTable: [
        "ردیف",
        "نام و نام خانوادگی",
        "موبایل",
        "موجودی",
        "پروفایل",
        "عملیات",
        "خدمات",
      ],
    };
  },
  computed: {
    usersListData(): any[] {
      return store.state.admin.usersList;
    },
    // wallet charge
    amount: {
      get(): number {
        return store.state.admin.amountWalletCharge.amount;
      },
      set(value: number): void {
        store.dispatch("admin/setAmountWalletCharge", value);
      },
    },
    // user profile
    name: {
      get(): string {
        return store.state.admin.userProfile.fullname || "";
      },
      set(value: string): void {
        store.dispatch("admin/setUserFullname", value);
      },
    },
    address: {
      get(): string {
        return store.state.admin.userProfile.address || "";
      },
      set(value: string): void {
        store.dispatch("admin/setUserAddress", value);
      },
    },
    province: {
      get(): string {
        return store.state.admin.userProfile.province || "";
      },
      set(value: string): void {
        store.dispatch("admin/setUserProvince", value);
      },
    },
    city: {
      get(): string {
        return store.state.admin.userProfile.city || "";
      },
      set(value: string): void {
        store.dispatch("admin/setUserCity", value);
      },
    },
  },
  methods: {
    provinces,
    cities,
    showDialog(id: string) {
      this.userId = id;
      this.dialog = true;
    },
    showEditDialog(data: any) {
      this.editDialog = true;

      // set selected user data
      this.selectedUser = {
        id: data._id,
        avatar: data.avatar,
        mobile: data.mobile,
      };

      // set user profile data on state
      const userProfile = {
        fullname: data.fullname,
        address: data.address,
        province: data.province,
        city: data.city,
        avatar: data.avatar,
      };
      this.setUserProfile(userProfile);
    },
    uploadAvatar(e: any): void {
      const file = e.target.files[0];
      if (file) {
        const fileReader = new FileReader();
        // update avatar in state and place on image placeholder
        fileReader.onload = (event) => {
          store.dispatch("admin/setUserAvatar", event?.target?.result);
        };
        fileReader.readAsDataURL(file);

        // send image
        let formData = new FormData();
        formData.append("image", file);
        store.dispatch("admin/editUserAvatar", {
          formData,
          id: this.selectedUser.id,
        });
      }
    },
    removeAvatar(): void {
      store.dispatch("admin/removeUserAvatar");
    },
    setUserProfile(data: any) {
      store.dispatch("admin/setUserProfile", data);
    },
    chargeUserWallet() {
      store.dispatch("admin/chargingTheUserWallet", this.userId);

      // close modal
      this.dialog = false;
    },
    editUserProfile() {
      store.dispatch("admin/editUserProfile", this.selectedUser.id);

      // close modal
      this.editDialog = false;
    },
    separateDigits,
    convertToPersian,
  },
  created(): void {
    // call get users list action if they're not exist (request)
    if (!store.state.admin.usersList.length) {
      // start page loading
      store.state.app.pageLoading = true;

      // get users list
      setTimeout(function () {
        store.dispatch("admin/getUsersList");
      }, 2000);
    }
  },
});
</script>

<style lang="scss" scoped>
.pointer {
  cursor: pointer;
}
.upload-avatar {
  position: relative;
}
input[type="file"] {
  width: 0;
  height: 0;
  opacity: 0;
  position: absolute;
}
</style>
