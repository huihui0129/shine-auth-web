import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router';
import Login from "@/views/user/login/index.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      title: "登录",
    }
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
