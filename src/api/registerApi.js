import request from '@/utils/axios.js';

export const getSmscodeApi = (phone) => request.get(`/sms_codes/${phone}/`);

export const postUploadAvatarApi = (file) => request.post('/upload/avatar/', file);

export const postRegisterUserApi = (
  username,
  password,
  phone,
  smsVerifyCode,
  avatar,
) => request.post('/register/', {
  username,
  password,
  phone,
  smsVerifyCode,
  avatar,
});
