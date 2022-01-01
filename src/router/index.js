import { createRouter, createWebHashHistory } from 'vue-router';

// 路由懒加载
// 将 import 组件 from '路径'替换成如下格式
const blogHome = () => import('@/views/home/BlogHome.vue');
const loginFrame = () => import('@/views/login/BlogLogin.vue');
const musicFrame = () => import('@/views/music/BlogMusic.vue');
const blogDetail = () => import('@/views/BlogDetail.vue');
const blogAdmin = () => import('@/views/admin/BlogAdmin.vue');
const myDetail = () => import('@/views/admin/MyDetail.vue');
const blogList = () => import('@/views/admin/BlogList.vue');
const blogEdit = () => import('@/views/admin/BlogEdit.vue');
const myDraft = () => import('@/views/admin/MyDraft.vue');
const NotFound = () => import('@/components/NotFound.vue');

const routes = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/login',
    name: 'Login',
    component: loginFrame,
  },
  {
    path: '/home',
    name: 'Home',
    component: blogHome,
  },
  {
    path: '/music',
    name: 'Music',
    component: musicFrame,
  },
  {
    path: '/blog',
    name: 'Blog',
    component: blogDetail,
  },
  {
    path: '/admin', // 以/开头的嵌套路径将被认为是根路径
    component: blogAdmin,
    name: 'Admin',
    redirect: '/admin/me',
    children: [
      {
        path: 'me', name: 'Me', component: myDetail,
      },
      {
        path: 'blogs', name: 'Blogs', component: blogList,
      },
      {
        path: 'edit', name: 'Edit', component: blogEdit,
      },
      {
        path: 'draft', name: 'Draft', component: myDraft,
      },
    ],
  },
  {
    path: '/:catchAll(.*)', // Vue3需要使用这种方式来匹配所有路由
    name: '404',
    component: NotFound,
  },

];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

// 前置守卫判断用户访问的页面
router.beforeEach((to, from, next) => {
  if (to.path.startsWith('/admin')) {
    const token = window.sessionStorage.getItem('token');
    if (!token) { // 如果用户没有登录则跳转至登录页面
      return next('/login');
    }
  }
  return next();
});

export default router;
