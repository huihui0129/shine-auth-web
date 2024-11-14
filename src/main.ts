import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import "@/assets/css/global.css";

const app = createApp(App);


// 全局错误处理
app.config.errorHandler = (err: any, vm, info) => {
  // 你可以在这里记录错误或显示友好的错误信息给用户
  console.error(`Error: ${err.message}`);
  console.error(`Info: ${info}`);
  // 可以将错误信息发送到后台监控系统，或者直接忽略某些错误
};

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title as string;
  }
  next();
});

app.use(store);
app.use(ElementPlus);
app.use(router);
app.mount('#app');
