<template>
  <!-- if user isn't logged in -->
  <v-btn
    v-if="!$store.state.panel.user"
    to="/login"
    :icon="$vuetify.breakpoint.mobile"
    color="primary"
    text
  >
    <span v-if="!$vuetify.breakpoint.mobile">ورود / ثبت‌نام</span>
    <v-icon class="mr-1">mdi-login</v-icon>
  </v-btn>

  <!-- if user is logged in -->
  <v-menu v-else bottom right nudge-bottom="40">
    <template v-slot:activator="{ on, attrs }">
      <v-btn icon v-bind="attrs" v-on="on" color="primary">
        <v-icon> mdi-account </v-icon>
      </v-btn>
    </template>

    <v-list class="pa-2 rounded-lg overflow-hidden" twolines>
      <!-- panel -->
      <v-list-item
        v-if="$store.state.panel.user.role === 'admin'"
        class="px-2 rounded overflow-hidden"
        to="/admin"
        dense
        active-class="active-item"
      >
        <v-icon small color="primary lighten-4 " dark> mdi-account</v-icon>
        <v-list-item-content>
          <v-list-item-title
            class="scores text-caption primary--text mr-1"
            v-text="'پنل مدیریت'"
          ></v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <!-- wallet -->
      <v-list-item
        class="px-2 rounded overflow-hidden"
        to="/profile/wallet"
        dense
        active-class="active-item"
      >
        <v-icon small color="primary lighten-4 " dark> mdi-wallet</v-icon>
        <v-list-item-content>
          <v-list-item-title
            class="scores text-caption primary--text mr-1"
            v-text="'کیف پول'"
          ></v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <!-- scores -->
      <v-list-item
        class="px-2 rounded overflow-hidden"
        to="/profile/scores"
        dense
        active-class="active-item"
      >
        <v-icon small color="primary lighten-4 " dark> mdi-star </v-icon>
        <v-list-item-content>
          <v-list-item-title
            class="scores text-caption primary--text mr-1"
            v-text="'امتیاز ها'"
          ></v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <!-- cart -->
      <v-list-item
        style="position: relative"
        class="px-2 rounded overflow-hidden"
        to="/profile/cart"
        dense
        active-class="active-item"
      >
        <!-- cart items -->
        <span class="cart-length" v-if="cartLength">{{ cartLength }}</span>

        <v-icon small color="primary lighten-4 " dark> mdi-cart</v-icon>
        <v-list-item-content>
          <v-list-item-title
            class="scores text-caption primary--text mr-1"
            v-text="'سبد خرید'"
          ></v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <!-- edit -->
      <v-list-item
        class="px-2 rounded overflow-hidden"
        to="/profile/personal-info"
        dense
        active-class="active-item"
      >
        <v-icon small color="primary lighten-4 " dark> mdi-pencil</v-icon>
        <v-list-item-content>
          <v-list-item-title
            class="scores text-caption primary--text mr-1"
            v-text="'ویرایش مشخصات'"
          ></v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider class="my-1"></v-divider>

      <!-- logout -->
      <v-list-item class="px-2 rounded overflow-hidden" dense @click="logout">
        <v-icon small color="primary lighten-4 " dark> mdi-logout</v-icon>
        <v-list-item-content>
          <v-list-item-title
            class="scores text-caption primary--text mr-1"
            v-text="'خروج از حساب کاربری'"
          ></v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script lang="ts">
import Vue from "vue";
import store from "@/store";
import { convertToPersian } from "@/utils/string";

export default Vue.extend({
  name: "PanelMenu",
  methods: {
    convertToPersian,
    logout(): void {
      store.dispatch("auth/userLogout");
    },
  },
  computed: {
    cartLength(): number {
      return store.state.panel.cart.length;
    },
  },
});
</script>

<style lang="scss" scoped>
@import "../scss/core/variables";

* {
  padding: 0;
  margin: 0;
}
.active-item {
  background-color: #dadada1d !important;
}
.cart-length {
  position: absolute;
  top: 12px;
  left: 8px;
  width: 16px;
  height: 16px;
  color: white;
  font-size: 9px;
  border-radius: 50%;
  background-color: $primary;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
