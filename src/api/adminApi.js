import request from '@/utils/axios.js';
// 获取用户信息
export const getUserInfoApi = () => request({
  method: 'post',
  url: '/user/',
});

// 更新用户信息
export const updateUserInfoApi = (userInfo) => request({
  method: 'put',
  url: '/user/',
  data: {
    ...userInfo,
  },
});

// 上传背景图片
export const postUploadBackgroungImgApi = (file) => request({
  method: 'post',
  url: '/bgImg/',
  data: file,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

// 上传文章图片
export const postUploadArticleImgApi = (file) => request({
  method: 'post',
  url: '/articleImg/',
  data: file,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

// 上传博客
export const postArticleApi = (article) => request({
  method: 'post',
  url: '/articles/',
  data: article,
});

// 获取标签列表数据
export const getTagTypesApi = () => request({
  method: 'get',
  url: '/tagsAtypes/',
});

// 获取博客文章信息
export const getArticlesUserApi = () => request({
  method: 'get',
  url: '/articlesSu/',
});

// 修改文章
export const updateArticleApi = (params, aid) => request({
  method: 'put',
  url: `/articles/${aid}/`,
  data: params,
});

// 删除文章
export const deleteArticleApi = (aid) => request({
  method: 'delete',
  url: `/articles/${aid}/`,
});

export function logoutApi() {
  return request({
    method: 'delete',
    url: '/logout/',
  });
}
