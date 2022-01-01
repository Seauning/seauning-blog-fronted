import { ElMessage, ElLoading } from 'element-plus';
import { v4 } from 'uuid';
import { getArticlesUserApi } from '@/api/adminApi.js';

// 更改消息组件参数
export const Message = (options) => ElMessage({
  // showClose: true, // element-plus的关闭按钮有问题
  ...options,
  duration: 1500,
});

// 更改Loading组件的参数
export const Loading = (options) => {
  const newOptions = {
    fullscreen: 'fullscreen' in options ? options.fullscreen : false,
    lock: 'lock' in options ? options.lock : false,
  };
  return ElLoading.service({
    ...newOptions,
    text: '拼命加载中',
    spinner: 'el-icon-loading',
    background: 'rgba(0, 0, 0, 0.7)',
  });
};

// 获取uuid
export const getUUID = () => v4();

export const myFormateDate = (time) => {
  function formatFunc(str) {
    return str > 9 ? str : `0${str}`;
  }
  const date2 = new Date(time);
  const year = date2.getFullYear();
  const mon = formatFunc(date2.getMonth() + 1);
  const day = formatFunc(date2.getDate());
  let hour = date2.getHours();
  // const noon = hour >= 12 ? 'PM' : 'AM'; // 判断是上午还是下午
  hour = hour >= 12 ? hour - 12 : hour; // 12小时制
  hour = formatFunc(hour);
  const min = formatFunc(date2.getMinutes());
  const sec = formatFunc(date2.getSeconds());
  const dateStr = `${year}-${mon}-${day} ${hour}:${min}:${sec}`;
  return dateStr;
};

export const getArticles = async () => {
  const { code, msg, data } = await getArticlesUserApi();
  if (code !== 0) {
    Message({
      message: msg,
      type: 'error',
    });
    return;
  }
  window.sessionStorage.setItem('articles', JSON.stringify(data));
};
