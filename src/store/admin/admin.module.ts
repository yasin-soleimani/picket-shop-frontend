import { Module } from "vuex";
import { RootState } from "..";
import { ADMIN_ACTIONS } from "./admin.actions";
import { ADMIN_MUTATIONS } from "./admin.mutations";
import { ProductData } from "@/interfaces/product-data.model";
import { CategoryData } from "@/interfaces/category-data.model";
import { AmountWalletCharge } from "../../interfaces/amountWalletCharge";
import { UpdateProfile } from "@/interfaces/update-profile";

export interface AdminState {
  adminProducts: any[];
  productData: ProductData;
  categoryData: CategoryData;
  usersList: any;
  adminsList: [];
  amountWalletCharge: AmountWalletCharge;
  transactionsList: any;
  invoicesList: any;
  userProfile: UpdateProfile;
  createdProductId: any;
}

const INITIAL_STATE: AdminState = {
  adminProducts: [],
  productData: {
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
  createdProductId: null,
  categoryData: {
    title: "",
    parentPath: "/",
    parent: null,
  },
  userProfile: {
    fullname: "",
    address: "",
    province: "",
    city: "",
    avatar: "",
  },
  amountWalletCharge: {
    amount: 0,
  },
  usersList: [],
  adminsList: [],
  invoicesList: [],
  transactionsList: [],
};

export const admin: Module<AdminState, RootState> = {
  actions: ADMIN_ACTIONS,
  getters: {},
  mutations: ADMIN_MUTATIONS,
  state: INITIAL_STATE,
  namespaced: true,
};
