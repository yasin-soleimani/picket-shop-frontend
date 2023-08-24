import Vue from "vue";
import Vuex from "vuex";
import { AppState, app } from "./App/app.module";
import { AuthState, auth } from "./auth/auth.module";
import { PanelState, panel } from "./panel/panel.module";
import { AdminState, admin } from "./admin/admin.module";
export interface RootState {
  app: AppState;
  auth: AuthState;
  panel: PanelState;
  admin: AdminState;
}

Vue.use(Vuex);

export default new Vuex.Store<RootState>({
  modules: { app, auth, panel, admin },
});
