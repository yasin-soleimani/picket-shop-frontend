<template>
  <footer class="footer footer-bg py-8">
    <v-row class="mx-auto" style="width: 86%">
      <!-- categories -->
      <v-col cols="6" md="4" lg="3">
        <h4 class="text-subtitle-1 grey--text text--darken-1">دسته‌بندی ها</h4>
        <div
          class="mt-2 d-flex flex-column align-start justify-start"
          style="gap: 4px"
        >
          <router-link to="/digital-devices" class="text-decoration-none"
            ><span class="footer-link text-caption grey--text">
              کالای دیجیتال</span
            ></router-link
          >
          <router-link to="/home-and-kitchen" class="text-decoration-none"
            ><span class="footer-link text-caption grey--text">
              کالای خانه و آشپزخانه</span
            ></router-link
          >
          <router-link to="/health-and-beauty" class="text-decoration-none"
            ><span class="footer-link text-caption grey--text">
              سلامت و زیبایی</span
            ></router-link
          >
          <router-link to="/sport" class="text-decoration-none"
            ><span class="footer-link text-caption grey--text">
              ورزش و سرگرمی</span
            ></router-link
          >
          <router-link to="/grocery" class="text-decoration-none"
            ><span class="footer-link text-caption grey--text">
              مواد غذایی</span
            ></router-link
          >
          <router-link to="/clothes" class="text-decoration-none"
            ><span class="footer-link text-caption grey--text">
              پوشاک</span
            ></router-link
          >
        </div>
      </v-col>

      <!-- quick access -->
      <v-col cols="6" md="4" lg="3">
        <h4 class="text-subtitle-1 grey--text text--darken-1">دسترسی سریع</h4>
        <div
          class="mt-2 d-flex flex-column align-start justify-start"
          style="gap: 4px"
        >
          <router-link to="/categories" class="text-decoration-none"
            ><span class="footer-link text-caption grey--text">
              دسته‌بندی ها</span
            ></router-link
          >
          <router-link to="/newset-products" class="text-decoration-none"
            ><span class="footer-link text-caption grey--text">
              جدیدترین محصولات</span
            ></router-link
          >
          <router-link to="/special-products" class="text-decoration-none"
            ><span class="footer-link text-caption grey--text">
              محصولات منتخب</span
            ></router-link
          >
          <router-link to="/profile" class="text-decoration-none"
            ><span class="footer-link text-caption grey--text">
              حساب کاربری</span
            ></router-link
          >
          <router-link to="/most-sale-products" class="text-decoration-none"
            ><span class="footer-link text-caption grey--text">
              تخفیفات ویژه</span
            ></router-link
          >
        </div>
      </v-col>

      <!-- brands -->
      <v-col cols="8" md="4" lg="3">
        <h4 class="text-subtitle-1 grey--text text--darken-1">برندهای همکار</h4>
        <v-row dense align="center" justify="start" style="max-width: 50%">
          <v-col cols="6">
            <v-img
              width="80px"
              class="brand-img"
              src="@/assets/img/logo/snapp-express.png"
            />
          </v-col>
          <v-col cols="6">
            <v-img
              width="80px"
              class="brand-img"
              src="@/assets/img/logo/snapp-box.png"
            />
          </v-col>
          <v-col cols="6">
            <v-img
              width="80px"
              class="brand-img"
              src="@/assets/img/logo/snapp-pay.png"
            />
          </v-col>
          <v-col cols="6">
            <v-img
              width="80px"
              class="brand-img"
              src="@/assets/img/logo/digi-pay.svg"
            />
          </v-col>
        </v-row>
      </v-col>

      <!-- about -->
      <v-col cols="12" md="12" lg="3">
        <h4 class="text-subtitle-1 grey--text text--darken-1">درباره ما</h4>
        <p class="text-caption grey--text">
          لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده
          از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و
          سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای
          متنوع با هدف بهبود ابزارهای کاربردی می باشد.
        </p>
        <!-- namad ha -->
        <v-row style="width: 260px">
          <v-col cols="4">
            <v-img width="60" src="../../assets/img/namad/etemad.png" />
          </v-col>
          <v-col cols="4">
            <v-img width="60" src="../../assets/img/namad/samandehi.png" />
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </footer>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "AppFooter",
});
</script>

<style lang="scss" scoped>
@import "../../scss/core/variables";
.footer-link {
  transition: all 0.2s ease-in-out;
  &:hover {
    color: $secondary !important;
  }
}
.brand-img {
  filter: grayscale(1);
}
</style>
