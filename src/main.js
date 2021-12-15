import { createApp } from 'vue';

import App from './App.vue';

// 引入router
import router from './router/index';
// 引入vuex
import store from './store/index';
// 引入axios
import axios from './utils/axios';

const app = createApp(App);
app.config.globalProperties.$http = axios;

app.use(router).use(store).mount('#app');
