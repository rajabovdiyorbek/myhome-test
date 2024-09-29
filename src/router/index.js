// router.js
import Vue from "vue";
import Router from "vue-router";
import Home from "@/components/TheHome.vue";
import Login from "@/components/TheLogin.vue";

Vue.use(Router);

const routes = [
  { path: "/", component: Home },
  { path: "/login", component: Login },
];

const router = new Router({
  mode: "history",
  routes,
});

export default router;
