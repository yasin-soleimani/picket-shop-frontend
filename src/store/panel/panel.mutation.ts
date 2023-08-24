import { MUTATIONS } from "@/constants/mutations";
import { MutationTree } from "vuex";
import { CurrentUser } from "@/interfaces/current-user.module";
import { PanelState } from "./panel.module";
import { ProductData } from "@/interfaces/product-data.model";
import LINK from "@/utils/link";

export const PANEL_MUTATIONS: MutationTree<PanelState> = {
  // set user after register/login
  [MUTATIONS.panel.setUser](state, data: CurrentUser): void {
    state.user = data;
    state.user.avatar = `${LINK}images/upload-profile-images/${data.avatar}`;
  },
  // update user info
  [MUTATIONS.panel.updateFullName](state, value: string): void {
    if (state.user) {
      state.user.fullname = value;
    }
  },
  [MUTATIONS.panel.updateAddress](state, value: string): void {
    if (state.user) {
      state.user.address = value;
    }
  },
  [MUTATIONS.panel.updateProvince](state, value: string): void {
    if (state.user) {
      state.user.province = value;
    }
  },
  [MUTATIONS.panel.updateCity](state, value: string): void {
    if (state.user) {
      state.user.city = value;
    }
  },
  [MUTATIONS.panel.updateAvatar](state, value: string): void {
    if (state.user) {
      state.user.avatar = value;
    }
  },
  [MUTATIONS.panel.removeAvatar](state): void {
    if (state.user) {
      state.user.avatar = "default";
    }
  },
  // product
  [MUTATIONS.panel.setProduct](state, data: ProductData): void {
    state.product = data;
  },
  [MUTATIONS.panel.resetProduct](state): void {
    state.product = {
      name: "",
      category: "",
      description: "",
      amount: 0,
      special_sell: 0,
      inventory: 1,
      userOpinions: [],
      img: "",
      images: [],
    };
  },
  // products list
  [MUTATIONS.panel.setProducts](state, data): void {
    state.products = data;
  },
  // invoices
  [MUTATIONS.panel.setInvoices](state, data: any): void {
    state.invoices = data;
  },
  // transactions
  [MUTATIONS.panel.setTransactions](state, data: any): void {
    state.transactions = data;
  },
  // cart
  [MUTATIONS.panel.setCartItems](state, data: any): void {
    state.cart = data;
  },
  [MUTATIONS.panel.addToCart](state, product: any): void {
    state.cart = state.cart?.concat(product);
  },
  // comments
  [MUTATIONS.panel.updateCommentUsername](state, value: string): void {
    state.comment.userName = value;
  },
  [MUTATIONS.panel.updateCommentMessage](state, value: string): void {
    state.comment.message = value;
  },
  [MUTATIONS.panel.resetComment](state): void {
    state.comment = {
      userName: "",
      message: "",
    };
  },
};
