<template>
  <div class="my_detail">
    <admin-main :menuItems="menuItems">
      <el-form :inline="true"
               :model="userInfo"
               :rules="formRules"
               @submit.prevent
               class="user_info">
        <el-form-item label="用户名"
                      prop="username">
          <el-input v-model="userInfo.username"
                    :placeholder="userInfo.username"></el-input>
        </el-form-item>
        <el-form-item label="手机号"
                      prop="mobile">
          <el-input v-model="userInfo.mobile"></el-input>
        </el-form-item>
        <el-form-item label="邮箱"
                      prop="email">
          <el-input v-model="userInfo.email"></el-input>
        </el-form-item>
        <el-form-item style="width: 94%">
          <el-upload class="avatar_uploader"
                     ref="uploadRef"
                     drag
                     action="#"
                     list-type="picture"
                     :limit="1"
                     :before-upload="onBeforeUploadAvatar"
                     :http-request="uploadAvatar"
                     :on-exceed="warnOverLimit"
                     :on-remove="handleRemove"
                     :file-list="filelist">
            <el-icon class="el-icon--upload">
              <upload-filled />
            </el-icon>
            <span class="el-upload__text">
              拖拽上传或<em>点击上传</em>
            </span>
          </el-upload>
        </el-form-item>
        <el-form-item style="width:100%;text-align:center;">
          <el-button type="primary"
                     @click="handleUpdate"
                     native-type="submit">立即修改</el-button>
        </el-form-item>
      </el-form>
    </admin-main>
  </div>
</template>

<script>
import { UploadFilled } from '@element-plus/icons';
import {
  getCurrentInstance, ref, inject,
} from 'vue';
import { postUploadAvatarApi } from '@/api/registerApi.js';
import { updateUserInfoApi } from '@/api/adminApi.js';

export default {
  name: 'MyDetail',
  components: {
    UploadFilled,
  },
  setup() {
    const { proxy } = getCurrentInstance(); // 当前实例
    // 定义上传器的ref实例
    const uploadRef = ref(null);
    // 定义filelist的动态数组
    const filelist = ref([]);
    // 头部面包屑菜单
    const menuItems = [
      {
        id: 0,
        name: '信息管理',
        path: '/admin/me',
      },
      [
        {
          id: 1,
          name: '个人信息',
        },
      ],
    ];
    const checkMobile = (rule, value, callback) => {
      if (!(/^1[3456789]\d{9}$/.test(value))) {
        return callback(new Error('请输入正确格式'));
      }
      return true;
    };
    const checkEmail = (rule, value, callback) => {
      const regx = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
      if (!value.match(regx)) {
        return callback(new Error('请输入正确格式'));
      }
      return true;
    };
    const formRules = {
      username: [
        {
          required: true, message: '用户名为必填项', trigger: 'blur',
        },
      ],
      oldpassword: [
        {
          required: true, message: '密码为必填项', trigger: 'blur',
        },
      ],
      mobile: [
        {
          required: true, message: '手机号为必填项', trigger: 'blur',
        },
        {
          validator: checkMobile, trigger: 'blur',
        },
      ],
      email: [
        {
          validator: checkEmail, trigger: 'blur',
        },
      ],
    };
    const userInfo = inject('userinfo');
    // 头像上传前的校验
    const onBeforeUploadAvatar = (file) => {
      const fileType = file.type;
      const isImg = fileType.indexOf('image') !== -1; // 判断是否是图像
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        proxy.Message({
          message: '图片大小不能超过2MB',
          type: 'warning',
        });
        return Promise.reject();
      }
      if (!isImg) {
        proxy.Message({
          message: '请选择图片文件',
          type: 'warning',
        });
        return Promise.reject();
      }
      return isImg && isLt2M;
    };
    // 自定义上传头像
    const uploadAvatar = async (params) => {
      // 1.图片处理
      const { file } = params;
      // 2.图片上传
      const form = new FormData();
      form.append('file', file);
      const { code, data, msg } = await postUploadAvatarApi(form);
      if (code !== 0) {
        return proxy.Message({
          message: msg,
          type: 'error',
        });
      }
      // 将头像载入临时数组
      filelist.value.push({ name: file.name, url: data.url });
      return proxy.Message({
        message: msg,
        type: 'success',
      });
    };
    // 提示图片数量超过1张
    const warnOverLimit = () => proxy.Message({
      message: '最多上传一张图片',
      type: 'warning',
    });
    // 移除图像
    const handleRemove = (file) => {
      filelist.value.splice(filelist.value.indexOf(file), 1);
    };
    // 修改用户信息
    const handleUpdate = async () => {
      const avatarUrl = filelist.value[0] ? filelist.value[0].url : null;
      const { code, msg } = await updateUserInfoApi({ ...userInfo, avatarUrl });
      if (code !== 0) {
        return proxy.Message({
          message: msg,
          type: 'error',
        });
      }
      userInfo.avatar = avatarUrl || userInfo.avatar;
      window.sessionStorage.setItem('user', JSON.stringify(userInfo));
      return proxy.Message({
        message: '修改成功',
        type: 'success',
      });
    };
    return {
      formRules,
      menuItems,
      userInfo,
      uploadRef,
      filelist,
      uploadAvatar,
      onBeforeUploadAvatar,
      warnOverLimit,
      handleRemove,
      handleUpdate,
    };
  },
};
</script>

<style lang="scss" scoped>
.user_info {
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
  .el-form-item {
    width: 45%;
  }
}

:deep(.avatar_uploader) {
  .el-upload {
    width: 100%;
    .el-upload-dragger {
      width: 100%;
      height: 200px;
      .el-icon--upload {
        margin: 75px 0 0 0;
        color: skyblue;
        vertical-align: bottom;
        font-size: 54px;
      }
    }
  }
  .el-upload-list__item {
    height: 70px;
    .el-upload-list__item-name {
      line-height: 50px;
    }
    .el-upload-list__item-thumbnail {
      width: 50px;
      height: 50px;
    }
  }
}
</style>
