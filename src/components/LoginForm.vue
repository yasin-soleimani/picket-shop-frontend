<template>
  <div style="width: 100%">
    <!-- number -->
    <v-text-field
      color="secondary"
      outlined
      label="شماره موبایل"
      class="register-text-field rounded-lg subtitle-2"
      type="number"
      hint="نمونه: 09123456789"
      v-model="$v.mobile.$model"
      :error-messages="mobileError"
      oninput="this.value=this.value.slice(0,this.dataset.maxlength)"
      data-maxlength="11"
      counter="11"
    >
    </v-text-field>

    <!-- password -->
    <v-text-field
      color="secondary"
      outlined
      label="رمز عبور"
      class="register-text-field rounded-lg subtitle-2"
      :type="isPasswordVisible ? 'text' : 'password'"
      v-model="$v.password.$model"
      :error-messages="passwordError"
    >
      <template #append>
        <v-icon @click="isPasswordVisible = !isPasswordVisible">
          {{ isPasswordVisible ? "mdi-eye-off" : "mdi-eye" }}
        </v-icon>
      </template>
    </v-text-field>

    <!-- forget password -->
    <p class="text-subtitle-2">
      حساب کاربری ندارید؟
      <router-link :to="{ name: 'register' }" class="secondary--text"
        >ثبت‌نام کنید</router-link
      >
    </p>

    <!-- submit button -->
    <v-btn
      type="submit"
      block
      variant="flat"
      class="py-7 rounded-lg"
      :color="`${$vuetify.theme.dark ? 'secondary' : 'primary'}`"
      :loading="isLoading"
      :disabled="$v.$invalid"
      @click.prevent="userLogin"
      >ورود</v-btn
    >
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { validationMixin } from "vuelidate";
import { required, minLength, maxLength } from "vuelidate/lib/validators";
import store from "@/store";

export default Vue.extend({
  name: "loginForm",
  mixins: [validationMixin],
  data() {
    return {
      isPasswordVisible: false,
    };
  },
  computed: {
    // mobile number validation/errors
    mobile: {
      get(): string {
        return store.state.auth.loginData.mobile;
      },
      set(value: string): void {
        store.dispatch("auth/updateMobileLogin", value);
      },
    },
    mobileError(): string[] {
      const errors: string[] = [];
      if (!this.$v.mobile?.$dirty) {
        return errors;
      }
      !this.$v.mobile.required && errors.push("تکمیل این فیلد الزامی است");
      !this.$v.mobile.minLength &&
        errors.push("شماره موبایل باید دارای حداقل 11 رقم باشد");
      !this.$v.mobile.maxLength &&
        errors.push("شماره موبایل باید دارای حداکثر 11 رقم باشد");
      return errors;
    },
    // password validation/errors
    password: {
      get(): string {
        return store.state.auth.loginData.password;
      },
      set(value: string): void {
        store.dispatch("auth/updatePasswordLogin", value);
      },
    },
    passwordError(): string[] {
      const errors: string[] = [];
      if (!this.$v.password?.$dirty) {
        return errors;
      }
      !this.$v.password.required && errors.push("تکمیل این فیلد الزامی است");
      !this.$v.password.minLength &&
        errors.push("پسورد باید شامل حداقل 8 کاراکتر باشد");
      return errors;
    },
    // loading
    isLoading(): boolean {
      return store.state.app.loading;
    },
  },
  methods: {
    userLogin() {
      store.dispatch("auth/userLogin");
    },
  },
  validations: {
    mobile: {
      required,
      minLength: minLength(11),
      maxLength: maxLength(11),
    },
    password: {
      required,
      minLength: minLength(8),
    },
  },
});
</script>

<style lang="scss" scoped>
.register-text-field {
  min-width: 100%;
  width: 350px;
}
</style>
