import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./router/index";

import "./assets/styles/main.sass";

new Vue({
  store,
  router: router,
  render: (h) => h(App),
}).$mount("#app");
