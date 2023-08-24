99
<template>
  <nav class="d-flex align-center" style="gap: 1.2rem">
    <!-- category (dropdown) -->
    <v-menu
      open-on-hover
      offset-y
      :nudge-right="!$store.state.panel.categories.length ? 200 : 400"
      left
      transition="slide-y-transition"
      rounded="lg"
    >
      <template v-slot:activator="{ on, attrs }">
        <p
          v-bind="attrs"
          v-on="on"
          class="grey--text text--darken-1 text-caption pa-0 ma-0 py-1"
        >
          دسته‌بندی ها
          <v-icon color="grey darken-1" small>mdi-chevron-down</v-icon>
        </p>
      </template>

      <v-card
        class="categories-container categories-container-bg px-8 py-4 d-flex"
        style="gap: 1.6rem"
      >
        <!-- empty -->
        <p
          class="px-6 py-4 text-caption grey--text"
          v-if="!$store.state.panel.categories.length"
        >
          در حال حاضر هیچ دسته‌بندی وجود ندارد
        </p>

        <!-- categories -->
        <v-list
          v-for="(category, i) in parentCategories"
          :key="i"
          class="category"
        >
          <router-link :to="category.parentPath">
            <span class="category-subheader primary--text text-body-1">{{
              category.title
            }}</span>
          </router-link>
          <!-- subcategories -->
          <div class="d-flex flex-column mt-3" style="gap: 6px">
            <router-link
              v-for="(subCategory, j) in subCategories(category['_id'])"
              :key="j"
              :to="subCategory.parentPath"
            >
              <span
                class="
                  subcategory
                  text-caption
                  mr-2
                  primary--text
                  text--lighten-2
                "
              >
                {{ subCategory.title }}
              </span>
            </router-link>
          </div>
        </v-list>
      </v-card>
    </v-menu>

    <!-- most selling -->
    <router-link to="/" class="text-decoration-none">
      <span class="grey--text text--darken-1 text-caption pa-0 ma-0 py-1">
        تخفیفات ویژه
      </span>
    </router-link>

    <!-- about us -->
    <router-link to="/" class="text-decoration-none">
      <span class="grey--text text--darken-1 text-caption pa-0 ma-0 py-1">
        درباره‌ی ما
      </span>
    </router-link>
  </nav>
</template>

<script lang="ts">
import Vue from "vue";
import store from "@/store";

export default Vue.extend({
  name: "AppNavbar",
  computed: {
    parentCategories(): any[] {
      return store.state.panel.categories.filter((c: any) => !c.parent);
    },
  },
  methods: {
    subCategories(id: string): any[] {
      return store.state.panel.categories.filter((c: any) => c.parent === id);
    },
  },
});
</script>

<style lang="scss" scoped>
@import "../scss/core/variables";
nav {
  height: 100% !important;
}
.category {
  background-color: transparent !important;
  * {
    text-decoration: none;
  }
}
.categories-container {
  min-width: max-content !important;
  .category-subheader {
    font-family: lalezar !important;
    opacity: 0.8;
    &:hover {
      transition: all 0.2s ease-in-out;
      color: $secondary !important;
    }
  }
  .subcategory {
    opacity: 0.9;
    position: relative;
    transition: all 0.2s ease-in-out;
    &:hover {
      color: $secondary !important;
    }
  }
}
</style>
