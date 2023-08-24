<template>
  <AuthLayout title="ورود به" button-text="ورود">
    <template #fields>
      <LoginForm></LoginForm>
    </template>
  </AuthLayout>
</template>

<script lang="ts">
import Vue from "vue";
import AuthLayout from "@/layout/AuthLayout.vue";
import LoginForm from "../components/LoginForm.vue";

export default Vue.extend({
  name: "loginFormContainer",
  components: {
    AuthLayout,
    LoginForm,
  },
});
</script>
