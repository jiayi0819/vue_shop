import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../components/Login.vue";
import Home from "../components/Home.vue";

Vue.use(VueRouter);

const routes = [];

const router = new VueRouter({
  routes: [
    {
      path: "/",
      redirect: "/login",
    },
    {
      path: "/login",
      component: Login,
    },
    {
      path: "/home",
      component: Home,
    },
  ],
});

// ROUTER SAFETY GUARD
router.beforeEach((to, from, next) => {
  // 1. PATH TO GO
  // 2. FROM WHICH PATH
  // 3. NEXT LET GO / FORCED PATH

  if (to.path === "/login") return next();

  // GET TOKEN
  const tokenStr = window.sessionStorage.getItem("token");
  if (!tokenStr) return next("/login");
  next();
});

export default router;
