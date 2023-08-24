const API = {
  auth: {
    register: "/auth/register",
    login: "/auth/login",
  },
  panel: {
    profile: "/panel/profile",
    update: "/panel/update-profile",
    updateAvatar: "/panel/upload-profile-image",
    getProductDetails: "/panel/get-product-detail",
    categories: "/auth/get-categories-list",
    getUserInvoices: "/panel/get-user-invoices",
    getUserTransactions: "/panel/get-user-transactions",
    getProducts: "/panel/get-products-with-category",
    newOpinion: "/panel/add-user-opinions",
    newInvoice: "/panel/add-new-invoice",
  },
  admin: {
    // categories
    addCategory: "/admin/add-categorie",
    updateCategory: "/admin/update-categorie",
    deleteCategory: "/admin/delete-categorie",

    // products
    getProducts: "/admin/products",
    getProductDetails: "/panel/get-product-detail",
    addProduct: "/admin/add-product",
    uploadProductImage: "/admin/upload-product-image",
    uploadProductDetailImages: "/admin/upload-product-detail-images",
    editProduct: "/admin/edit-product",
    deleteProduct: "/admin/delete-product",

    // users
    getUsersList: "/admin/get-users-list",
    editUserProfile: "/admin/edit-user-profile",
    editUserAvatar: "/admin/update-user-avatar-by-admin",
    chargingTheUserWallet: "/admin/charging-the-user-wallet",

    // admins
    getAdminsList: "/admin/get-admins-list",

    // transactions
    getTransactionsList: "/admin/get-transactions-list",

    // invoices
    getInvoicesList: "/admin/get-invoices-list",
    acceptInvoice: "/admin/accept-invoice",
    endInvoice: "/admin/end-invoice",
  },
};

export default API;
