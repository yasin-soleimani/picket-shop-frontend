<template>
  <div class="full-w">
    <AppLoading v-if="$store.state.app.pageLoading"></AppLoading>

    <form
      v-else
      :class="[
        `${
          $vuetify.theme.dark
            ? 'black elevation-12'
            : 'grey lighten-5 elevation-6'
        }`,
      ]"
      class="
        mt-8
        mx-auto
        px-8
        py-6
        d-flex
        flex-column
        align-center
        justify-space-between
        rounded-lg
      "
      style="width: 320px; max-width: 90vw; gap: 1.2rem"
    >
      <h3>افزودن دسته‌بندی جدید</h3>

      <div class="full-w d-flex flex-column justify-start" style="gap: 1rem">
        <!-- title -->
        <v-text-field
          outlined
          class="full-w rounded-lg"
          hide-details="auto"
          label="عنوان"
          color="secondary"
          v-model="$v.title.$model"
          :error-messages="titleError"
        ></v-text-field>

        <div class="full-w d-flex align-center justify-start" style="gap: 1rem">
          <!-- is parent or not -->
          <label class="d-flex align-center justify-start" style="gap: 0.2rem">
            <input type="radio" v-model="isParent" :value="true" />
            <span class="text-subtitle-2">دسته‌بندی والد</span>
          </label>
          <label class="d-flex align-center justify-start" style="gap: 0.2rem">
            <input type="radio" v-model="isParent" :value="false" />
            <span class="text-subtitle-2">زیر دسته‌بندی</span>
          </label>
        </div>

        <!-- list of main categories to choose -->
        <v-select
          outlined
          class="full-w rounded-lg"
          hide-details="auto"
          v-if="!isParent"
          color="secondary"
          item-text="title"
          item-value="value"
          label="دسته‌بندی والد"
          :items="parentCategories"
          v-model="parent"
        ></v-select>

        <!-- path -->
        <v-text-field
          outlined
          class="full-w rounded-lg"
          dir="ltr"
          label="آدرس"
          hide-details="auto"
          color="secondary"
          pattern="[0-9]{4}-[0-9]{2}"
          v-model="$v.parentPath.$model"
          :error-messages="parentPathError"
        ></v-text-field>
      </div>

      <!-- submit -->
      <div class="full-w d-flex flex-column" style="gap: 0.6rem">
        <v-btn
          large
          type="submit"
          :loading="isLoading"
          class="full-w rounded-lg"
          :color="`${$vuetify.theme.dark ? 'secondary' : 'primary'}`"
          :disabled="$v.$invalid || !isParentValid"
          @click.prevent="addCategory"
          >افزودن</v-btn
        >
        <v-btn
          large
          outlined
          class="full-w rounded-lg"
          @click.prevent="backward"
          color="primary lighten-3"
          >بازگشت</v-btn
        >
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import store from "@/store";
import router from "@/router";
import { validationMixin } from "vuelidate";
import AppLoading from "@/components/UI/AppLoading.vue";
import { required, minLength, helpers } from "vuelidate/lib/validators";

// vuelidate rule
const alphaNumAndDashValidator = helpers.regex(
  "alphaNumAndDot",
  /^\/[a-z\d-/]*$/i
);

export default Vue.extend({
  name: "AdminAddCategory",
  mixins: [validationMixin],
  components: { AppLoading },
  data() {
    return {
      isParent: true,
    };
  },
  computed: {
    parentCategories() {
      const categories: any[] = store.state.panel.categories.filter(
        (category: any) => category.parent === null
      );

      const items: any[] = [];

      categories.forEach((category) => {
        items.push({
          title: category.title,
          value: {
            id: category["_id"],
            path: category.parentPath,
          },
        });
      });

      return items;
    },
    title: {
      get(): string {
        return store.state.admin.categoryData.title;
      },
      set(value: string): void {
        store.dispatch("admin/updateCategoryTitle", value);
      },
    },
    titleError(): string[] {
      const errors: string[] = [];
      if (!this.$v.title?.$dirty) {
        return errors;
      }
      !this.$v.title.required && errors.push("تکمیل این فیلد الزامی است");
      return errors;
    },
    parent: {
      get(): any {
        return store.state.admin.categoryData.parent;
      },
      set(value: []): void {
        store.dispatch("admin/updateCategoryParent", value);
      },
    },
    parentPath: {
      get(): string {
        return store.state.admin.categoryData.parentPath;
      },
      set(value: string): void {
        store.dispatch("admin/updateCategoryParentPath", value);
      },
    },
    parentPathError(): string[] {
      const errors: string[] = [];
      if (!this.$v.parentPath?.$dirty) {
        return errors;
      }
      !this.$v.parentPath.required && errors.push("تکمیل این فیلد الزامی است");
      !this.$v.parentPath.minLength && errors.push("تکمیل این فیلد الزامی است");
      !this.$v.parentPath.alphaNumAndDashValidator &&
        errors.push(
          "آدرس باید با اسلش (/) شروع شود. کاراکتر های مجاز: حروف، اعداد و خط فاصله (-)"
        );

      return errors;
    },
    isParentValid() {
      if (this.isParent) {
        return store.state.admin.categoryData.parent === null;
      } else {
        return store.state.admin.categoryData.parent !== null;
      }
    },
    isLoading(): boolean {
      return store.state.app.loading;
    },
  },
  mounted() {
    if (this.$route.query.child === "true") this.isParent = false;
  },
  methods: {
    addCategory(): void {
      if (store.state.admin.categoryData.parent !== null) {
        store.state.admin.categoryData.parent = this.parent?.id;
      }

      store.dispatch("admin/addCategory");
    },
    backward(): void {
      router.push({ name: "admin-all-categories" });
    },
  },
  watch: {
    isParent(newVal) {
      if (newVal === true) store.state.admin.categoryData.parent = null;
    },
  },
  validations: {
    title: {
      required,
    },
    parentPath: {
      required,
      minLength: minLength(2),
      alphaNumAndDashValidator,
    },
  },
});
</script>
