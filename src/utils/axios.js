/* eslint-disable implicit-arrow-linebreak */
import Axios from 'axios';
import { Message } from './tool';
// import store from '@/store';

const baseURL = 'http://localhost:8082/api';
const request = Axios.create({
  baseURL,
  timeout: 5000, // 请求超时 5s
});

// 以下axio拦截器需要学习!!!
// 前置拦截器（发起请求之前的拦截）
request.interceptors.request.use(
  (config) => {
    /**
     * 根据你的项目实际情况来对 config 做处理
     * 这里对 config 不做任何处理，直接返回
     */
    config.headers.Authorization = `Bearer ${window.sessionStorage.getItem('token')}`;
    // if (store.getters.GET_TOKEN) config.headers['User-Token'] = store.GET_TOKEN();
    return config;
  },
  (error) => Promise.reject(error),
);

// 后置拦截器（获取到响应时的拦截）
request.interceptors.response.use(
  (response) => {
    /**
       * 根据项目实际情况来对 response 和 error 做处理
       */
    const { data } = response;
    // if (code)
    // console.log(data);
    return Promise.resolve(data);
  },
  (error) => {
    if (error.response && error.response.data) {
      const code = error.response.status; // 响应状态码如404,400等
      const msg = error.response.data.message; // 错误信息
      Message({
        message: `Code: ${code}, Message: ${msg}`,
        type: 'error',
      });
    } else {
      Message({
        message: `${error}`,
        type: 'error',
      });
    }
    return Promise.reject(error);
  },
);

export default request;
