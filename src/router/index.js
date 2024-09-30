// router.js
import Vue from "vue";
import Router from "vue-router";
import Home from "@/components/TheHome.vue";
import Login from "@/components/TheLogin.vue";

Vue.use(Router);

function isAuthenticated() {
  return !!localStorage.getItem("userToken");
}

const routes = [
  { path: "/", component: Home },
  { path: "/login", component: Login },
];

const router = new Router({
  mode: "history",
  routes,
});

// Global navigation guard
router.beforeEach((to, from, next) => {
  if (to.path !== "/login" && !isAuthenticated()) {
    next("/login");
  } else {
    next();
  }
});

export default router;
