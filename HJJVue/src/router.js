import Vue from "vue";
import Router from "vue-router";
import NoFound from "./views/404";
import Login from "./views/login";

Vue.use(Router);

export default new Router({
  // mode: "history",
  base: process.env.BASE_URL,
  routes: [{
      path: "*",
      name: "/404",
      component: NoFound
    },
    {
      path: "/",
      name: "login",
      component: Login
    },
    {
      path: "/index",
      name: "index",
      component: () => import("@/views/Index.vue")
    },
    {
      path: "/baseKnow",
      name: "基础知识",
      component: () => import("@/views/baseKnow/index.vue")
    },
    {
      path: "/climateBk",
      name: "气候背景",
      component: () => import("@/views/climateBk/index.vue")
    },
    {
      path: "/terms",
      name: "名词术语",
      component: () => import("@/views/baseKnow/terms.vue")
    },
    {
      path: "/standard",
      name: "标准规范",
      component: () => import("@/views/baseKnow/standard.vue")
    },
    {
      path: "/laws",
      name: "法规制度",
      component: () => import("@/views/baseKnow/laws.vue")
    },
    {
      path: "/aboutWea",
      name: "气象百科",
      component: () => import("@/views/baseKnow/aboutWea.vue")
    },
    {
      path: "/equipParam",
      name: "装备参数",
      component: () => import("@/views/equipParam/index.vue")
    },
    {
      path: "/network",
      name: "网络链接",
      component: () => import("@/views/network/index.vue")
    },
    {
      path: "/stationPro",
      name: "数据产品",
      component: () => import("@/views/stationPro/index.vue")
    },
    {
      path: "/peoplePower",
      name: "部队分布",
      component: () => import("@/views/peoplePower/index.vue")
    },
    {
      path: "/equipPower",
      name: "装备实力",
      component: () => import("@/views/equipPower/index.vue")
    },
    {
      path: "/satellite",
      name: "卫星",
      component: () => import("@/views/satellite/index.vue")
    },

    {
      path: "/eqPage",
      name: "装备介绍",
      component: () => import("@/views/equipParam/eqPage.vue")
    },
    {
      path: "/upload",
      name: "装备介绍",
      component: () => import("@/components/upload.vue")
    },
    {
      path: "/targetResult",
      name: "目标成果",
      component: () => import("@/views/targetResult/index.vue")
    },


  ]
});