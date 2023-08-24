import { RootState } from "..";
import { ActionTree } from "vuex";
import { AdminState } from "./admin.module";
import { adminService } from "@/http/admin";
import { MUTATIONS } from "@/constants/mutations";
import store from "..";
import { CategoryData } from "@/interfaces/category-data.model";
import router from "@/router";

export const ADMIN_ACTIONS: ActionTree<AdminState, RootState> = {
  // categories
  addCategory(context): void {
    context.rootState.app.loading = true;

    const data = context.state.categoryData;

    adminService
      .addCategory(data)
      .then((res) => {
        // set snackbar
        store.commit("app/showSnackbar", res.data);

        context.rootState.app.loading = false;

        // move back
        router.push({ name: "admin-all-categories" });

        // reset category data
        context.commit(MUTATIONS.admin.resetCategoryData);

        // refresh categories
        store.dispatch("panel/getCategories");
      })
      .catch((error) => {
        // set snackbar
        store.commit("app/showSnackbar", error.response.data);

        context.rootState.app.loading = false;
      });
  },
  editCategory(context, payload: { id: string; data: CategoryData }): void {
    context.rootState.app.loading = true;

    adminService
      .updateCategory(payload.id, payload.data)
      .then((res) => {
        // set snackbar
        store.commit("app/showSnackbar", res.data);

        context.rootState.app.loading = false;

        // move back
        router.push({ name: "admin-all-categories" });

        // reset category data
        context.commit(MUTATIONS.admin.resetCategoryData);

        // refresh categories
        store.dispatch("panel/getCategories");
      })
      .catch((error) => {
        // set snackbar
        store.commit("app/showSnackbar", error.response.data);

        context.rootState.app.loading = false;
      });
  },
  deleteCategory(_, id: string): void {
    adminService
      .deleteCategory(id)
      .then((res) => {
        // set snackbar
        store.commit("app/showSnackbar", res.data);
      })
      .catch((error) => {
        // set snackbar
        store.commit("app/showSnackbar", error.response.data);
      });
  },
  updateCategoryTitle(context, value: string): void {
    context.commit(MUTATIONS.admin.updateCategoryTitle, value);
  },
  updateCategoryParent(context, value: string | null): void {
    context.commit(MUTATIONS.admin.updateCategoryParent, value);
  },
  updateCategoryParentPath(context, value: string): void {
    context.commit(MUTATIONS.admin.updateCategoryParentPath, value);
  },
  // products
  getProductDetails(context, id: string): void {
    // get product details
    adminService
      .getProductDetails(id)
      .then((res) => {
        context.commit(MUTATIONS.admin.setProduct, res.data.data);

        // end page loading
        context.rootState.app.pageLoading = false;
      })
      .catch((error) => {
        // end page loading
        context.rootState.app.pageLoading = false;

        // set snackbar
        store.commit("app/showSnackbar", error.response.data);
      });
  },
  getProducts(context, id: string): void {
    // get products
    adminService
      .getProducts(id)
      .then((res) => {
        context.state.adminProducts = [];
        context.commit(MUTATIONS.admin.setProducts, res.data.data.products);
        context.rootState.app.loading = false;
      })
      .catch((error) => {
        // set snackbar
        store.commit("app/showSnackbar", error.response.data);
        context.rootState.app.loading = false;
      });
  },
  editProduct(context, { formData, id }): void {
    context.rootState.app.loading = true;

    const data = { ...context.state.productData, img: "" };

    adminService
      .editProduct({ id, data })
      .then((res) => {
        // upload product main image
        adminService
          .uploadProductImage(formData.image, id)
          .then(() => {
            // upload product other images
            adminService
              .uploadProductDetailImages(formData.images, id)
              .then((res) => {
                // set snackbar
                store.commit("app/showSnackbar", res.data);

                // stop loading
                context.rootState.app.loading = false;

                // move to previous page
                router.push({ name: "admin-all-products" });

                // reset product data
                context.commit(MUTATIONS.admin.resetProductData);
              })
              .catch((error) => {
                store.commit("app/showSnackbar", error.response.data);

                // stop loading
                context.rootState.app.loading = false;
              });
          })
          .catch((error) => {
            store.commit("app/showSnackbar", error.response.data);
            context.rootState.app.loading = false;
          });
      })
      .catch((error) => {
        // set snackbar
        store.commit("app/showSnackbar", error.response.data);

        context.rootState.app.loading = false;
      });
  },
  addProduct(context, payload: { image: FormData; images: FormData }): void {
    context.rootState.app.loading = true;

    const data = { ...context.state.productData, img: "" };

    adminService
      .addProduct(data)
      .then((res) => {
        // send product image
        const prodId = res.data.data._id;
        if (prodId.length > 3) {
          // upload product main image
          adminService
            .uploadProductImage(payload.image, prodId)
            .then(() => {
              // upload product other images
              adminService
                .uploadProductDetailImages(payload.images, prodId)
                .then((res) => {
                  // set snackbar
                  store.commit("app/showSnackbar", res.data);
                  context.rootState.app.loading = false;

                  // move to previous page
                  router.push({ name: "admin-all-products" });

                  // reset product data
                  context.commit(MUTATIONS.admin.resetProductData);
                })
                .catch((error) => {
                  store.commit("app/showSnackbar", error.response.data);
                  context.rootState.app.loading = false;
                });
            })
            .catch((error) => {
              store.commit("app/showSnackbar", error.response.data);
              context.rootState.app.loading = false;
            });
        }
      })
      .catch((error) => {
        // set snackbar
        store.commit("app/showSnackbar", error.response.data);

        context.rootState.app.loading = false;
      });
  },
  deleteProduct(context, id: string): void {
    adminService
      .deleteProduct(id)
      .then((res) => {
        // delete the product from store
        context.commit(MUTATIONS.admin.deleteProduct, id);

        // set snackbar
        store.commit("app/showSnackbar", res.data);
      })
      .catch((error) => {
        // set snackbar
        store.commit("app/showSnackbar", error.response.data);
      });
  },
  updateProductName(context, value: string): void {
    context.commit(MUTATIONS.admin.updateProductName, value);
  },
  updateProductCategory(context, value: string): void {
    context.commit(MUTATIONS.admin.updateProductCategory, value);
  },
  updateProductAmount(context, value: number): void {
    context.commit(MUTATIONS.admin.updateProductAmount, value);
  },
  updateProductSpecialSell(context, value: number): void {
    context.commit(MUTATIONS.admin.updateProductSpecialSell, value);
  },
  updateProductInventory(context, value: number): void {
    context.commit(MUTATIONS.admin.updateProductInventory, value);
  },
  updateProductDescription(context, value: string): void {
    context.commit(MUTATIONS.admin.updateProductDescription, value);
  },
  updateProductImage(context, value): void {
    context.commit(MUTATIONS.admin.updateProductImage, value);
  },
  // get users list
  getUsersList(context): void {
    adminService
      .getUsersList()
      .then((res) => {
        // set users list in store
        context.commit(MUTATIONS.admin.setUsersList, res.data.data.usersList);

        // end page loading
        context.rootState.app.pageLoading = false;

        // set snackbar
        store.commit("app/showSnackbar", res.data);
      })
      .catch((error) => {
        // end page loading
        context.rootState.app.pageLoading = false;

        // set snackbar
        store.commit("app/showSnackbar", error.response.data);
      });
  },
  // set user profile data on state
  setUserProfile(context, data): void {
    context.commit(MUTATIONS.admin.setUserProfile, data);
  },
  setUserFullname(context, value: string) {
    context.commit(MUTATIONS.admin.setUserFullname, value);
  },
  setUserAddress(context, value: string) {
    context.commit(MUTATIONS.admin.setUserAddress, value);
  },
  setUserProvince(context, value: string) {
    context.commit(MUTATIONS.admin.setUserProvince, value);
  },
  setUserCity(context, value: string) {
    context.commit(MUTATIONS.admin.setUserCity, value);
  },
  setUserAvatar(context, value: string) {
    context.commit(MUTATIONS.admin.setUserAvatar, value);
  },
  removeUserAvatar(context) {
    context.commit(MUTATIONS.admin.removeUserAvatar);
  },
  // edit user profile by id
  editUserProfile(_, id): void {
    const data = store.state.admin.userProfile;
    adminService
      .editUserProfile(id, data)
      .then((res) => {
        store.commit("app/showSnackbar", res.data);
      })
      .catch((error) => {
        store.commit("app/showSnackbar", error.response.data);
      });
  },
  editUserAvatar(_, { formData, id }): void {
    adminService
      .editUserAvatar(formData, id)
      .then((res) => {
        store.commit("app/showSnackbar", res.data);

        // refresh
        store.dispatch("admin/getUsersList");
      })
      .catch((error) => {
        store.commit("app/showSnackbar", error.response.data);
      });
  },
  // set amount wallet user charge
  setAmountWalletCharge(context, value: number): void {
    context.commit(MUTATIONS.admin.setAmountWalletCharge, value);
  },
  // charge user wallet (request)
  chargingTheUserWallet(context, userId): void {
    const amount = Number(context.state.amountWalletCharge.amount);
    adminService
      .chargingTheUserWallet(amount, userId)
      .then((res) => {
        store.commit("app/showSnackbar", res.data);

        // refresh
        store.dispatch("admin/getUsersList");
      })
      .catch((error) => {
        // set snackbar
        store.commit("app/showSnackbar", error.response.data);
      });
  },
  // get transaction list (request)
  getTransactionsListPanelAdmin(context): void {
    context.rootState.app.pageLoading = false;
    adminService
      .getTransactionsList()
      .then((res) => {
        // end page loading
        context.rootState.app.pageLoading = false;

        // set transactions in store model
        context.state.transactionsList = res.data.data.transactions;
        store.commit("app/showSnackbar", res.data);
      })
      .catch((error) => {
        // end page loading
        context.rootState.app.pageLoading = false;
        store.commit("app/showSnackbar", error.response.data);
      });
  },
  // get invoices list (request)
  getInvoicesList(context): void {
    adminService
      .getInvoicesList()
      .then((res) => {
        // set invoices list in store model
        context.commit(
          MUTATIONS.admin.setInvoicesList,
          res.data.data.invoicesList
        );

        // end page loading
        context.rootState.app.pageLoading = false;
      })
      .catch((error) => {
        // end page loading
        context.rootState.app.pageLoading = false;

        store.commit("app/showSnackbar", error.response.data);
      });
  },
  // accept invoice
  acceptInvoice(_, id): void {
    adminService
      .acceptInvoice(id)
      .then((res) => {
        store.commit("app/showSnackbar", res.data);

        // re-fetch invoices
        store.dispatch("admin/getInvoicesList");
      })
      .catch((error) => {
        store.commit("app/showSnackbar", error.response.data);
      });
  },
  // end invoice
  endInvoice(_, id): void {
    adminService
      .endInvoice(id)
      .then((res) => {
        store.commit("app/showSnackbar", res.data);

        // re-fetch invoices
        store.dispatch("admin/getInvoicesList");
      })
      .catch((error) => {
        store.commit("app/showSnackbar", error.response.data);
      });
  },
  // admins
  getAdminsList(context): void {
    adminService
      .getAdminsList()
      .then((res) => {
        context.commit(MUTATIONS.admin.setAdminsList, res.data.data.adminsList);

        // end page loading
        context.rootState.app.pageLoading = false;

        store.commit("app/showSnackbar", res.data);
      })
      .catch((error) => {
        // end page loading
        context.rootState.app.pageLoading = false;

        store.commit("app/showSnackbar", error.response.data);
      });
  },
};
