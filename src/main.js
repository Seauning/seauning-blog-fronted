import { createApp } from 'vue';

import App from './App.vue';

// 引入router
import router from './router/index';
// 引入vuex
import store from './store/index';
// 引入axios
import axios from './utils/axios';
// 引入normalize.css重置浏览器样式
import '@/assets/css/normalize.css';
// 引入daapate.css重置浏览器样式，实现rem
import '@/assets/css/adapate.css';
// 引入字体图标
import '@/assets/fonts/iconfont.css';

const app = createApp(App);
app.config.globalProperties.$http = axios;

app.use(router).use(store).mount('#app');
