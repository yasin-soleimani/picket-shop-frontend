import { Module } from "vuex";
import { RootState } from "..";
import { PANEL_ACTIONS } from "./panel.actions";
import { PANEL_MUTATIONS } from "./panel.mutation";
import { CurrentUser } from "@/interfaces/current-user.module";
import { ProductData } from "@/interfaces/product-data.model";
import { CommentData } from "@/interfaces/comment-data.model";

export interface PanelState {
  user: CurrentUser | null;
  categories: string[];
  product: ProductData;
  products: any[];
  invoices: any;
  transactions: any;
  comment: CommentData;
  cart: any[];
}

const INITIAL_PANEL: PanelState = {
  user: null,
  categories: [],
  product: {
    name: "",
    img: "",
    images: [],
    inventory: 1,
    category: "",
    amount: 0,
    userOpinions: [],
    special_sell: 0,
    description: "",
  },
  products: [],
  invoices: [],
  transactions: [],
  comment: {
    userName: "",
    message: "",
  },
  cart: [],
};

export const panel: Module<PanelState, RootState> = {
  actions: PANEL_ACTIONS,
  getters: {},
  mutations: PANEL_MUTATIONS,
  state: INITIAL_PANEL,
  namespaced: true,
};
