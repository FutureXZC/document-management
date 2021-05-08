import Vue from "vue";
import Router from "vue-router";
import Layout from "@/layout/index";
import VueRouter from "vue-router";

Vue.use(Router);
// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};

const router = new VueRouter({
  // mode: "history"
});

let vm = new Vue();
router.beforeEach((to, from, next) => {
  if (to.path !== "/login" && !window.sessionStorage.getItem("token")) {
    return next("/login");
  }
  next();
});

export default new Router({
  routes: [
    {
      path: "/login",
      component: () => import("@/views/login"),
      hidden: true
    },
    {
      path: "/register",
      component: () => import("@/views/register"),
      hidden: true
    },
    {
      path: "/",
      redirect: "/login",
      component: Layout,
      children: [
        {
          path: "submit",
          component: () => import("@/views/submit")
        },
        {
          path: "publish",
          component: () => import("@/views/publish")
        },
        {
          path: "submitHistory",
          component: () => import("@/views/submitHistory")
        },
        {
          path: "publishHistory",
          component: () => import("@/views/publishHistory")
        }
      ]
    }
  ]
});
