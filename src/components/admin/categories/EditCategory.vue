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
      <h3>ویرایش دسته‌بندی</h3>

      <div class="full-w d-flex flex-column justify-start" style="gap: 1rem">
        <p class="text-caption grey--text text-center">
          شناسه: {{ $route.query.id }}
        </p>
        <!-- title -->
        <v-text-field
          outlined
          class="full-w rounded-lg"
          hide-details="auto"
          label="عنوان"
          v-model="$v.title.$model"
          :error-messages="titleError"
          color="secondary"
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
          v-model="$v.parentPath.$model"
          :error-messages="parentPathError"
          pattern="[0-9]{4}-[0-9]{2}"
          color="secondary"
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
          @click.prevent="editCategory"
          >ثبت تغییرات</v-btn
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
  name: "AdminEditCategory",
  mixins: [validationMixin],
  components: { AppLoading },
  data() {
    return {
      id: "",

      isParent: false,

      title: "",
      parent: {} as any,
      parentPath: "",
    };
  },
  computed: {
    categories(): any {
      return store.state.panel.categories.length;
    },
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
    titleError(): string[] {
      const errors: string[] = [];
      if (!this.$v.title?.$dirty) {
        return errors;
      }
      !this.$v.title.required && errors.push("تکمیل این فیلد الزامی است");
      return errors;
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
      if (!this.isParent) {
        if (this.parent !== null) {
          return true;
        } else {
          return false;
        }
      } else {
        return true;
      }
    },
    isLoading(): boolean {
      return store.state.app.loading;
    },
  },
  methods: {
    setcategoryData(): void {
      const category: any = store.state.panel.categories.find(
        (ctg: any) => ctg._id == this.id
      );

      this.title = category.title;
      this.parent = category.parent;
      this.parentPath = category.parentPath;

      if (this.parent === null) {
        this.isParent = true;
      } else {
        this.isParent = false;
      }
    },
    editCategory(): void {
      const data = {
        title: this.title,
        parent: this.isParent ? null : this.parent.id,
        parentPath: this.parentPath,
      };

      store.dispatch("admin/editCategory", { id: this.id, data });
    },
    backward(): void {
      router.push({ name: "admin-all-categories" });
    },
  },
  mounted() {
    // check route query for category ID
    const categoryId = this.$route.query.id;
    if (categoryId) {
      this.id = categoryId as string;

      // get & set category data id the categories list are gotten
      if (this.categories) {
        this.setcategoryData();
      }
    } else {
      store.commit("app/showSnackbar", {
        message: "لطفا یک دسته‌بندی جهت ویرایش انتخاب کنید",
        status: 400,
      });
      router.push({ name: "admin-all-categories" });
    }
  },
  watch: {
    categories() {
      this.setcategoryData();
    },
    isParent(newVal) {
      if (newVal === true) this.parent = null;
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
