import Vue from "vue";
// import token from "@/static/JWT";
import VueRouter, { RouteConfig } from "vue-router";

// pages
import Register from "@/views/Register.vue";
import Login from "@/views/Login.vue";
import Profile from "@/views/Profile.vue";
import Landing from "@/views/Landing.vue";
import Admin from "@/views/Admin.vue";

// profile child-components
import ProfilePersonalInfo from "../components/profile/views/ProfilePersonalInfo.vue";
import ProfileWalletVue from "@/components/profile/views/ProfileWallet.vue";
import ProfilePurchases from "@/components/profile/views/ProfilePurchases.vue";
import ProfileCart from "@/components/profile/views/ProfileCart.vue";

// admin child-components
// |-- category
import AllCategories from "@/components/admin/categories/AllCategories.vue";
import AddCategory from "@/components/admin/categories/AddCategory.vue";
import EditCategory from "@/components/admin/categories/EditCategory.vue";
// |-- product
import AllProducts from "@/components/admin/products/AllProducts.vue";
import AddProduct from "@/components/admin/products/AddProduct.vue";
import EditProduct from "@/components/admin/products/EditProduct.vue";

// users
import UsersList from "@/components/admin/users/UsersList.vue";

// admins
import AdminsList from "@/components/admin/admins/AdminsList.vue";

// transactions
import TransactionsList from "@/components/admin/transactions/TransactionsList.vue";

// invoices
import InvoicesList from "@/components/admin/invoices/InvoicesList.vue";

// products
import ProductsList from "@/views/ProductsList.vue";
import Product from "@/views/Product.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "landing",
    component: Landing,
  },
  // auth
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/register",
    name: "register",
    component: Register,
  },
  // profile
  {
    path: "/profile",
    name: "profile",
    component: Profile,
    children: [
      {
        path: "/profile/personal-info",
        name: "profile-personal-info",
        component: ProfilePersonalInfo,
      },
      {
        path: "/profile/wallet",
        name: "profile-wallet",
        component: ProfileWalletVue,
      },
      {
        path: "/profile/purchases",
        name: "profile-purchases",
        component: ProfilePurchases,
      },
      {
        path: "/profile/cart",
        name: "profile-cart",
        component: ProfileCart,
      },
    ],
  },
  // admin
  {
    path: "/admin",
    name: "admin",
    component: Admin,
    children: [
      // users
      {
        path: "/admin/users",
        name: "admin-all-users",
        component: UsersList,
        children: [
          {
            path: "/admin/users/list",
            name: "admin-users-list",
            component: UsersList,
          },
        ],
      },
      // admins
      {
        path: "/admin/admins",
        name: "admin-all-admins",
        component: AdminsList,
        children: [
          {
            path: "/admin/admins/list",
            name: "admin-admins-list",
            component: AdminsList,
          },
        ],
      },
      // transactions
      {
        path: "/admin/transactions",
        name: "admin-all-transaction",
        component: TransactionsList,
        children: [
          {
            path: "/admin/list/transactions",
            name: "admin-list-transactions",
            component: TransactionsList,
          },
        ],
      },

      // invoices
      {
        path: "/admin/invoices",
        name: "admin-all-invoices",
        component: InvoicesList,
        children: [
          {
            path: "/admin/list/invoices",
            name: "admin-list-invoices",
            component: InvoicesList,
          },
        ],
      },
      // products
      {
        path: "/admin/products",
        name: "admin-all-products",
        component: AllProducts,
        children: [
          {
            path: "/admin/products/add",
            name: "admin-add-product",
            component: AddProduct,
          },
          {
            path: "/admin/products/edit",
            name: "admin-edit-product",
            component: EditProduct,
            props: true,
          },
        ],
      },
      // categories
      {
        path: "/admin/categories",
        name: "admin-all-categories",
        component: AllCategories,
        children: [
          {
            path: "/admin/categories/add",
            name: "admin-add-category",
            component: AddCategory,
          },
          {
            path: "/admin/categories/edit",
            name: "admin-edit-category",
            component: EditCategory,
            props: true,
          },
        ],
      },
    ],
  },
  // products
  {
    name: "product-details",
    path: "/products/:id",
    component: Product,
  },
  {
    name: "parent-products",
    path: "/:parentCategory",
    component: ProductsList,
  },
  {
    name: "child-products",
    path: "/:parentCategory/:childCategory",
    component: ProductsList,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, _, next) => {
  // ---- invalid routes that user can't visit without loggin in ----
  const validRoutes = ["landing", "login", "register"]; // can visit without login

  // just apply on invalid routes
  if (!validRoutes.includes(to.name || "")) {
    const token = localStorage.getItem("picketUser");
    if (token) {
      // continue routing
      next();
    } else {
      // move to login
      next({ name: "login" });
    }
  } else {
    next();
  }
});

export default router;
