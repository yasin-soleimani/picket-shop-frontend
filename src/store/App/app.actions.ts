import { MUTATIONS } from "@/constants/mutations";
import { ActionTree } from "vuex";
import store, { RootState } from "..";
import { AppState } from "./app.module";

export const APP_ACTIONS: ActionTree<AppState, RootState> = {
  switchTheme(context, { theme, component }): void {
    context.commit(MUTATIONS.app.switchTheme, theme);

    // current theme
    const currentTheme = store.state.app.theme;

    // change vuetify theme mode
    component.$vuetify.theme.dark = currentTheme === "dark";

    // save changes on localstorage
    localStorage.setItem(
      "picketConfig",
      JSON.stringify({ theme: currentTheme })
    );
  },
};
