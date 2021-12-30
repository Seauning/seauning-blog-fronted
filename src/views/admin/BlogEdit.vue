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
        <el-form-item prop="title"
                      class="blog_state">
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
                     :theme="theme"></md-editor>
        </el-form-item>
        <div class="cl">
          <el-form-item prop="type"
                        class="blog_type">
            <el-select v-model="editForm.type"
                       placeholder="分类">
              <el-option label="学习日志"
                         value="learnLog"></el-option>
              <el-option label="生活"
                         value="life"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="tag"
                        class="blog_tag">
            <el-select v-model="editForm.tag"
                       placeholder="标签">
              <el-option label="Vue"
                         value="vue"></el-option>
              <el-option label="Js"
                         value="javascript"></el-option>
            </el-select>
          </el-form-item>
        </div>
        <el-form-item>
          <el-upload ref="uploadRef"
                     class="upload"
                     action="#"
                     list-type="picture-card"
                     :auto-upload="false"
                     :http-request="uploadBackgroundImg"
                     :before-upload="onBeforeUploadAvatar">
            <template #default>
              <el-icon>
                <plus />
              </el-icon>
            </template>
            <template #file="{ file }">
              <div>
                <img class="el-upload-list__item-thumbnail"
                     :src="file.url"
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
                        @click="handleRemove(file)">
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
import { reactive, ref } from 'vue';
import { Message } from '@/utils/tool.js';
import AdminMain from '@/components/layout/AdminMain.vue';
import { postUploadBackgroungImgApi } from '@/api/adminApi.js';

export default {
  name: 'BlogEdit',
  props: ['id'],
  components: {
    MdEditor, AdminMain, Plus, Delete,
  },
  setup() {
    // const { id } = toRefs(props);
    // 编辑表单的实例
    const editFormRef = ref(null);
    // 编辑表单的内容
    const editForm = reactive({
      title: '',
      state: '',
      text: '',
    });
    const uploadRef = ref(null);
    const fileInstance = ref(null);
    const formRules = {
      title: [
        {
          required: true, message: '标题不能为空', trigger: 'blur',
        },
        {
          min: 2, message: '标题长度不小于2个字', trigger: 'blur',
        },
      ],
    };
    const theme = 'light';
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
    // 暂存博客
    const handleSave = () => {

    };
    // 发布博客
    const handlePublish = () => {
      uploadRef.value.submit();
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
    // 上传首页图片(当我们调用upload.submit方法时会调用绑定在http-request上的函数，及自定义上传)
    const uploadBackgroundImg = async (params) => {
      // 1.图片处理
      const { file } = params;
      // 2.图片上传
      const form = new FormData();
      form.append('file', file);
      const { code, data, msg } = await postUploadBackgroungImgApi(form);
      if (code !== 0) {
        return Message({
          message: msg,
          type: 'error',
        });
      }
      console.log(data);
      // 将头像载入临时url
      fileInstance.value = file;
      return Message({
        message: '添加成功',
        type: 'success',
      });
    };
    const handleRemove = (file) => {
      console.log(fileInstance.value);
      if (fileInstance.value === file) { fileInstance.value = null; }
    };
    return {
      formRules,
      editForm,
      theme,
      menuItems,
      editFormRef,
      uploadRef,
      handleSave,
      handlePublish,
      handleRemove,
      onBeforeUploadAvatar,
      uploadBackgroundImg,
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
  padding: 0 20px;
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
