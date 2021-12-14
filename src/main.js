import { createApp } from 'vue';
// 引入elementPlus
import ElementPlus from 'element-plus';
import App from './App.vue';

// 引入router
import router from './router/index';
// 引入vuex
import store from './store/index';
// 引入axios
import axios from './utils/axios';

// 引入elementPlus样式
import 'element-plus/dist/index.css';

const app = createApp(App);
app.config.globalProperties.$http = axios;

app.use(router).use(store).use(ElementPlus).mount('#app');
