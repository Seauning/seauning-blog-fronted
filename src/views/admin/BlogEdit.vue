<template>
  <div class="blog_edit">
    <admin-main :menuItems="menuItems">
      <el-form :model="editForm"
               ref="editFormRef"
               :rules="formRules"
               class="blog_form">
        <el-form-item prop="title"
                      class="blog_title">
          <el-input v-model="editForm.title"
                    placeholder="请输入标题"></el-input>
        </el-form-item>
        <el-form-item class="blog_state">
          <el-select v-model="editForm.state"
                     placeholder="原创">
            <el-option label="原创"
                       value="byself"></el-option>
            <el-option label="转载"
                       value="byother"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <md-editor v-model="editForm.text"
                     :theme="theme"
                     :showCodeRowNumber="true"
                     @onSave="handleSave"
                     @onHtmlChanged="handleSaveHtml"
                     @onUploadImg="handleuUploadArticleImg"></md-editor>
        </el-form-item>
        <div class="cl">
          <el-form-item prop="type"
                        class="blog_type">
            <el-select v-model="editForm.type"
                       placeholder="分类">
              <el-option v-for="(item, index) in types"
                         :label="item.value"
                         :value="item.name"
                         :key="index">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="tag"
                        class="blog_tag">
            <el-select v-model="editForm.tag"
                       placeholder="标签">
              <el-option v-for="(item, index) in tags"
                         :label="item.value"
                         :value="item.name"
                         :key="index">
              </el-option>
            </el-select>
          </el-form-item>
        </div>
        <el-form-item>
          <el-upload ref="uploadRef"
                     class="upload"
                     action="#"
                     :auto-upload="true"
                     list-type="picture-card"
                     :file-list="filelist"
                     :http-request="uploadBackgroundImg"
                     :before-upload="onBeforeUploadAvatar">
            <template #default>
              <el-icon>
                <plus />
              </el-icon>
            </template>
            <template #file="{ file:cfile }">
              <div>
                <img class="el-upload-list__item-thumbnail"
                     :src="cfile.url"
                     alt="" />
                <span class="el-upload-list__item-actions">
                  <!-- 放大功能后续完善 -->
                  <!--
                  <span class="el-upload-list__item-preview"
                        @click="handlePictureCardPreview(file)">
                    <el-icon>
                      <zoom-in />
                    </el-icon>
                  </span> -->
                  <span class="el-upload-list__item-delete"
                        @click="handleRemove(cfile)">
                    <el-icon>
                      <delete />
                    </el-icon>
                  </span>
                </span>
              </div>
            </template>
          </el-upload>
        </el-form-item>
        <el-form-item style="width:100%;text-align:center;">
          <el-button type="primary"
                     @click="handleSave">保存</el-button>
          <el-button type="success"
                     @click="handlePublish">发布</el-button>
        </el-form-item>
      </el-form>
    </admin-main>
  </div>
</template>

<script>
import MdEditor from 'md-editor-v3';
import { Plus, Delete } from '@element-plus/icons';
import 'md-editor-v3/lib/style.css';
import {
  inject, onUnmounted, reactive, ref,
} from 'vue';
import { Message, getArticles } from '@/utils/tool.js';
import AdminMain from '@/components/layout/AdminMain.vue';
import {
  postUploadBackgroungImgApi, postArticleApi, updateArticleApi, postUploadArticleImgApi,
} from '@/api/adminApi.js';

export default {
  name: 'BlogEdit',
  components: {
    MdEditor, AdminMain, Plus, Delete,
  },
  setup() {
    // markdown主题
    const theme = ref('light');
    // 有可能是一个空对象，我们并不能直接对他parse，需要做处理
    const article = JSON.parse(window.sessionStorage.getItem('editArticle')) || {};
    // 编辑表单的实例
    const editFormRef = ref(null);
    // 初始值
    const initFormValue = {
      title: '',
      state: 'byself',
      text: '',
      type: 'learnlog',
      tag: '',
      url: '',
    };
    // 编辑表单的内容
    let editForm = reactive({
      title: article.title || initFormValue.title,
      state: article.state || initFormValue.state,
      text: article.text || initFormValue.text,
      type: article.type ? article.type.name : initFormValue.type,
      tag: article.tag ? article.tag[0].name : initFormValue.tag,
      url: article.url || initFormValue.url,
    });
    const uploadRef = ref(null);
    // 临时图像列表
    const filelist = ref([]);
    if (article.bgPath || article.url) { // 编辑数据时将当前的url插入
      filelist.value.push({ url: article.bgPath || article.url });
    }
    // tags和types
    const tags = inject('tags');
    const types = inject('types');
    const formRules = {
      title: [
        {
          required: true, message: '标题不能为空', trigger: 'blur',
        },
        {
          min: 2, message: '标题长度不小于2个字', trigger: 'blur',
        },
      ],
      text: [
        {
          min: 1, message: '您还未编写任何内容', trigger: 'blur',
        },
      ],
    };
    // 头部面包屑菜单
    const menuItems = [
      {
        id: 0,
        name: '博客管理',
        path: '/admin/edit',
      },
      [
        {
          id: 1,
          name: '发布博客',
        },
      ],
    ];
    // 暂存博客(目前只是保存在localStorage中)笑哭这样的存储方式所有用户都能访问，哈哈哈哈后面在写
    const handleSave = () => {
      const articles = JSON.parse(window.localStorage.getItem('draftArticles') || '[]');
      articles.push(editForm);
      window.localStorage.setItem('draftArticles', JSON.stringify(articles));
      Message({
        message: '保存成功',
        type: 'success',
      });
    };
    // 上传首页图片
    const uploadBackgroundImg = async (params) => {
      // 图片上传
      const form = new FormData();
      const { file } = params;
      form.append('file', file);
      const { code, data, msg } = await postUploadBackgroungImgApi(form);
      if (code !== 0) {
        Message({
          message: msg,
        });
        return;
      }
      // 将头像载入临时url
      filelist.value.push({ name: file.name, url: data.url });
      editForm.url = data.url;
    };
    // 上传文章里的图片
    const handleuUploadArticleImg = async (files, cb) => {
      const res = await Promise.all(
        Array.from(files).map((file) => new Promise((resolve, reject) => {
          const form = new FormData();
          form.append('file', file);
          postUploadArticleImgApi(form).then((resp) => resolve(resp))
            .catch((error) => reject(error));
        })),
      );
      console.log(res);
      cb(res.map((item) => item.data.url));
    };
    // 保存html
    const handleSaveHtml = (html) => {
      console.log(html);
    };
    // iterators/generators require regenerator-runtime, which is too heavyweight for this guide t
    // o allow them. Separately, loops should be avoided in favor of array iterations
    // 情况编辑表单
    const clearEditForm = () => {
      // 需要通过forEach的方式来遍历
      Object.keys(initFormValue).forEach((key) => {
        editForm[key] = initFormValue[key];
      });
      editForm = initFormValue;
      uploadRef.value.clearFiles();
    };
    // 发布博客
    const handlePublish = async () => {
      // 校验内容
      const result = editFormRef.value.validate().catch((err) => err);
      if (!result) {
        return false;
      }
      if (filelist.value.length > 1) return Message({ message: '只允许上传一张图片' });
      // 上传博客内容
      if (JSON.stringify(article) === '{}' || !('id' in article)) { // 表明当前是发布博客
        const { code, msg } = await postArticleApi(editForm);
        if (code !== 0) {
          return Message({
            message: msg,
            type: 'error',
          });
        }
        Message({
          message: '发布成功',
          type: 'success',
        });
      } else { // 表明当前是修改文章
        const { id: aid } = article;
        const { code, msg } = await updateArticleApi(editForm, aid);
        if (code !== 0) {
          return Message({
            message: msg,
            type: 'error',
          });
        }
        Message({
          message: '修改成功',
          type: 'success',
        });
      }
      // 清空内容(还原初值)
      clearEditForm();
      getArticles();
      return true;
    };
    // 图像上传前的校验
    const onBeforeUploadAvatar = (file) => {
      const fileType = file.type;
      const isImg = fileType.indexOf('image') !== -1; // 判断是否是图像
      const isLt2M = file.size / 1024 / 1024 < 4;
      if (!isLt2M) {
        Message({
          message: '图片大小不能超过4MB',
          type: 'warning',
        });
        return Promise.reject();
      }
      if (!isImg) {
        Message({
          message: '请选择图片文件',
          type: 'warning',
        });
        return Promise.reject();
      }
      return isImg && isLt2M;
    };
    // 移除文件
    const handleRemove = (file) => {
      filelist.value.splice(filelist.value.indexOf(file), 1);
    };
    // 卸载时清除编辑文章
    onUnmounted(() => {
      window.sessionStorage.removeItem('editArticle');
    });
    return {
      tags,
      types,
      formRules,
      editForm,
      theme,
      menuItems,
      editFormRef,
      uploadRef,
      filelist,
      handleSave,
      handlePublish,
      handleRemove,
      onBeforeUploadAvatar,
      uploadBackgroundImg,
      handleuUploadArticleImg,
      handleSaveHtml,
    };
  },
};
</script>

<style lang="scss" scoped>
.upload {
  .el-upload-list__item {
    > div {
      width: 100%;
      height: 100%;
    }
    .el-upload-list__item-thumbnail {
      width: 100%;
      height: 100%;
    }
  }
}
.blog_edit {
  .blog_form {
    .blog_title {
      float: left;
      margin-right: 10px;
      width: 79%;
    }
    .blog_state {
      width: 20%;
    }
    .blog_type {
      float: left;
      margin-right: 50px;
    }
    .blog_tag {
      float: left;
    }
  }
}
</style>
