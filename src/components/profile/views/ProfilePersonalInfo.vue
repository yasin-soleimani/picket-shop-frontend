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
        مشخصات کاربری
      </h4>
    </div>

    <v-divider
      width="100%"
      class="grey mx-auto my-4"
      :class="[`${$vuetify.theme.dark ? 'darken-1' : 'lighten-3'}`]"
    ></v-divider>

    <div
      style="gap: 1.4rem"
      class="full-w d-flex flex-column align-start justify-start mx-auto"
    >
      <!-- avatar -->
      <div style="gap: 1rem" class="full-w d-flex align-center justify-start">
        <!-- image -->
        <v-img
          :src="
            $store.state.panel.user.avatar !== ''
              ? $store.state.panel.user.avatar
              : defaultAvatar
          "
          width="50"
          max-width="50"
          class="rounded-circle"
          alt="user default"
        />

        <div class="d-flex align-center justify-center" style="gap: 0.4rem">
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
              <input type="file" accept="image/png, image/jpeg, image/jpg" />
            </label>
          </v-btn>

          <!-- remove -->
          <v-btn
            text
            small
            class="ma-0"
            color="secondary"
            @click="removeAvatar"
            v-if="$store.state.panel.user.avatar !== ''"
            >حذف تصویر</v-btn
          >
        </div>
      </div>

      <!-- info -->
      <div class="full-w d-flex flex-column align-start justify-start">
        <!-- name & mobile -->
        <div class="full-w d-flex align-center justify-start" style="gap: 1rem">
          <!-- fullname -->
          <v-text-field
            width="20"
            type="text"
            label="نام"
            v-model="$v.fullname.$model"
            :error-messages="fullnameError"
            color="secondary"
            class="text-subtitle-2"
            outlined
          ></v-text-field>

          <!-- mobile number -->
          <v-text-field
            outlined
            disabled
            type="number"
            label="شماره موبایل"
            color="secondary"
            v-model="$store.state.panel.user.mobile"
            class="text-subtitle-2"
          ></v-text-field>
        </div>

        <!-- address -->
        <div style="gap: 1rem" class="full-w">
          <v-textarea
            label="آدرس"
            rows="1"
            color="secondary"
            v-model="$v.address.$model"
            :error-messages="addressError"
            class="text-subtitle-2"
            auto-grow
            outlined
          ></v-textarea>
        </div>

        <!-- provinces & cities -->
        <div class="full-w d-flex align-center justify-start" style="gap: 1rem">
          <!-- provinces -->
          <v-select
            color="secondary"
            class="text-subtitle-2"
            label="استان"
            :items="provinces()"
            v-model="$v.province.$model"
            outlined
          ></v-select>

          <!-- cities -->
          <v-select
            color="secondary"
            class="text-subtitle-2"
            label="شهر"
            :items="cities($store.state.panel.user.province)"
            v-model="$v.city.$model"
            :disabled="$store.state.panel.user.province === ''"
            outlined
          ></v-select>
        </div>

        <!-- save changes button -->
        <v-btn
          width="220"
          height="46"
          type="submit"
          :color="`${$vuetify.theme.dark ? 'secondary' : 'primary'}`"
          :loading="isLoading"
          :disabled="$v.$invalid"
          class="font-weight-light"
          @click.prevent="updateProfile"
        >
          ذخیره تغییرات
        </v-btn>
      </div>
    </div>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
import store from "@/store";
import { provinces, cities } from "@/utils/geography";
import { validationMixin } from "vuelidate";
import { required, minLength } from "vuelidate/lib/validators";

export default Vue.extend({
  name: "ProfilePersonalInfo",
  mixins: [validationMixin],
  data() {
    return {
      defaultAvatar: require("@/assets/img/default-user.png"),
    };
  },
  methods: {
    provinces,
    cities,
    updateProfile(): void {
      store.dispatch("panel/updateProfile");
    },
    uploadAvatar(e: any): void {
      const file = e.target.files[0];
      if (file) {
        const fileReader = new FileReader();

        // update avatar in state and place on image placeholder
        fileReader.onload = (event) => {
          store.dispatch("panel/updateAvatar", event?.target?.result);
        };
        fileReader.readAsDataURL(file);

        // send choosed file
        let formData = new FormData();
        formData.append("image", file);
        store.dispatch("panel/uploadAvatar", formData);
      }
    },
    removeAvatar(): void {
      store.dispatch("panel/removeAvatar");
    },
  },
  computed: {
    // fullname
    fullname: {
      get(): string {
        return store.state.panel.user?.fullname || "";
      },
      set(value: string): void {
        store.dispatch("panel/updateFullName", value);
      },
    },
    fullnameError(): string[] {
      const errors: string[] = [];
      if (!this.$v.fullname?.$dirty) {
        return errors;
      }
      !this.$v.fullname.required && errors.push("تکمیل این فیلد الزامی است");
      return errors;
    },
    // address
    address: {
      get(): string {
        return store.state.panel.user?.address || "";
      },
      set(value: string): void {
        store.dispatch("panel/updateAddress", value);
      },
    },
    addressError(): string[] {
      const errors: string[] = [];
      if (!this.$v.address?.$dirty) {
        return errors;
      }
      !this.$v.address.minLength &&
        errors.push("آدرس باید دارای حداقل 10 حرف باشد");
      return errors;
    },
    // province
    province: {
      get(): string {
        return store.state.panel.user?.province || "";
      },
      set(value: string): void {
        store.dispatch("panel/updateProvince", value);
      },
    },
    // city
    city: {
      get(): string {
        return store.state.panel.user?.city || "";
      },
      set(value: string): void {
        store.dispatch("panel/updateCity", value);
      },
    },
    // loading status
    isLoading(): boolean {
      return store.state.app.loading;
    },
  },
  validations: {
    fullname: {
      required,
    },
    address: {
      minLength: minLength(10),
    },
    province: {
      required,
    },
    city: {
      required,
    },
  },
});
</script>

<style lang="scss" scoped>
p {
  margin: 0;
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
