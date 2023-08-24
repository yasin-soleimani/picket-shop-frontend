export const MUTATIONS = {
  app: {
    switchTheme: "switchTheme",
    showSnackbar: "showSnackbar",
  },
  auth: {
    // register
    updateFullNameRegister: "updateFullNameRegister",
    updateMobileRegister: "updateMobileRegister",
    updatePasswordRegister: "updatePasswordRegister",
    // login
    updateMobileLogin: "updateMobileLogin",
    updatePasswordLogin: "updatePasswordLogin",
  },
  panel: {
    setUser: "setUser",
    updateFullName: "updateFullName",
    updateAddress: "updateAddress",
    updateProvince: "updateProvince",
    updateCity: "updateCity",
    updateAvatar: "updateAvatar",
    removeAvatar: "removeAvatar",
    setProduct: "setProduct",
    resetProduct: "resetProduct",
    setInvoices: "setInvoices",
    setTransactions: "setTransactions",
    setCartItems: "setCartItems",
    addToCart: "addToCart",
    setProducts: "setProducts",
    updateCommentUsername: "updateCommentUsername",
    updateCommentMessage: "updateCommentMessage",
    resetComment: "resetComment",
  },
  admin: {
    // products
    setProduct: "setProduct",
    setProducts: "setProducts",
    editProduct: "editProduct",
    deleteProduct: "deleteProduct",
    updateProductName: "updateProductName",
    updateProductCategory: "updateProductCategory",
    updateProductAmount: "updateProductAmount",
    updateProductSpecialSell: "updateProductSpecialSell",
    updateProductInventory: "updateProductInventory",
    updateProductDescription: "updateProductDescription",
    updateProductImage: "updateProductImage",
    resetProductData: "resetProductData",
    // category
    updateCategoryTitle: "updateCategoryTitle",
    updateCategoryParent: "updateCategoryParent",
    updateCategoryParentPath: "updateCategoryParentPath",
    resetCategoryData: "resetCategoryData",
    // user
    setUsersList: "setUsersList",
    setUserProfile: "setUserProfile",
    setUserFullname: "setUserFullname",
    setUserAddress: "setUserAddress",
    setUserProvince: "setUserProvince",
    setUserCity: "setUserCity",
    setUserAvatar: "setUserAvatar",
    removeUserAvatar: "removeUserAvatar",
    setAmountWalletCharge: "setAmountWalletCharge",
    // admins
    setAdminsList: "setAdminsList",
    // invoices
    setInvoicesList: "setInvoicesList",
  },
};
