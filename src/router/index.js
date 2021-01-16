/*
 * @Author: your name
 * @Date: 2020-11-13 09:53:39
 * @LastEditTime: 2020-11-21 21:07:19
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \teste:\Vue\Test\admin-test\src\router\index.js
 */

import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

const router = new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      redirect: "/dashboard"
    },
    {
      path: "/",
      component: () => import("../views/Home"),
      children: [
        {
          path: "/dynamicForm",
          name: "dynamicForm",
          meta: { title: "动态表单" },
          component: () =>
            import(/* webpackChunkName: "about" */ "../views/DynamicForm.vue")
        },
        {
          path: "/dashboard",
          name: "Dashboard",
          meta: { title: "仪表盘" },
          component: () =>
            import(/* webpackChunkName: "about" */ "../views/Dashboard.vue")
        },
        {
          path: "/detail",
          name: "Detail",
          meta: { title: "详情" },
          component: () =>
            import(/* webpackChunkName: "about" */ "../views/Detail.vue")
        },
        {
          path: "/table",
          name: "Table",
          meta: { title: "表格" },
          component: () =>
            import(/* webpackChunkName: "about" */ "../views/Table.vue")
        }
      ]
    }
  ]
});

export default router;
