import { createApp } from 'vue';
// 引入lodash
import App from './App.vue';

// 引入router
import router from './router/index';
// 引入vuex
import store from './store/index';
// 引入axios
import axios from './utils/axios';
// 引入normalize.css重置浏览器样式
import '@/assets/css/normalize.css';
// 引入全局样式
import '@/assets/css/global.css';
// 引入字体图标
import '@/assets/fonts/iconfont.css';
// 引入animate.css
import 'animate.css';

// 注册全局的组件BlogRecord(博客备案)
// import BlogRecord from '@/components/layout/BlogRecord.vue';
// import MyPagination from '@/components/MyPagination.vue';

const app = createApp(App);

app.config.globalProperties.$http = axios;
// app.component(BlogRecord.name, BlogRecord);
// app.component(MyPagination.name, MyPagination);

app.use(router).use(store).mount('#app');
