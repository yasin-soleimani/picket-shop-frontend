// import token from "@/static/JWT";
import API from "@/constants/api";
import { AxiosResponse } from "axios";
import axiosUtil from "@/utils/axios.util";
import { CommentData } from "@/interfaces/comment-data.model";

// interfaces
import { UpdateProfile } from "@/interfaces/update-profile";

// get profile
async function getProfile(): Promise<AxiosResponse> {
  const url = API.panel.profile;
  const TOKEN = localStorage.getItem("picketUser");
  return axiosUtil.get(url, {
    headers: {
      "Content-type": "Application/json",
      Authorization: `Bearer ${TOKEN}`,
    },
  });
}

// update user profile
async function updateProfile(
  profileData: UpdateProfile
): Promise<AxiosResponse> {
  const url = API.panel.update;
  const TOKEN = localStorage.getItem("picketUser");
  const data = {
    fullname: profileData.fullname,
    province: profileData.province,
    city: profileData.city,
    address: profileData.address,
    avatar: profileData.avatar,
  };
  const config = {
    headers: {
      "Content-type": "Application/json",
      Authorization: `Bearer ${TOKEN}`,
    },
  };
  return axiosUtil.put(url, data, config);
}

// update user avatar
async function updateAvatar(formData: FormData): Promise<AxiosResponse> {
  const url = API.panel.updateAvatar;
  const TOKEN = localStorage.getItem("picketUser");
  const FormData = formData;
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${TOKEN}`,
    },
  };
  return axiosUtil.post(url, FormData, config);
}

// get product
async function getProductDetails(id: string): Promise<AxiosResponse> {
  const url = API.panel.getProductDetails;
  const TOKEN = localStorage.getItem("picketUser");
  const ID = id;
  return axiosUtil.get(url, {
    headers: {
      "Content-type": "Application/json",
      Authorization: `Bearer ${TOKEN}`,
      id: ID,
    },
  });
}

// getProducts list
async function getProducts(id: string): Promise<AxiosResponse> {
  const url = API.panel.getProducts;
  const TOKEN = localStorage.getItem("picketUser");
  const ID = id;
  return axiosUtil.get(url, {
    headers: {
      "Content-type": "Application/json",
      Authorization: `Bearer ${TOKEN}`,
      category: ID,
    },
  });
}

// get categories list
async function getCategories(): Promise<AxiosResponse> {
  const url = API.panel.categories;
  return axiosUtil.get(url);
}

// get user invoices
async function getInvoices(): Promise<AxiosResponse> {
  const url = API.panel.getUserInvoices;
  const TOKEN = localStorage.getItem("picketUser");
  return axiosUtil.get(url, {
    headers: {
      "Content-type": "Application/json",
      Authorization: `Bearer ${TOKEN}`,
    },
  });
}

// get user transactions
async function getTransactions(): Promise<AxiosResponse> {
  const url = API.panel.getUserTransactions;
  const TOKEN = localStorage.getItem("picketUser");
  return axiosUtil.get(url, {
    headers: {
      "Content-type": "Application/json",
      Authorization: `Bearer ${TOKEN}`,
    },
  });
}

// new opinion
async function addUserOpinion(
  id: string,
  data: CommentData
): Promise<AxiosResponse> {
  const url = API.panel.newOpinion;
  const TOKEN = localStorage.getItem("picketUser");
  const DATA = data;
  const config = {
    headers: {
      "Content-type": "Application/json",
      Authorization: `Bearer ${TOKEN}`,
      product: id,
    },
  };
  return axiosUtil.post(url, DATA, config);
}

// add new invoice
async function addNewInvoice(data: any): Promise<AxiosResponse> {
  const url = API.panel.newInvoice;
  const TOKEN = localStorage.getItem("picketUser");
  const DATA = data;
  const config = {
    headers: {
      "Content-type": "Application/json",
      Authorization: `Bearer ${TOKEN}`,
    },
  };
  return axiosUtil.post(url, DATA, config);
}

export const panelService = {
  getProfile,
  updateAvatar,
  updateProfile,
  getProductDetails,
  getProducts,
  getCategories,
  getInvoices,
  getTransactions,
  addUserOpinion,
  addNewInvoice,
};
