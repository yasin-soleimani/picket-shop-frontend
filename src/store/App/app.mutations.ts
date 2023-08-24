import { MUTATIONS } from "@/constants/mutations";
import { MutationTree } from "vuex";
import { AppState } from "./app.module";

export const APP_MUTATIONS: MutationTree<AppState> = {
  [MUTATIONS.app.switchTheme](state, theme): void {
    if (theme) {
      state.theme = theme;
    } else {
      if (state.theme === "light") {
        state.theme = "dark";
      } else {
        state.theme = "light";
      }
    }
  },
  [MUTATIONS.app.showSnackbar](state, data): void {
    // set snackbar
    state.snackbarShow = true;
    state.snackbarText = data.message;
    state.snackbarStatus = data.status;

    // hide snackbar
    setTimeout(function () {
      state.snackbarShow = false;
    }, 3000);
  },
};
