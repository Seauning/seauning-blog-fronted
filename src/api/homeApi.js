import request from '@/utils/axios.js';

export function getAllArticlesApi() {
  const data = request({
    method: 'get',
    url: '/articles/',
  });
  return data;
}

export function getCurrentArticleApi(id) {
  return request({
    method: 'get',
    url: `/article/${id}`,
  });
}

export function updateViewsApi(aid, views) {
  return request({
    method: 'post',
    url: '/article/',
    data: { id: aid, views },
  });
}
