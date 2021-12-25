import { ElMessage, ElLoading } from 'element-plus';

export const Message = (options) => ElMessage({
  // showClose: true, // element-plus的关闭按钮有问题
  ...options,
  duration: 2000,
});

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

export const fuc = () => { };
