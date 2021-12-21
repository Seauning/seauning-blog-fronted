import { createRouter, createWebHashHistory } from 'vue-router';

// 路由懒加载
// 将 import 组件 from '路径'替换成如下格式
const blogHome = () => import('@/views/home/BlogHome.vue');
const loginFrame = () => import('@/views/login/BlogLogin.vue');
const musicFrame = () => import('@/views/music/BlogMusic.vue');

const routes = [
  { path: '/', redirect: '/home' },
  { path: '/home', name: 'Home', component: blogHome },
  { path: '/login', name: 'Login', component: loginFrame },
  { path: '/music', name: 'Music', component: musicFrame },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
