// interfaces
import { RegisterData } from "@/interfaces/register-data.model";
import { LoginData } from "@/interfaces/login-data.model";

import { Module } from "vuex";
import { RootState } from "..";
import { AUTH_ACTIONS } from "./auth.actions";
import { AUTH_MUTATIONS } from "./auth.mutations";

export interface AuthState {
  registerData: RegisterData;
  loginData: LoginData;
}

const INITIAL_STATE: AuthState = {
  registerData: {
    fullname: "",
    mobile: "",
    password: "",
    role: "user",
  },

  loginData: {
    mobile: "",
    password: "",
  },
};

export const auth: Module<AuthState, RootState> = {
  actions: AUTH_ACTIONS,
  getters: {},
  mutations: AUTH_MUTATIONS,
  state: INITIAL_STATE,
  namespaced: true,
};
