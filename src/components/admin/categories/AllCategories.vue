<template>
  <router-view v-if="$route.name !== 'admin-all-categories'"></router-view>
  <AppLoading v-else-if="$store.state.app.pageLoading"></AppLoading>
  <v-container v-else>
    <!-- previous link -->
    <div class="full-w d-flex align-center justify-end">
      <v-btn
        to="/admin"
        :color="`${$vuetify.theme.dark ? 'secondary' : 'primary'}`"
        text
      >
        بازگشت
        <v-icon right>mdi-arrow-left</v-icon>
      </v-btn>
    </div>

    <!-- main -->
    <div class="full-w d-flex flex-column align-start" style="gap: 1.6rem">
      <div class="d-flex align-center start" style="gap: 0.8rem">
        <h3>دسته‌بندی های اصلی</h3>

        <v-btn
          :to="'/admin/categories/add'"
          :color="`${$vuetify.theme.dark ? 'secondary' : 'primary'}`"
          outlined
        >
          <v-icon>mdi-plus</v-icon>
          <span>افزودن</span>
        </v-btn>
      </div>
      <div
        class="d-flex align-center justify-start"
        style="gap: 1rem; flex-wrap: wrap"
      >
        <v-card
          v-for="category in categories"
          outlined
          class="px-4 py-1 d-flex align-center jsutify-start rounded-lg"
          style="gap: 0.2rem"
          :key="category['_id']"
        >
          <!-- title -->
          <p class="text-subtitle-2">{{ category.title }}</p>
          <!-- options -->
          <div class="d-flex align-start">
            <!-- edit -->
            <v-btn icon title="ویرایش" @click="editCategory(category['_id'])">
              <v-icon>mdi-square-edit-outline</v-icon>
            </v-btn>
          </div>
        </v-card>
      </div>
    </div>
    <!-- sub -->
    <div
      class="mt-10 full-w d-flex flex-column align-start"
      style="gap: 1.6rem"
    >
      <div class="d-flex align-center start" style="gap: 0.8rem">
        <h3>زیر دسته‌بندی ها</h3>

        <v-btn
          :to="'/admin/categories/add?child=true'"
          :color="`${$vuetify.theme.dark ? 'secondary' : 'primary'}`"
          outlined
        >
          <v-icon>mdi-plus</v-icon>
          <span>افزودن</span>
        </v-btn>
      </div>
      <div
        class="d-flex align-center justify-start"
        style="gap: 1rem; flex-wrap: wrap"
      >
        <v-card
          v-for="category in subCategories"
          outlined
          class="px-4 py-1 d-flex align-center jsutify-start rounded-lg"
          style="gap: 0.2rem"
          :key="category['_id']"
        >
          <!-- title -->
          <p class="text-subtitle-2">{{ category.title }}</p>
          <!-- options -->
          <div class="d-flex align-start">
            <!-- edit -->
            <v-btn icon title="ویرایش" @click="editCategory(category['_id'])">
              <v-icon>mdi-square-edit-outline</v-icon>
            </v-btn>
          </div>
        </v-card>
      </div>
    </div>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import store from "@/store";
import router from "@/router";
import AppLoading from "@/components/UI/AppLoading.vue";

export default Vue.extend({
  name: "AdminAllCategories",
  components: { AppLoading },
  computed: {
    categories(): any[] {
      const categories = store.state.panel.categories;
      return categories.filter((category: any) => category.parent === null);
    },
    subCategories(): any[] {
      const categories = store.state.panel.categories;
      return categories.filter((category: any) => category.parent !== null);
    },
  },
  methods: {
    editCategory(id: string): void {
      router.push({ name: "admin-edit-category", query: { id: id } });
    },
  },
});
</script>

<style lang="css" scoped>
p {
  margin: 0;
  padding: 0;
}
</style>
