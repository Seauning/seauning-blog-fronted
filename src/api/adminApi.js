import request from '@/utils/axios.js';
// 获取用户信息
export const getUserInfoApi = () => request.post('/user/');

// 更新用户信息
export const updateUserInfoApi = (userInfo) => request.put('/user/', { ...userInfo });
