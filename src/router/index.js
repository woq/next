import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Index",
    component: () => import("../views/Login.vue"),
  },
  {
    path: "/home",
    name: "Home",
    component: () => import("../views/Home.vue"),
  },
  {
    path: "/about",
    name: "About",
    component: () => import("../views/About.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login.vue"),
  },
  {
    path: "/status",
    name: "Status",
    component: () => import("../views/Status.vue"),
  },
  {
    path: "/addlog",
    name: "addLog",
    component: () => import("../views/addLog.vue"),
  },
  {
    path: "/gflog",
    name: "gfLog",
    component: () => import("../views/gfLog.vue"),
  },
  {
    path: "/expiredlog",
    name: "expiredLog",
    component: () => import("../views/expiredLog.vue"),
  },
  {
    path: "/weekunioninfo",
    name: "weekunioninfo",
    component: () => import("../views/weekUnionInfo.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (localStorage.getItem("access") != null) {
    next();
  } else {
    if ((to.path === "/login") | (to.path === "/")) {
      next();
    } else {
      next("/login");
    }
  }
});

export default router;
