import { MUTATIONS } from "@/constants/mutations";
import { MutationTree } from "vuex";
import { AdminState } from "./admin.module";
import { ProductData } from "@/interfaces/product-data.model";
import LINK from "@/utils/link";

export const ADMIN_MUTATIONS: MutationTree<AdminState> = {
  // product
  [MUTATIONS.admin.setProduct](state, data: ProductData): void {
    state.productData = data;
    if (data.img !== "") {
      state.productData.img = `${LINK}images/upload-product-images/${data.img}`;
    }
  },
  [MUTATIONS.admin.setProducts](state, data: any): void {
    state.adminProducts = data;
  },
  [MUTATIONS.admin.editProduct](state, payload): void {
    const identifiedProductIndex = state.adminProducts.findIndex(
      (prod) => prod.id === payload.id
    );
    if (identifiedProductIndex > -1) {
      state.adminProducts[identifiedProductIndex] = payload.data;
    }
  },
  [MUTATIONS.admin.deleteProduct](state, id: string): void {
    // find index
    const identifiedProductIndex = state.adminProducts.findIndex(
      (prod) => prod.id === id
    );

    // delete the product from products' list by index
    if (identifiedProductIndex > -1) {
      state.adminProducts.splice(identifiedProductIndex, 1);
    }
  },
  [MUTATIONS.admin.updateProductName](state, value: string): void {
    state.productData.name = value;
  },
  [MUTATIONS.admin.updateProductCategory](state, value: string): void {
    state.productData.category = value;
  },
  [MUTATIONS.admin.updateProductAmount](state, value: number): void {
    state.productData.amount = value;
  },
  [MUTATIONS.admin.updateProductSpecialSell](state, value: number): void {
    state.productData.special_sell = value;
  },
  [MUTATIONS.admin.updateProductInventory](state, value: number): void {
    state.productData.inventory = value;
  },
  [MUTATIONS.admin.updateProductDescription](state, value: string): void {
    state.productData.description = value;
  },
  [MUTATIONS.admin.updateProductImage](state, value: string): void {
    state.productData.img = value;
  },
  [MUTATIONS.admin.resetProductData](state): void {
    state.productData = {
      name: "",
      img: "",
      images: [],
      inventory: 1,
      category: "",
      amount: 0,
      userOpinions: [],
      special_sell: 0,
      description: "",
    };
  },
  // category
  [MUTATIONS.admin.updateCategoryTitle](state, value: string): void {
    state.categoryData.title = value;
  },
  [MUTATIONS.admin.updateCategoryParent](state, value: string | null): void {
    state.categoryData.parent = value;
  },
  [MUTATIONS.admin.updateCategoryParentPath](state, value: string): void {
    state.categoryData.parentPath = value;
  },
  [MUTATIONS.admin.resetCategoryData](state): void {
    state.categoryData = {
      title: "",
      parentPath: "/",
      parent: null,
    };
  },
  // user
  [MUTATIONS.admin.setUsersList](state, data): void {
    state.usersList = data;
  },
  [MUTATIONS.admin.setUserProfile](state, value): void {
    state.userProfile = value;
  },
  [MUTATIONS.admin.setUserFullname](state, value): void {
    state.userProfile.fullname = value;
  },
  [MUTATIONS.admin.setUserAddress](state, value): void {
    state.userProfile.address = value;
  },
  [MUTATIONS.admin.setUserProvince](state, value): void {
    state.userProfile.province = value;
  },
  [MUTATIONS.admin.setUserCity](state, value): void {
    state.userProfile.city = value;
  },
  [MUTATIONS.admin.setUserAvatar](state, value): void {
    state.userProfile.avatar = value;
  },
  // set amount wallet user charge
  [MUTATIONS.admin.setAmountWalletCharge](state, value: number): void {
    state.amountWalletCharge.amount = value;
  },
  [MUTATIONS.admin.removeUserAvatar](state): void {
    state.userProfile.avatar = "";
  },
  // admins
  [MUTATIONS.admin.setAdminsList](state, data): void {
    state.adminsList = data;
  },
  // invoices
  [MUTATIONS.admin.setInvoicesList](state, data): void {
    state.invoicesList = data;
  },
};
