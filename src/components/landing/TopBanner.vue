<template>
  <div>
    <v-carousel
      cycles
      eager
      :show-arrows="false"
      hide-delimiter-background
      interval="3000"
      height="auto"
      :class="[`${$vuetify.breakpoint.mobile ? 'rounded-lg' : 'rounded-xl'}`]"
    >
      <v-carousel-item to="/sport/sport-stuff">
        <v-img :src="require('../../assets/img/banner/dumbbells.jpg')" />
      </v-carousel-item>

      <v-carousel-item to="/health-and-beauty/health">
        <v-img :src="require('../../assets/img/banner/skin-care.jpg')" />
      </v-carousel-item>

      <v-carousel-item to="/clothes/shoes">
        <v-img :src="require('../../assets/img/banner/sneaker.jpg')" />
      </v-carousel-item>
    </v-carousel>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend();
</script>

<style lang="scss" scoped>
@import "@/scss/core/variables";
::v-deep .v-carousel__controls {
  height: auto !important;
  .v-carousel__controls__item {
    margin: 3px;
  }
}
::v-deep .v-carousel__controls__item.v-btn.v-btn--icon {
  background-color: #ffffff34;
  height: 8px;
  width: 8px;
  border-radius: 50%;
  transition: all 0.2s ease-in-out;
}
::v-deep .v-carousel__controls__item.v-btn.v-btn--icon.v-btn--active {
  background-color: #ffffff7a;
}
::v-deep .v-carousel__controls__item.v-btn.v-btn--icon:hover {
  background-color: #ffffff81;
}
::v-deep .v-btn__content .v-icon {
  display: none;
}
</style>
