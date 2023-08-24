<template>
  <v-card
    :class="[`${$vuetify.theme.dark ? '' : 'grey lighten-5'}`]"
    class="
      pa-2
      rounded-lg
      overflow-hidden
      d-flex
      flex-column
      align-center
      justify-start
    "
    style="gap: 0.2rem; height: fit-content"
  >
    <!-- profile summary-->
    <div
      style="width: 100%; gap: 0.6rem"
      class="py-2 d-flex align-center justify-start"
    >
      <!-- avatar -->
      <v-img
        width="40"
        style="max-width: 36px !important"
        class="rounded-circle"
        :src="
          $store.state.panel.user.avatar !== ''
            ? $store.state.panel.user.avatar
            : defaultAvatar
        "
        alt="user"
      ></v-img>

      <!-- fullname -->
      <h4
        class="grey--text font-weight-bold"
        :class="[
          `${$vuetify.theme.dark ? 'text--lighten-1' : 'text--darken-2'}`,
        ]"
      >
        {{ $store.state.panel.user.fullname || "" }}
      </h4>
    </div>

    <v-divider
      width="96%"
      class="grey"
      :class="[`${$vuetify.theme.dark ? 'darken-1' : 'lighten-3'}`]"
    ></v-divider>

    <!-- user info -->
    <ProfileMenuBtn to="/profile/personal-info">مشخصات کاربری</ProfileMenuBtn>

    <!-- cart -->
    <ProfileMenuBtn to="/profile/cart">سبد خرید</ProfileMenuBtn>

    <!-- wallet -->
    <ProfileMenuBtn to="/profile/wallet">کیف پول</ProfileMenuBtn>

    <!-- purchases -->
    <ProfileMenuBtn to="/profile/purchases">سفارشات</ProfileMenuBtn>

    <!-- theme setting -->
    <ProfileMenuBtn :icon="themeIcon" @click="toggleSwitchThemeModal"
      >تنظیمات قالب</ProfileMenuBtn
    >

    <!-- log out -->
    <ProfileMenuBtn icon="logout" @click="logout"
      >خروج از حساب کاربری</ProfileMenuBtn
    >

    <!-- switch theme modal -->
    <v-fade-transition>
      <AppModal v-if="switchThemeModal" @close="toggleSwitchThemeModal">
        <template #title>تنظیمات قالب</template>

        <template>
          <div
            class="py-4 full-w d-flex flex-column align-start"
            style="gap: 0.2rem"
          >
            <p class="text-subtitle-2">انتخاب رنگ قالب</p>
            <v-select
              dense
              outlined
              v-model="themeMode"
              color="secondary"
              class="full-w"
              :items="themeSelectItems"
            ></v-select>
          </div>
        </template>

        <template #buttons>
          <AppModalBtn @click="switchTheme">ذخیره</AppModalBtn>
          <AppModalBtn variant="outlined" @click="toggleSwitchThemeModal"
            >انصراف</AppModalBtn
          >
        </template>
      </AppModal>
    </v-fade-transition>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
import ProfileMenuBtn from "./ProfileMenuBtn.vue";
import AppModal from "../UI/AppModal.vue";
import AppModalBtn from "../UI/AppModalBtn.vue";
import store from "@/store";
import LINK from "@/utils/link";

export default Vue.extend({
  name: "ProfileMenu",
  components: {
    ProfileMenuBtn,
    AppModal,
    AppModalBtn,
  },
  data() {
    return {
      LINK: LINK,
      themeMode: "",
      switchThemeModal: false,
      defaultAvatar: require("@/assets/img/default-user.png"),
      themeSelectItems: [
        {
          text: "روشن",
          value: "light",
        },
        {
          text: "تیره",
          value: "dark",
        },
      ],
    };
  },
  methods: {
    toggleSwitchThemeModal(): void {
      this.switchThemeModal = !this.switchThemeModal;
    },
    switchTheme(): void {
      store.dispatch("app/switchTheme", {
        theme: this.themeMode,
        component: this,
      });
      this.toggleSwitchThemeModal();
    },
    logout(): void {
      store.dispatch("auth/userLogout");
    },
  },
  computed: {
    themeIcon(): string {
      return store.state.app.theme === "light"
        ? "weather-sunny"
        : "weather-night";
    },
  },
  mounted() {
    this.themeMode = store.state.app.theme;
  },
});
</script>

<style land="scss" scoped>
p {
  margin: 0;
}
</style>
