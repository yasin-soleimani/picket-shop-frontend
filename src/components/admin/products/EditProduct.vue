<template>
  <div class="full-w">
    <AppLoading v-if="$store.state.app.pageLoading"></AppLoading>

    <v-row v-else justify="center" align="start">
      <!-- product image -->
      <v-col cols="10" md="3">
        <v-card
          style="width: 420px; grid-area: 1rem"
          :class="[
            `${
              $vuetify.theme.dark
                ? 'black elevation-12'
                : 'grey lighten-5 elevation-6'
            }`,
          ]"
          class="
            mx-auto
            d-flex
            flex-column
            align-center
            justify-start
            pa-4
            rounded-xl
          "
        >
          <h4>افزودن تصویر</h4>

          <!-- product image plceholder -->
          <label
            style="width: 100%; height: 100%"
            class="upload-avatar px-4 py-2"
            @change="editProductImage($event)"
          >
            <v-img
              :src="
                $store.state.admin.productData.img.length
                  ? $store.state.admin.productData.img
                  : defaultImage
              "
              class="full-w rounded-lg"
              style="cursor: pointer"
            />
            <input type="file" accept="image/png" />
          </label>
        </v-card>

        <!-- multiple images -->
        <v-card
          style="width: 420px"
          :class="[
            `${
              $vuetify.theme.dark
                ? 'black elevation-12'
                : 'grey lighten-5 elevation-6'
            }`,
          ]"
          class="
            mx-auto
            mt-4
            d-flex
            align-center
            justify-center
            pa-4
            rounded-xl
          "
        >
          <v-file-input
            dense
            outlined
            multiple
            hide-details
            label="عکس های بیشتر"
            @change="uploadImages($event)"
          ></v-file-input>
        </v-card>
      </v-col>

      <!-- main form -->
      <v-col cols="10" md="4">
        <form
          :class="[
            `${
              $vuetify.theme.dark
                ? 'black elevation-12'
                : 'grey lighten-5 elevation-6'
            }`,
          ]"
          class="
            mx-auto
            pa-6
            d-flex
            flex-column
            align-center
            justify-space-between
            rounded-xl
            overflow-hidden
          "
          style="width: 420px; max-width: 90vw; gap: 1.2rem"
        >
          <h4 class="mb-2">ویرایش محصول</h4>

          <!-- id -->
          <p class="text-subtitle-2 grey--text">شناسه: {{ id }}</p>

          <!-- title -->
          <v-text-field
            class="full-w"
            color="secondary"
            outlined
            hide-details="auto"
            type="text"
            label="عنوان"
            v-model="$v.name.$model"
            :error-messages="nameError"
          ></v-text-field>

          <!-- category -->
          <v-select
            outlined
            hide-details="auto"
            class="full-w"
            label="دسته‌بندی"
            item-text="title"
            item-value="value"
            :items="categories"
            v-model="$v.category.$model"
            :error-messages="categoryError"
          ></v-select>

          <!-- price -->
          <v-text-field
            class="full-w"
            color="secondary"
            outlined
            hide-details="auto"
            type="number"
            label="قیمت (ریال)"
            v-model="$v.amount.$model"
            :error-messages="amountError"
          ></v-text-field>

          <!-- special sell -->
          <v-text-field
            outlined
            hide-details="auto"
            type="number"
            class="full-w"
            color="secondary"
            label="قیمت نهایی (ریال)"
            v-model="$v.special_sell.$model"
            :error-messages="specialSellError"
          ></v-text-field>

          <!-- inventory -->
          <v-text-field
            outlined
            hide-details="auto"
            type="number"
            class="full-w"
            color="secondary"
            label="موجودی"
            v-model="$v.inventory.$model"
            :error-messages="inventoryError"
          ></v-text-field>

          <!-- description -->
          <v-textarea
            dense
            color="secondary"
            outlined
            hide-details="auto"
            rows="5"
            height="160"
            auto-grow
            class="full-w"
            label="توضیحات محصول"
            v-model="$v.description.$model"
            :error-messages="descriptionError"
          ></v-textarea>

          <v-btn
            large
            block
            type="submit"
            :loading="isLoading"
            :color="`${$vuetify.theme.dark ? 'secondary' : 'primary'}`"
            :disabled="$v.$invalid || $store.state.admin.productData.img === ''"
            @click.prevent="editProduct"
            >ثبت تغییرات</v-btn
          >
          <v-btn color="primary" large block outlined @click.prevent="cancel"
            >انصراف</v-btn
          >
        </form>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import store from "@/store";
import router from "@/router";
import { validationMixin } from "vuelidate";
import { required, minLength, minValue } from "vuelidate/lib/validators";
import AppLoading from "@/components/UI/AppLoading.vue";

export default Vue.extend({
  name: "AdminEditProduct",
  mixins: [validationMixin],
  components: { AppLoading },
  data() {
    return {
      id: "",
      chosenFile: "" as string | FormData,
      chosenFiles: "" as string | FormData,
      defaultImage: require("@/assets/img/default-product.jpg"),
    };
  },
  methods: {
    editProduct() {
      store.dispatch("admin/editProduct", {
        id: this.id,
        formData: { image: this.chosenFile, images: this.chosenFiles },
      });
    },
    editProductImage(e: any): void {
      const file = e.target.files[0];
      if (file) {
        const fileReader = new FileReader();

        fileReader.onload = (event) => {
          store.dispatch("admin/updateProductImage", event?.target?.result);
        };
        fileReader.readAsDataURL(file);

        // save choosed file
        let formData = new FormData();
        formData.append("image", file);
        this.chosenFile = formData;
      }
    },
    uploadImages(files: any): void {
      let formData = new FormData();

      for (let fileIndex in files) {
        const file = files[fileIndex];

        formData.append("images", file);
      }

      this.chosenFiles = formData;
    },
    cancel(): void {
      router.push({ name: "admin-all-products" });
    },
  },
  computed: {
    productDetails() {
      return store.state.admin.productData;
    },
    categories(): any[] {
      const categories = store.state.panel.categories;
      let items: any[] = [];
      categories.forEach((category: any) => {
        const item = {
          title: category.title,
          value: category["_id"],
        };
        items.push(item);
      });
      return items;
    },
    name: {
      get(): string {
        return store.state.admin.productData.name;
      },
      set(value: string): void {
        store.dispatch("admin/updateProductName", value);
      },
    },
    nameError(): string[] {
      const errors: string[] = [];
      if (!this.$v.name?.$dirty) {
        return errors;
      }
      !this.$v.name.required && errors.push("تکمیل این فیلد الزامی است");
      return errors;
    },
    category: {
      get(): string {
        return store.state.admin.productData.category;
      },
      set(value: string): void {
        store.dispatch("admin/updateProductCategory", value);
      },
    },
    categoryError(): string[] {
      const errors: string[] = [];
      if (!this.$v.category?.$dirty) {
        return errors;
      }
      !this.$v.category.required && errors.push("تکمیل این فیلد الزامی است");
      return errors;
    },
    amount: {
      get(): number | null {
        return Number(store.state.admin.productData.amount);
      },
      set(value: number): void {
        store.dispatch("admin/updateProductAmount", Number(value));
      },
    },
    amountError(): string[] {
      const errors: string[] = [];
      if (!this.$v.amount?.$dirty) {
        return errors;
      }
      !this.$v.amount.minLength && errors.push("حداقل 4 رقم");
      !this.$v.amount.required && errors.push("تکمیل این فیلد الزامی است");
      return errors;
    },
    special_sell: {
      get(): number {
        return Number(store.state.admin.productData.special_sell);
      },
      set(value: number): void {
        store.dispatch("admin/updateProductSpecialSell", Number(value));
      },
    },
    specialSellError(): string[] {
      const errors: string[] = [];
      if (!this.$v.special_sell?.$dirty) {
        return errors;
      }
      !this.$v.special_sell.required &&
        errors.push("تکمیل این فیلد الزامی است");
      return errors;
    },
    inventory: {
      get(): number {
        return Number(store.state.admin.productData.inventory);
      },
      set(value: number): void {
        store.dispatch("admin/updateProductInventory", Number(value));
      },
    },
    inventoryError(): string[] {
      const errors: string[] = [];
      if (!this.$v.inventory?.$dirty) {
        return errors;
      }
      !this.$v.inventory.required && errors.push("تکمیل این فیلد الزامی است");
      !this.$v.inventory.minValue && errors.push("حداقل موجودی محصول: 1 عدد");

      return errors;
    },
    description: {
      get(): string {
        return store.state.admin.productData.description;
      },
      set(value: string): void {
        store.dispatch("admin/updateProductDescription", value);
      },
    },
    descriptionError(): string[] {
      const errors: string[] = [];
      if (!this.$v.description?.$dirty) {
        return errors;
      }
      !this.$v.description.required && errors.push("تکمیل این فیلد الزامی است");
      return errors;
    },
    isLoading(): boolean {
      return store.state.app.loading;
    },
  },
  created() {
    const id = this.$route.query.id;

    if (!id) {
      // set snackbar
      store.commit("app/showSnackbar", {
        message: "ابتدا یک محصول جهت ویرایش انتخاب کنید",
        status: 400,
      });

      // move to the main admin page
      router.push({ name: "admin-all-products" });
    } else {
      this.id = id as string;
      store.dispatch("admin/getProductDetails", id);
    }
  },
  validations: {
    name: {
      required,
    },
    category: {
      required,
    },
    amount: {
      required,
      minLength: minLength(4),
    },
    special_sell: {
      required,
    },
    inventory: {
      required,
      minValue: minValue(1),
    },
    description: {
      required,
    },
  },
});
</script>

<style lang="scss" scoped>
.upload-avatar {
  position: relative;
}
input[type="file"] {
  width: 0;
  height: 0;
  opacity: 0;
  position: absolute;
}
</style>
