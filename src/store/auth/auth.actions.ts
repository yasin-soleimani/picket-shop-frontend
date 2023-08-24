import { ActionTree } from "vuex";
import { AuthState } from "./auth.module";
import { MUTATIONS } from "@/constants/mutations";
import store, { RootState } from "..";
import { authService } from "@/http/auth";
import { panelService } from "@/http/panel";
import router from "@/router";

export const AUTH_ACTIONS: ActionTree<AuthState, RootState> = {
  // register
  updateFullNameRegister(context, value: string): void {
    context.commit(MUTATIONS.auth.updateFullNameRegister, value);
  },
  updateMobileRegister(context, value: string): void {
    context.commit(MUTATIONS.auth.updateMobileRegister, value);
  },
  updatePasswordRegister(context, value: string): void {
    context.commit(MUTATIONS.auth.updatePasswordRegister, value);
  },
  userRegister(context): void {
    // start loading
    context.rootState.app.loading = true;
    context.rootState.app.loading = true;

    // user data coming from register from
    const userData = context.state.registerData;

    // user registering process
    authService
      .register(userData)
      .then((res) => {
        // set snackbar
        const { status } = res.data;
        store.commit("app/showSnackbar", {
          message: "درحال ایجاد حساب کاربری...",
          status,
        });

        const userLoginData = {
          mobile: context.state.registerData.mobile,
          password: context.state.registerData.password,
        };

        // auto login process: after user register, it will be login to the site automatically
        authService
          .login(userLoginData)
          .then((res) => {
            const token = res.data.data.token;

            // set token on local storage
            localStorage.setItem("picketUser", token);

            // get user profile
            panelService
              .getProfile()
              .then((res) => {
                // set user profile info
                store.commit("panel/setUser", res.data.data);

                // move to landing page
                setTimeout(function () {
                  router.push({ name: "landing" });
                }, 1000);
              })
              .catch((error) => {
                // set snackbar
                store.commit("app/showSnackbar", error.response.data);
              });

            // set snackbar
            store.commit("app/showSnackbar", res.data);

            // stop loading
            context.rootState.app.loading = false;
          })
          .catch((error) => {
            // set snackbar
            store.commit("app/showSnackbar", error.response.data);

            // stop loading
            context.rootState.app.loading = false;
          });

        // stop loading
        context.rootState.app.loading = false;
      })
      .catch((error) => {
        // set snackbar
        store.commit("app/showSnackbar", error.response.data);

        // stop loading
        context.rootState.app.loading = false;
      });
  },
  // login
  updateMobileLogin(context, value: string): void {
    context.commit(MUTATIONS.auth.updateMobileLogin, value);
  },
  updatePasswordLogin(context, value: string): void {
    context.commit(MUTATIONS.auth.updatePasswordLogin, value);
  },
  userLogin(context): void {
    // start loading
    context.rootState.app.loading = true;

    // user data coming from login form
    const userData = context.state.loginData;

    authService
      .login(userData)
      .then((res) => {
        const token = res.data.data.token;

        // set token on local storage
        localStorage.setItem("picketUser", token);

        // get user profile
        panelService
          .getProfile()
          .then((res) => {
            // set user profile info
            store.commit("panel/setUser", res.data.data);

            // move to landing page
            setTimeout(function () {
              router.push({ name: "landing" });
            }, 1000);
          })
          .catch((error) => {
            // set snackbar
            store.commit("app/showSnackbar", error.response.data);
          });

        // set snackbar
        store.commit("app/showSnackbar", res.data);

        // stop loading
        context.rootState.app.loading = false;
      })
      .catch((error) => {
        // set snackbar
        store.commit("app/showSnackbar", error.response.data);

        // stop loading
        context.rootState.app.loading = false;
      });
  },
  // logout
  userLogout(context) {
    const currentPage = router.app.$route.name;

    // move to landing page
    if (currentPage !== "landing") router.push({ name: "landing" });

    // remove token from localStorage
    localStorage.removeItem("picketUser");

    // reset user data
    context.rootState.panel.user = null;

    // show snackbar
    store.commit("app/showSnackbar", {
      status: 200,
      message: "خروج از حساب کاربری با موفقیت انجام شد",
    });
  },
};
