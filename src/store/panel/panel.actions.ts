import { RootState } from "..";
import { ActionTree } from "vuex";
import { PanelState } from "./panel.module";
import { panelService } from "@/http/panel";
import { MUTATIONS } from "@/constants/mutations";
import store from "..";

export const PANEL_ACTIONS: ActionTree<PanelState, RootState> = {
  // get user profile
  getProfile(context): void {
    panelService
      .getProfile()
      .then((res) => {
        // set user profile info
        context.commit(MUTATIONS.panel.setUser, res.data.data);

        // end page loading
        context.rootState.app.pageLoading = false;
      })
      .catch((error) => {
        // set snackbar
        store.commit("app/showSnackbar", error.response.data);

        // end page loading
        context.rootState.app.pageLoading = false;
      });
  },
  // update profile
  updateFullName(context, value: string): void {
    context.commit(MUTATIONS.panel.updateFullName, value);
  },
  updateAddress(context, value: string): void {
    context.commit(MUTATIONS.panel.updateAddress, value);
  },
  updateProvince(context, value: string): void {
    context.commit(MUTATIONS.panel.updateProvince, value);
  },
  updateCity(context, value: string): void {
    context.commit(MUTATIONS.panel.updateCity, value);
  },
  updateAvatar(context, value: string): void {
    context.commit(MUTATIONS.panel.updateAvatar, value);
  },
  removeAvatar(context): void {
    context.commit(MUTATIONS.panel.removeAvatar);
  },
  // update profile
  updateProfile(context): void {
    // start loading
    context.rootState.app.loading = true;

    // user data coming from login form
    const { fullname, address, province, city } = context.state.user || {};
    const updateData = {
      fullname: fullname,
      address: address,
      province: province,
      city: city,
      // avatar: avatar,
      avatar: "",
    };

    panelService
      .updateProfile(updateData)
      .then((res) => {
        // set snackbar
        store.commit("app/showSnackbar", res.data);

        // stop loading
        context.rootState.app.loading = false;
      })
      .catch((error) => {
        // set snackbar
        store.commit("app/showSnackbar", error.response.data);

        // stop loading
        context.rootState.app.loading = false;
      });
  },
  uploadAvatar(_, formData): void {
    panelService
      .updateAvatar(formData)
      .then((res) => {
        store.commit("app/showSnackbar", res.data);
      })
      .catch((error) => {
        store.commit("app/showSnackbar", error.response.data);
      });
  },
  // product
  getProductDetails(context, id: string): void {
    panelService
      .getProductDetails(id)
      .then((res) => {
        // end page loading
        context.rootState.app.loading = false;

        context.commit(MUTATIONS.panel.setProduct, res.data.data);
      })
      .catch((error) => {
        // end page loading
        context.rootState.app.loading = false;

        // set snackbar
        store.commit("app/showSnackbar", error.response.data);
      });
  },
  // products list (get by category id)
  getProductsById(context, id: string): void {
    panelService
      .getProducts(id)
      .then((res) => {
        context.commit(MUTATIONS.panel.setProducts, res.data.data.products);

        // end page loading
        context.rootState.app.loading = false;
        context.rootState.app.pageLoading = false;
      })
      .catch((error) => {
        // end page loading
        context.rootState.app.loading = false;
        context.rootState.app.pageLoading = false;

        // set snackbar
        store.commit("app/showSnackbar", error.response.data);
      });
  },
  // categories
  getCategories(context): void {
    panelService
      .getCategories()
      .then((res) => {
        context.state.categories = res.data.data.categoriesList;

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
  // invoices
  getInvoices(context): void {
    panelService
      .getInvoices()
      .then((res) => {
        context.commit(MUTATIONS.panel.setInvoices, res.data.data.invoices);
      })
      .catch((error) => {
        // set snackbar
        store.commit("app/showSnackbar", error.response.data);
      });
  },
  addNewInvoice(context, payload): void {
    panelService
      .addNewInvoice(payload.data)
      .then((res) => {
        // set snackbar
        store.commit("app/showSnackbar", res.data);

        // decrease user wallet balance
        if (context.state.user?.wallet) {
          context.state.user.wallet =
            context.state.user.wallet - payload.totalAmount;
        }

        // reset cart
        context.rootState.panel.cart = [];
        localStorage.setItem("picketCart", JSON.stringify([]));
      })
      .catch((error) => {
        // set snackbar
        store.commit("app/showSnackbar", error.response.data);
      });
  },
  // transactions
  getTransactions(context): void {
    panelService
      .getTransactions()
      .then((res) => {
        context.commit(
          MUTATIONS.panel.setTransactions,
          res.data.data.transactions
        );
      })
      .catch((error) => {
        // set snackbar
        store.commit("app/showSnackbar", error.response.data);
      });
  },
  // cart
  getCartItems(context): void {
    const data = localStorage.getItem("picketCart");

    if (data !== null) {
      context.commit(MUTATIONS.panel.setCartItems, JSON.parse(data));
    } else {
      localStorage.setItem("picketCart", JSON.stringify([]));
    }

    // end page loading
    context.rootState.app.pageLoading = false;
  },
  addToCart(context, product): void {
    context.commit(MUTATIONS.panel.addToCart, product);
    const cart = context.state.cart;
    localStorage.setItem("picketCart", JSON.stringify(cart));
  },
  removeCartItem(context, id: string) {
    const items = context.state.cart;
    const identifiedItem = items.findIndex((item) => item.id === id);
    items.splice(identifiedItem, 1);

    // remove from state
    context.commit(MUTATIONS.panel.setCartItems, items);

    // remove from localstorage
    localStorage.setItem("picketCart", JSON.stringify(items));
  },
  // comment
  newOpinion(context, id: string): void {
    const data = context.state.comment;
    panelService
      .addUserOpinion(id, data)
      .then((res) => {
        store.commit("app/showSnackbar", res.data);

        // get product details again
        store.dispatch("panel/getProductDetails", id);

        // clear comment data
        context.commit(MUTATIONS.panel.resetComment);
      })
      .catch((error) => {
        store.commit("app/showSnackbar", error.response.data);
      });
  },
  updateCommentUsername(context, value: string): void {
    context.commit(MUTATIONS.panel.updateCommentUsername, value);
  },
  updateCommentMessage(context, value: string): void {
    context.commit(MUTATIONS.panel.updateCommentMessage, value);
  },
};
