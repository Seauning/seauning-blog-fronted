import request from '@/utils/axios.js';

export function getAllArticlesApi() {
  const data = request({
    method: 'get',
    url: '/articles/',
  });
  return data;
}

export const aa = () => { };
