import API from "@/constants/api";
import { AxiosResponse } from "axios";
import axiosUtil from "@/utils/axios.util";

// interfaces
import { RegisterData } from "@/interfaces/register-data.model";
import { LoginData } from "@/interfaces/login-data.model";

// register
async function register(data: RegisterData): Promise<AxiosResponse> {
  const url = API.auth.register;
  return new Promise((resolve, reject) => {
    axiosUtil
      .post(url, data)
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

// login
async function login(data: LoginData): Promise<AxiosResponse> {
  const url = API.auth.login;
  const body = data;
  return axiosUtil.post(url, body);
}

export const authService = {
  register,
  login,
};
