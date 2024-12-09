import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router';
import Login from "@/views/user/login/index.vue";
import Authorize from "@/views/oauth/authorize";

const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      title: "登录",
    },
  },
  {
    path: '/oauth/authorize',
    name: 'authorize',
    component: Authorize,
    meta: {
      title: "授权",
    },
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
