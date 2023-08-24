<template>
  <DefaultLayout>
    <!-- loading -->
    <div
      style="height: 60vh"
      v-if="!$store.state.panel.product.name.length"
      class="full-w d-flex align-center justify-center"
    >
      <p v-if="$store.state.app.loading" class="font-weight-bold">
        در حال دریافت اطلاعات محصول...
      </p>
      <p
        v-else-if="
          !$store.state.app.loading && !$store.state.panel.product.name.length
        "
        class="font-weight-bold"
      >
        محصول یافت نشد!
      </p>
    </div>

    <template v-else>
      <!-- product details -->
      <v-row class="my-6 mx-auto" align="center">
        <!-- images -->
        <v-col cols="12" lg="6" align="center">
          <div class="product-image">
            <!-- main -->
            <img
              v-if="product.img.length"
              :src="mainImage"
              :alt="product.name"
              width="60%"
            />

            <!-- other images -->
            <v-row dense class="full-w px-2 mt-8" justify="center">
              <v-col cols="3">
                <img
                  height="80"
                  class="product-detail-image pa-1"
                  @click="switchImage(LINK + imgPrefix + product.img)"
                  :src="LINK + imgPrefix + product.img"
                />
              </v-col>
              <v-col cols="3" v-for="(image, i) in product.images[0]" :key="i">
                <img
                  height="80"
                  class="product-detail-image pa-1"
                  @click="switchImage(LINK + detailImagesPrefix + image)"
                  :src="LINK + detailImagesPrefix + image"
                />
              </v-col>
            </v-row>
          </div>
        </v-col>

        <!-- details -->
        <v-col cols="12" lg="6">
          <div
            class="full-w d-flex flex-column align-start justify-center"
            style="gap: 0.8rem"
          >
            <!-- title -->
            <h2>{{ product.name }}</h2>

            <!-- description -->
            <p class="text-subtitle-2 grey--text" style="max-width: 88%">
              {{ product.description }}
            </p>

            <!-- price -->
            <h3 v-if="product.special_sell === 0" class="primary--text">
              {{ convertToPersian(separateDigits(product.amount)) }}
              ریال
            </h3>

            <div
              v-else
              class="d-flex align-center justify-start"
              style="gap: 1rem"
            >
              <h4
                class="text-subtitle-2 grey--text text-decoration-line-through"
              >
                {{ convertToPersian(separateDigits(product.amount || 0)) }}
              </h4>
              <h3 class="font-bold primary--text">
                {{
                  convertToPersian(separateDigits(product.special_sell || 0))
                }}
                ریال
              </h3>
            </div>

            <!-- add to cart -->
            <div class="d-flex align-center justify-start" style="gap: 1rem">
              <!-- add to cart -->
              <v-btn
                x-large
                class="my-4"
                @click="modal = true"
                :color="`${$vuetify.theme.dark ? 'secondary' : 'primary'}`"
                :disabled="(product.inventory || 0) < 1"
              >
                افزودن به سبد خرید
              </v-btn>

              <p
                class="secondary--text text-subtitle-2"
                v-if="(product.inventory || 0) < 1"
              >
                در حال حاضر این محصول در انبار موجود نیست.
              </p>

              <!-- add to cart modal -->
              <v-fade-transition>
                <AppModal v-if="modal" @close="modal = false">
                  <template #title> افزودن به سبد خرید </template>

                  <template>
                    <!-- qty -->
                    <div
                      class="full-w py-4 d-flex align-center justify-center"
                      style="gap: 0.4rem"
                    >
                      <p class="grey--text">تعداد:</p>

                      <!-- increase -->
                      <v-btn
                        icon
                        @click="increaseQty"
                        :color="`${
                          $vuetify.theme.dark
                            ? 'secondary lighten-3'
                            : 'primary'
                        }`"
                        :disabled="qty >= product.inventory"
                      >
                        <v-icon>mdi-plus</v-icon>
                      </v-btn>

                      <!-- qty value -->
                      <span
                        class="font-weight-bold text-h5"
                        :class="[
                          `${
                            $vuetify.theme.dark
                              ? 'secondary--text'
                              : 'primary--text'
                          }`,
                        ]"
                        >{{ qty }}</span
                      >

                      <!-- decrease -->
                      <v-btn
                        icon
                        @click="decreaseQty"
                        :color="`${
                          $vuetify.theme.dark
                            ? 'secondary lighten-3'
                            : 'primary'
                        }`"
                        :disabled="qty <= 1"
                      >
                        <v-icon>mdi-minus</v-icon>
                      </v-btn>
                    </div>
                  </template>

                  <template #buttons>
                    <AppModalBtn @click="addToCart">افزودن</AppModalBtn>
                  </template>
                </AppModal>
              </v-fade-transition>
            </div>
          </div>
        </v-col>
      </v-row>

      <!-- comment -->
      <v-row
        class="full-w mx-auto"
        justify="center"
        :align="$vuetify.breakpoint.mobile ? 'center' : 'start'"
      >
        <!-- header -->
        <v-col cols="12">
          <v-row dense align="center">
            <v-col cols="1">
              <span class="title-line grey"></span>
            </v-col>
            <v-col
              cols="11"
              class="d-flex align-center justify-space-between"
              style="gap: 1rem"
            >
              <p
                :class="[
                  `${
                    $vuetify.breakpoint.mobile
                      ? 'text-caption'
                      : 'text-subtitle-2'
                  }`,
                  `grey--text`,
                ]"
                class="title grey--text pa-0 ma-0"
                style="min-width: max-content !important"
              >
                نظر کاربران
              </p>

              <span class="title-line grey"></span>
            </v-col>
          </v-row>
        </v-col>

        <!-- new comment -->
        <v-col cols="12" sm="5" md="3">
          <div
            class="
              full-w
              pa-4
              elevation-2
              rounded-lg
              d-flex
              flex-column
              align-center
              justify-start
            "
            :class="[
              `${$vuetify.theme.dark ? 'grey darken-4' : 'grey lighten-4'}`,
            ]"
            style="gap: 1rem"
          >
            <!-- username -->
            <v-text-field
              block
              outlined
              type="text"
              label="نام"
              color="secondary"
              style="width: 100%"
              hide-details="auto"
              v-model="$v.username.$model"
              :error-messages="usernameError"
            ></v-text-field>

            <!-- message -->
            <v-textarea
              block
              outlined
              type="text"
              label="متن دیدگاه"
              rows="5"
              height="160"
              auto-grow
              color="secondary"
              style="width: 100%"
              hide-details="auto"
              v-model="$v.message.$model"
              :error-messages="messageError"
            ></v-textarea>

            <!-- submit -->
            <v-btn
              block
              x-large
              color="secondary"
              :disabled="$v.$invalid"
              @click="newComment"
              >ثبت دیدگاه</v-btn
            >
          </div>
        </v-col>

        <!-- all comments -->
        <v-col cols="12" sm="7" md="8">
          <p
            v-if="!product.userOpinions.length"
            class="grey--text text-subtitle-2 font-weight-bold text-start"
          >
            هنوز نظری برای این محصول ثبت نشده!
          </p>
          <section
            v-else
            class="full-w d-flex flex-column align-center justify-start"
            style="gap: 0.6rem"
          >
            <div
              v-for="(opinion, i) in product.userOpinions"
              :key="i"
              class="
                pa-5
                full-w
                elevation-2
                d-flex
                flex-column
                align-start
                rounded
              "
              :class="[
                `${$vuetify.theme.dark ? 'grey darken-4' : 'grey lighten-4'}`,
              ]"
              style="gap: 0.6rem"
            >
              <!-- username -->
              <h4>
                کاربر
                <i
                  class="mx-2"
                  :class="[
                    `${
                      $vuetify.theme.dark ? 'secondary--text' : 'primary--text'
                    }`,
                  ]"
                  >{{ opinion.userName || "ناشناس" }}</i
                >
              </h4>

              <!-- message -->
              <p class="text-subtitle-2 grey--text text--darken-1">
                {{ opinion.message }}
              </p>
            </div>
          </section>
        </v-col>
      </v-row>
    </template>
  </DefaultLayout>
</template>

<script lang="ts">
import Vue from "vue";
import store from "@/store";
import LINK from "@/utils/link";
import { validationMixin } from "vuelidate";
import DefaultLayout from "@/layout/DefaultLayout.vue";
import { required } from "vuelidate/lib/validators";
import { separateDigits, convertToPersian } from "@/utils/string";
import AppModal from "@/components/UI/AppModal.vue";
import AppModalBtn from "@/components/UI/AppModalBtn.vue";

export default Vue.extend({
  name: "Product",
  mixins: [validationMixin],
  components: {
    DefaultLayout,
    AppModal,
    AppModalBtn,
  },
  data() {
    return {
      LINK: LINK,
      imgPrefix: "images/upload-product-images/",
      detailImagesPrefix: "images/upload-product-detail-images/",

      modal: false,

      qty: 1,

      mainImage: "",
    };
  },
  computed: {
    productId(): any {
      return this.$route.params.id;
    },
    // validation
    username: {
      get(): string {
        return store.state.panel.comment.userName;
      },
      set(value: string): void {
        store.dispatch("panel/updateCommentUsername", value);
      },
    },
    usernameError(): string[] {
      const errors: string[] = [];
      if (!this.$v.fullname?.$dirty) {
        return errors;
      }
      !this.$v.fullname.required && errors.push("تکمیل این فیلد الزامی است");
      return errors;
    },
    message: {
      get(): string {
        return store.state.panel.comment.message;
      },
      set(value: string): void {
        store.dispatch("panel/updateCommentMessage", value);
      },
    },
    messageError(): string[] {
      const errors: string[] = [];
      if (!this.$v.fullname?.$dirty) {
        return errors;
      }
      !this.$v.fullname.required && errors.push("تکمیل این فیلد الزامی است");
      return errors;
    },
    // data
    product() {
      return store.state.panel.product;
    },
  },
  methods: {
    separateDigits,
    convertToPersian,
    // qty
    decreaseQty() {
      if (this.qty > 1) this.qty--;
    },
    increaseQty() {
      if (this.qty < this.product.inventory) this.qty++;
    },
    addToCart(): void {
      const product = { ...this.product, qty: this.qty };
      store.dispatch("panel/addToCart", product);
      store.commit("app/showSnackbar", {
        status: 200,
        message: "محصول با موفقیت به سبد خرید اضافه شد",
      });
      this.modal = false;
    },
    // comment
    newComment() {
      store.dispatch("panel/newOpinion", this.productId);
    },
    // details
    getDetails() {
      // start loading
      store.state.app.loading = true;

      // clear former product details
      store.commit("panel/resetProduct");

      // get details
      store.dispatch("panel/getProductDetails", this.productId);
    },
    // switch image
    switchImage(img: any) {
      this.mainImage = img;
    },
  },
  created() {
    this.getDetails();
  },
  watch: {
    product() {
      this.mainImage = LINK + this.imgPrefix + this.product.img;
    },
  },
  validations: {
    username: {
      required,
    },
    message: {
      required,
    },
  },
});
</script>

<style lang="scss" scoped>
p {
  margin: 0;
}
.product-image {
  width: 480px;
  cursor: pointer;
}
.product-detail-image {
  cursor: pointer;
  border-radius: 10px;
  border: 1px solid #aaaaaa60;
}
.title {
  color: #625a5ace;
}
.title-line {
  width: 100%;
  height: 1px;
  display: block;
  opacity: 0.6;
}
</style>
