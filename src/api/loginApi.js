import request from '@/utils/axios.js';

export const getUsernameCountApi = (username) => request({
  method: 'get',
  url: `/usernames/${username}/count/`,
});

export const getPhoneCountApi = (phone) => request({
  method: 'get',
  url: `/phones/${phone}/count/`,
});

// 二进制流数组转为base64类型
function arrayBufferToBase64(buffer) {
  let binary = '';
  const bytes = new Uint8Array(buffer);
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
}

// 获取图像验证码
export const getImgCodeApi = async (uuid) => {
  const data = await request({
    method: 'get',
    url: `/img_codes/${uuid}/`,
    responseType: 'arraybuffer',
  });
  return `data:image/jpeg;base64,${arrayBufferToBase64(data)}`;
};

// 登录用户校验
export const postCheckUserApi = (params) => request({
  method: 'post',
  url: '/login/',
  data: {
    ...params,
  },
});
