import { createRouter, createWebHashHistory } from 'vue-router';

// 路由懒加载
// 将 import 组件 from '路径'替换成如下格式

const routes = [];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
