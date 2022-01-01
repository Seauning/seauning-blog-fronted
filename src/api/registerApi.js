import request from '@/utils/axios.js';

export const getSmscodeApi = (phone) => request({
  method: 'get',
  url: `/sms_codes/${phone}/`,
});

export const postUploadAvatarApi = (file) => request({
  method: 'post',
  url: '/upload/avatar/',
  data: file,
});

export const postRegisterUserApi = (
  username,
  password,
  phone,
  smsVerifyCode,
  avatar,
) => request({
  method: 'post',
  url: '/register/',
  data: {
    username,
    password,
    phone,
    smsVerifyCode,
    avatar,
  },
});
