import { Module } from "vuex";
import { RootState } from "..";
import { APP_ACTIONS } from "./app.actions";
import { APP_MUTATIONS } from "./app.mutations";

export interface AppState {
  loading: boolean;
  pageLoading: boolean;
  theme: string;
  snackbarShow: boolean;
  snackbarText: string;
  snackbarStatus: number;
}

const INITIAL_STATE: AppState = {
  loading: false,
  pageLoading: true,
  theme: "light",
  snackbarShow: false,
  snackbarText: "",
  snackbarStatus: 400,
};

export const app: Module<AppState, RootState> = {
  actions: APP_ACTIONS,
  getters: {},
  mutations: APP_MUTATIONS,
  state: INITIAL_STATE,
  namespaced: true,
};
