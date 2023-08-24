<template>
  <AuthLayout title="ثبت‌نام در" button-text="ثبت نام">
    <template #fields>
      <RegisterForm></RegisterForm>
    </template>
  </AuthLayout>
</template>

<script lang="ts">
import Vue from "vue";
import AuthLayout from "@/layout/AuthLayout.vue";
import RegisterForm from "../components/RegisterForm.vue";

export default Vue.extend({
  name: "registerFormContainer",
  components: { AuthLayout, RegisterForm },
});
</script>
