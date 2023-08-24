import "@fortawesome/fontawesome-free/css/all.css";
import Vue from "vue";
import Vuetify from "vuetify/lib/framework";

Vue.use(Vuetify);

export default new Vuetify({
  icons: {
    iconfont: "fa",
  },
  theme: {
    themes: {
      light: {
        primary: "#2b3467",
        secondary: "#f76177",
        accent: "#bad7e9",
        background: "#f6f6f6",
        "header-bg": "#fafafa",
        "footer-bg": "#f2f2f2",
        "auth-form-bg": "#cae4f4",
        "category-card-bg": "#bbdaf7",
        "carousel-card-title": "#000000",
        "carousel-card-bg": "#ffffff",
        "carousel-bg": "eeeeee",
        "categories-container-bg": "#fafafa",
        "landing-pros-bg": "#eeeeee",
      },
      dark: {
        primary: "#696969",
        secondary: "#f76177",
        background: "#303030",
        "header-bg": "#1c1c1c",
        "footer-bg": "#1c1c1c",
        "auth-form-bg": "#0c0c0c",
        "category-card-bg": "#000000",
        "carousel-card-title": "#aaaaaa",
        "carousel-card-bg": "#202020",
        "carousel-bg": "#1c1c1c",
        "categories-container-bg": "#2c2c2c",
        "landing-pros-bg": "#1c1c1c",
      },
    },
  },
  breakpoint: {
    mobileBreakpoint: 600,
  },
});
