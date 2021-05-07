import Vue from "vue";
import Router from "vue-router";
import Layout from "@/layout/index";

Vue.use(Router);
// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};

export default new Router({
  routes: [
    {
      path: "/",
      redirect: "/submit",
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
          path: "history",
          component: () => import("@/views/history")
        }
      ]
    }
  ]
});
