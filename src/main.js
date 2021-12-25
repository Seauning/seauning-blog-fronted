import { createApp } from 'vue';
// 引入lodash
import App from './App.vue';

// 引入router
import router from './router/index';
// 引入vuex
import store from './store/index';
// 引入util中的Message
import { Message } from './utils/tool';
// 引入axios
// import axios from './utils/axios'; // 将axios请求全部封装在相应的组件中
// app.config.globalProperties.$http = axios;
// 引入normalize.css重置浏览器样式
import '@/assets/css/normalize.css';
// 引入全局样式
import '@/assets/css/global.css';
// 引入字体图标
import '@/assets/fonts/iconfont.css';
// 引入animate.css
import 'animate.css';

const app = createApp(App);
app.config.globalProperties.Message = Message;

app.use(router).use(store).mount('#app');
