import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import "@/assets/css/global.css";

const app = createApp(App);

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
