<template>
  <v-container
    style="min-height: 56vh; gap: 1rem"
    class="py-4 d-flex flex-column justify-center background"
  >
    <!-- users -->
    <h3>کاربران</h3>
    <v-row dense>
      <v-col cols="6" md="3">
        <v-btn
          to="/admin/users"
          outlined
          width="100%"
          height="60"
          color="primary"
          >مشاهده لیست همه کاربران</v-btn
        >
      </v-col>
      <v-col cols="6" md="3">
        <v-btn
          to="/admin/admins"
          outlined
          width="100%"
          height="60"
          color="primary"
          >مشاهده لیست همه ادمین‌ها</v-btn
        >
      </v-col>
      <v-col cols="6" md="3">
        <v-btn
          to="/admin/transactions"
          outlined
          width="100%"
          height="60"
          color="primary"
          >مشاهده لیست تراکنش های فروشگاه</v-btn
        >
      </v-col>
      <v-col cols="6" md="3">
        <v-btn
          to="/admin/invoices"
          outlined
          width="100%"
          height="60"
          color="primary"
          >مشاهده لیست سفارشات فروشگاه</v-btn
        >
      </v-col>
    </v-row>

    <!-- products -->
    <h3>محصولات</h3>
    <v-row dense>
      <v-col cols="6" md="3">
        <v-btn
          to="/admin/products"
          outlined
          width="100%"
          height="60"
          color="primary"
          >مشاهده همه محصولات</v-btn
        >
      </v-col>
      <v-col cols="6" md="3">
        <v-btn
          to="/admin/products/add"
          outlined
          width="100%"
          height="60"
          color="primary"
          >افزودن محصول جدید</v-btn
        >
      </v-col>
      <v-col cols="6" md="3">
        <v-btn
          to="/admin/products/edit"
          outlined
          width="100%"
          height="60"
          color="primary"
          >ویرایش محصول</v-btn
        >
      </v-col>
      <v-col cols="6" md="3">
        <v-btn
          to="/admin/products/delete"
          outlined
          width="100%"
          height="60"
          color="primary"
          >حذف محصول</v-btn
        >
      </v-col>
    </v-row>

    <!-- categories -->
    <h3>دسته‌بندی ها</h3>
    <v-row dense>
      <v-col cols="6" md="3">
        <v-btn
          to="/admin/categories"
          outlined
          width="100%"
          height="60"
          color="primary"
          >مشاهده همه دسته‌بندی ها</v-btn
        >
      </v-col>
      <v-col cols="6" md="3">
        <v-btn
          to="/admin/categories/add"
          outlined
          width="100%"
          height="60"
          color="primary"
          >افزودن دسته‌بندی جدید</v-btn
        >
      </v-col>
      <v-col cols="6" md="3">
        <v-btn
          to="/admin/categories"
          outlined
          width="100%"
          height="60"
          color="primary"
          >ویرایش دسته‌بندی</v-btn
        >
      </v-col>
      <v-col cols="6" md="3">
        <v-btn
          to="/admin/categories"
          outlined
          width="100%"
          height="60"
          color="primary"
          >حذف دسته‌بندی</v-btn
        >
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "AmdinActions",
});
</script>
