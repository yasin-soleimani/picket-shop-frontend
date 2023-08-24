<template>
  <div>
    <!-- name -->
    <v-text-field
      color="secondary"
      autofocus
      outlined
      label="نام"
      class="register-text-field rounded-lg text-subtitle-2"
      v-model="$v.fullname.$model"
      :error-messages="fullnameError"
    >
    </v-text-field>

    <!-- mobile number -->
    <v-text-field
      color="secondary"
      outlined
      label="شماره موبایل"
      class="register-text-field rounded-lg text-subtitle-2"
      type="number"
      hint="نمونه: 09123456789"
      v-model="$v.mobile.$model"
      :error-messages="mobileError"
      oninput="this.value=this.value.slice(0,this.dataset.maxlength)"
      data-maxlength="11"
      counter="11"
    >
    </v-text-field>

    <div class="d-flex justify-between" style="gap: 1rem">
      <!-- password -->
      <v-text-field
        color="secondary"
        outlined
        label="رمز عبور"
        class="register-text-field rounded-lg text-subtitle-2"
        :type="isPasswordVisible ? 'text' : 'password'"
        v-model.trim="$v.password.$model"
        :error-messages="passwordError"
      >
        <template #append>
          <v-icon @click="isPasswordVisible = !isPasswordVisible">
            {{ isPasswordVisible ? "mdi-eye-off" : "mdi-eye" }}
          </v-icon>
        </template>
      </v-text-field>

      <!-- password confirm -->
      <v-text-field
        color="secondary"
        outlined
        label="تکرار رمز عبور"
        class="register-text-field rounded-lg text-subtitle-2"
        :type="isConfirmPasswordVisible ? 'text' : 'password'"
        v-model.trim="passwordConfirm"
        :error-messages="passwordConfirmError"
      >
        <template #append>
          <v-icon @click="isConfirmPasswordVisible = !isConfirmPasswordVisible">
            {{ isConfirmPasswordVisible ? "mdi-eye-off" : "mdi-eye" }}
          </v-icon>
        </template>
      </v-text-field>
    </div>

    <p class="text-subtitle-2">
      حساب کاربری دارید؟
      <router-link :to="{ name: 'login' }" class="secondary--text"
        >وارد شوید</router-link
      >
    </p>

    <!-- submit button -->
    <v-btn
      type="submit"
      block
      variant="flat"
      :loading="isLoading"
      class="py-7 rounded-lg"
      :color="`${$vuetify.theme.dark ? 'secondary' : 'primary'}`"
      :disabled="!isFormValid"
      @click.prevent="userRegister"
      >ثبت نام</v-btn
    >
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { validationMixin } from "vuelidate";
import { required, minLength, maxLength } from "vuelidate/lib/validators";
import store from "@/store";

export default Vue.extend({
  name: "registerForm",
  mixins: [validationMixin],
  data() {
    return {
      isPasswordVisible: false,
      isConfirmPasswordVisible: false,
      passwordConfirm: "",
    };
  },
  computed: {
    // name validation/errors
    fullname: {
      get(): string {
        return store.state.auth.registerData.fullname;
      },
      set(value: string): void {
        store.dispatch("auth/updateFullNameRegister", value);
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
    // mobile number validation/errors
    mobile: {
      get(): string {
        return store.state.auth.registerData.mobile;
      },
      set(value: string): void {
        store.dispatch("auth/updateMobileRegister", value);
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
        return store.state.auth.registerData.password;
      },
      set(value: string): void {
        store.dispatch("auth/updatePasswordRegister", value);
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
    // password confirmation validation/errors
    passwordConfirmError(): string[] {
      const errors: string[] = [];

      this.passwordConfirm !== this.password &&
        this.passwordConfirm.length &&
        errors.push("تکرار گذرواژه صحیح نیست");

      return errors;
    },
    // form validation
    isFormValid(): boolean {
      // when all fields get valid, form will be valid too
      return !this.$v.$invalid && this.passwordConfirm === this.password;
    },
    // loading
    isLoading(): boolean {
      return store.state.app.loading;
    },
  },
  methods: {
    userRegister() {
      store.dispatch("auth/userRegister");
    },
  },
  validations: {
    fullname: {
      required,
    },
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
