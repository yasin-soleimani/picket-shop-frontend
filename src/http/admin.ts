import API from "@/constants/api";
import { AxiosResponse } from "axios";
import axiosUtil from "@/utils/axios.util";
import { UpdateProfile } from "@/interfaces/update-profile";
// import token from "@/static/JWT";

// interfaces
import { ProductData } from "@/interfaces/product-data.model";
import { CategoryData } from "@/interfaces/category-data.model";

// add category
async function addCategory(data: CategoryData): Promise<AxiosResponse> {
  const url = API.admin.addCategory;
  const TOKEN = localStorage.getItem("picketUser");
  const config = {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  };
  return axiosUtil.post(url, data, config);
}

// update category
async function updateCategory(
  id: string,
  data: CategoryData
): Promise<AxiosResponse> {
  const url = API.admin.updateCategory;
  const ID = id;
  const TOKEN = localStorage.getItem("picketUser");
  const config = {
    params: {
      id: ID,
    },
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  };
  const body = data;
  return axiosUtil.put(url, body, config);
}

// delete category
async function deleteCategory(id: string): Promise<AxiosResponse> {
  const url = API.admin.deleteCategory;
  const ID = id;
  const TOKEN = localStorage.getItem("picketUser");
  const config = {
    params: {
      id: ID,
    },
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  };
  return axiosUtil.delete(url, config);
}

// get products (by ID)
async function getProducts(id: string): Promise<AxiosResponse> {
  const url = API.admin.getProducts;
  const ID = id;
  const TOKEN = localStorage.getItem("picketUser");
  const config = {
    headers: {
      Authorization: `Bearer ${TOKEN}`,

      category: ID,
    },
  };
  return axiosUtil.get(url, config);
}

// add product
async function addProduct(data: ProductData): Promise<AxiosResponse> {
  const url = API.admin.addProduct;
  const TOKEN = localStorage.getItem("picketUser");
  const DATA = data;
  const config = {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  };
  return axiosUtil.post(url, DATA, config);
}

// upload product image
async function uploadProductImage(
  formData: FormData,
  id: string
): Promise<AxiosResponse> {
  const url = API.admin.uploadProductImage;
  const TOKEN = localStorage.getItem("picketUser");
  const FormData = formData;
  const ID = id;
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${TOKEN}`,
      id: ID,
    },
  };
  return axiosUtil.post(url, FormData, config);
}

// upload product image
async function uploadProductDetailImages(
  formData: FormData,
  id: string
): Promise<AxiosResponse> {
  const url = API.admin.uploadProductDetailImages;
  const TOKEN = localStorage.getItem("picketUser");
  const FormData = formData;
  const ID = id;
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${TOKEN}`,
      id: ID,
    },
  };
  return axiosUtil.post(url, FormData, config);
}

// edit product
async function editProduct(payload: {
  id: string;
  data: ProductData;
}): Promise<AxiosResponse> {
  const url = API.admin.editProduct;
  const TOKEN = localStorage.getItem("picketUser");
  const ID = payload.id;
  const DATA = payload.data;
  const config = {
    headers: {
      Authorization: `Bearer ${TOKEN}`,

      id: ID,
    },
  };
  return axiosUtil.put(url, DATA, config);
}

// delete product
async function deleteProduct(id: string): Promise<AxiosResponse> {
  const url = API.admin.deleteProduct;
  const TOKEN = localStorage.getItem("picketUser");
  const ID = id;
  const config = {
    headers: {
      Authorization: `Bearer ${TOKEN}`,

      id: ID,
    },
  };
  return axiosUtil.delete(url, config);
}

// get product details
async function getProductDetails(id: string): Promise<AxiosResponse> {
  const url = API.admin.getProductDetails;
  const TOKEN = localStorage.getItem("picketUser");
  const ID = id;
  const config = {
    headers: {
      Authorization: `Bearer ${TOKEN}`,

      id: ID,
    },
  };
  return axiosUtil.get(url, config);
}

// get all users list
async function getUsersList(): Promise<AxiosResponse> {
  const url = API.admin.getUsersList;
  const TOKEN = localStorage.getItem("picketUser");
  const config = {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  };

  return axiosUtil.get(url, config);
}

// edit user profile (by admin)
async function editUserProfile(
  id: string,
  data: UpdateProfile
): Promise<AxiosResponse> {
  const url = API.admin.editUserProfile;
  const TOKEN = localStorage.getItem("picketUser");
  const ID = id;
  const DATA = data;
  const config = {
    headers: {
      Authorization: `Bearer ${TOKEN}`,

      user: ID,
    },
  };
  return axiosUtil.put(url, DATA, config);
}

// edit user avatar (by admin)
async function editUserAvatar(
  formData: FormData,
  id: string
): Promise<AxiosResponse> {
  const url = API.admin.editUserAvatar;
  const TOKEN = localStorage.getItem("picketUser");
  const FormData = formData;
  const ID = id;
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${TOKEN}`,
      id: ID,
    },
  };
  return axiosUtil.put(url, FormData, config);
}

// user wallet charge
async function chargingTheUserWallet(
  amount: number,
  id: string
): Promise<AxiosResponse> {
  const url = API.admin.chargingTheUserWallet;
  const TOKEN = localStorage.getItem("picketUser");
  const config = {
    headers: {
      Authorization: `Bearer ${TOKEN}`,

      id,
    },
  };
  const body = {
    amount,
  };
  return axiosUtil.put(url, body, config);
}

// get transactions list
async function getTransactionsList(): Promise<AxiosResponse> {
  const url = API.admin.getTransactionsList;
  const TOKEN = localStorage.getItem("picketUser");
  const config = {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  };

  return axiosUtil.get(url, config);
}

// get invoices list
async function getInvoicesList(): Promise<AxiosResponse> {
  const url = API.admin.getInvoicesList;
  const TOKEN = localStorage.getItem("picketUser");
  const config = {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  };

  return axiosUtil.get(url, config);
}

// accept invoice
async function acceptInvoice(id: string): Promise<AxiosResponse> {
  const url = API.admin.acceptInvoice;
  const TOKEN = localStorage.getItem("picketUser");
  const config = {
    headers: {
      Authorization: `Bearer ${TOKEN}`,

      invoice: id,
    },
  };

  return axiosUtil.put(url, {}, config);
}

// end invoice
async function endInvoice(id: string): Promise<AxiosResponse> {
  const url = API.admin.endInvoice;
  const TOKEN = localStorage.getItem("picketUser");
  const config = {
    headers: {
      Authorization: `Bearer ${TOKEN}`,

      invoice: id,
    },
  };

  return axiosUtil.put(url, {}, config);
}

// get all admins list
async function getAdminsList(): Promise<AxiosResponse> {
  const url = API.admin.getAdminsList;
  const TOKEN = localStorage.getItem("picketUser");
  const config = {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  };

  return axiosUtil.get(url, config);
}

export const adminService = {
  // category services
  addCategory,
  updateCategory,
  deleteCategory,

  // product services
  getProducts,
  addProduct,
  uploadProductImage,
  uploadProductDetailImages,
  editProduct,
  deleteProduct,
  getProductDetails,

  // user service
  getUsersList,
  editUserAvatar,
  editUserProfile,
  getTransactionsList,
  chargingTheUserWallet,

  // invoices
  getInvoicesList,
  acceptInvoice,
  endInvoice,

  // admins
  getAdminsList,
};
