import { get } from 'lodash';
import request from '@/utils/axios.js';
// 获取用户信息
export const getUserInfoApi = () => request.post('/user/');

// 更新用户信息
export const updateUserInfoApi = (userInfo) => request.put('/user/', { ...userInfo });

// 上传背景图片
export const postUploadBackgroungImgApi = (file) => request.post('/bgImg/', file);

// 上传博客
export const postArticleApi = (article) => request.post('/articles/', article);

// 获取标签列表数据
export const getTagTypesApi = () => request.get('/tagsAtypes/');

// 获取博客文章信息
export const getArticlesUserApi = () => request({
  methods: get,
  url: '/articlesSu/',
});

// 修改文章
export const updateArticleApi = (params, aid) => request.put(`/articles/${aid}/`, params);

// 删除文章
export const deleteArticleApi = (aid) => request.delete(`/articles/${aid}/`);
