import { MUTATIONS } from "@/constants/mutations";
import { MutationTree } from "vuex";
import { AuthState } from "./auth.module";

export const AUTH_MUTATIONS: MutationTree<AuthState> = {
  // register form
  [MUTATIONS.auth.updateFullNameRegister](state, value: string): void {
    state.registerData.fullname = value;
  },
  [MUTATIONS.auth.updateMobileRegister](state, value: string): void {
    state.registerData.mobile = value;
  },
  [MUTATIONS.auth.updatePasswordRegister](state, value: string): void {
    state.registerData.password = value;
  },
  // login form
  [MUTATIONS.auth.updateMobileLogin](state, value: string): void {
    state.loginData.mobile = value;
  },
  [MUTATIONS.auth.updatePasswordLogin](state, value: string): void {
    state.loginData.password = value;
  },
};
