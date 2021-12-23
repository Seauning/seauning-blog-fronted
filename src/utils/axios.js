/* eslint-disable implicit-arrow-linebreak */
import Axios from 'axios';
import { ElMessage } from 'element-plus';

const baseURL = 'http://localhost:8082';

const axios = Axios.create({
  baseURL,
  timeout: 5000, // 请求超时 5s
});

// 以下axio拦截器需要学习!!!
// 前置拦截器（发起请求之前的拦截）
axios.interceptors.request.use(
  (config) =>
    /**
     * 根据你的项目实际情况来对 config 做处理
     * 这里对 config 不做任何处理，直接返回
     */
    config,
  (error) => Promise.reject(error),
);

// 后置拦截器（获取到响应时的拦截）
axios.interceptors.response.use(
  (response) => {
    /**
       * 根据你的项目实际情况来对 response 和 error 做处理
       * 这里解构出响应的数据直接返回
       */
    const { data } = response;
    // console.log(data);
    return Promise.resolve(data);
  },
  (error) => {
    if (error.response && error.response.data) {
      const code = error.response.status; // 响应状态码如404,400等
      const msg = error.response.data.message; // 错误信息
      ElMessage.error(`Code: ${code}, Message: ${msg}`);
      // console.error('[Axios Error]', error.response);
    } else {
      ElMessage.error(`${error}`);
    }
    return Promise.reject(error);
  },
);

export default axios;
