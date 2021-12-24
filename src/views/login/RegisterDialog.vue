<template>
  <div class="blog_register">
    <el-dialog custom-class="register_dialog"
               title="注册用户"
               center
               v-model="registerVisible">
      <div class="register_box">
        <!-- 注册表单区域 -->
        <el-form ref="registerFormRef"
                 :model="registerForm"
                 :rules="formRules"
                 :auto-upload="false"
                 label-position="top"
                 label-width="80px"
                 class="rigister_form">
          <!-- 用户名 -->
          <el-form-item prop="username"
                        label="用户名">
            <el-input v-model="registerForm.username"
                      placeholder="请输入用户名"></el-input>
          </el-form-item>
          <!-- 密码 -->
          <el-form-item prop="password"
                        label="密码">
            <el-input v-model="registerForm.password"
                      placeholder="请输入密码"
                      type="password"></el-input>
          </el-form-item>
          <!-- 手机号 -->
          <el-form-item prop="phone"
                        label="手机号">
            <el-input v-model="registerForm.phone"
                      placeholder="请输入手机号"></el-input>
          </el-form-item>
          <!-- 验证码 -->
          <el-form-item prop="verifyCode"
                        label="验证码">
            <el-input v-model="registerForm.verifyCode"
                      placeholder="请输入验证码">
              <template #append>
                <el-button @click="getVerifyCode">
                  获取验证码
                </el-button>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item label="选择本地图片作头像">
            <el-upload class="avatar_uploader"
                       ref="upload"
                       drag
                       action="#"
                       list-type="picture"
                       :limit="1"
                       :before-upload="onBeforeUploadAvatar"
                       :http-request="uploadAvatar"
                       :on-exceed="warnOverLimit"
                       :on-remove="handleRemove"
                       :file-list="registerForm.fileList">
              <el-icon class="el-icon--upload">
                <upload-filled />
              </el-icon>
              <span class="el-upload__text">
                拖拽上传或<em>点击上传</em>
              </span>
            </el-upload>
          </el-form-item>
          <!-- 按钮区域 -->
          <el-form-item class="btns">
            <el-button type="default"
                       @click="registerVisible = false">取消</el-button>
            <el-button type="primary"
                       @click="handleRegister">确定</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// 引入element的icon
import { UploadFilled } from '@element-plus/icons';
import {
  reactive, inject, getCurrentInstance,
} from 'vue';

export default {
  name: 'RegisterDialog',
  props: {
    formRules: {},
  },
  components: {
    UploadFilled,
  },
  setup() {
    const registerVisible = inject('registerVisible');
    const registerForm = reactive({
      username: '',
      password: '',
      phone: '',
      verifyCode: '',
      registerVisible: false,
      fileList: [],
    });
    const { proxy } = getCurrentInstance();
    // 获取手机验证码
    const getVerifyCode = () => {
      // 在表单项中进行手机号校验
      proxy.$refs.registerFormRef.validateField('phone', async (pass) => {
        const phoneValidRes = pass === ''; // 判断是否通过验证
        if (!phoneValidRes) {
          return false;
        }
        const { code } = await proxy.$http.get(`/sms_codes/${registerForm.phone}/`);
        if (code === 400) {
          return false;
        }
        return true;
      });
    };
    const onBeforeUploadAvatar = (file) => {
      const fileType = file.type;
      const isImg = fileType.indexOf('image') !== -1;
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        console.log('图片大小不能超过2MB');
        return Promise.reject();
      }
      if (!isImg) {
        console.log('请选择图片文件');
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
      const { code, errmsg, data } = await proxy.$http.post('/upload/avatar/', form);
      if (code !== 0) {
        console.log(errmsg);
      }
      // 将头像载入临时数组
      proxy.$refs.upload.clearFiles();
      registerForm.fileList.push({ name: file.name, url: data.url });
      return data;
    };
    // 提示图片数量超过1张
    const warnOverLimit = () => {
      console.log('最多上传一张图片');
    };
    // 移除图像
    const handleRemove = (file) => {
      registerForm.fileList.splice(registerForm.fileList.indexOf(file), 1);
    };

    // 注册
    const handleRegister = async () => {
      // const formValidRes = await proxy.$refs.registerFormRef.validate();
      // 注意：validate()方法里面为空时，会返回一个Promise，验证通过返回true，
      // 但是验证不通过会报异常进入默认的catch，无法执行下一行，所以要自定义catch方法，返回验证结果；
      const formValidRes = await proxy.$refs.registerFormRef.validate().catch((err) => err);
      if (formValidRes !== true) { // 不通过校验
        return false;
      }
      const { code, errmsg } = await proxy.$http.post('/register/', {
        username: registerForm.username,
        password: registerForm.password,
        phone: registerForm.phone,
        verifyCode: registerForm.verifyCode,
        avatar: registerForm.fileList[0] || '',
      });
      if (code !== 0) {
        switch (errmsg) {
          case 'params err':
            console.log(1);
            return false;
          default:
            return false;
        }
      }
      console.log('注册成功');
      return true;
    };
    return {
      registerVisible,
      registerForm,
      getVerifyCode,
      uploadAvatar,
      onBeforeUploadAvatar,
      warnOverLimit,
      handleRemove,
      handleRegister,
    };
  },
};
</script>

<style lang="scss" scoped>
.btns {
  text-align: right;
}

// 通过:deep(选择器)对element-plus中的样式进行修改
:deep(.register_dialog) {
  width: 11rem;
  margin-top: 10px;
  .el-dialog__body {
    padding-top: 0px;
    padding-bottom: 10px;
  }
}

.register_box {
  :deep(.el-form) {
    .el-form-item__error {
      left: 50%;
      transform: translateX(-50%);
    }
    .el-form-item:nth-of-type(-n + 4) {
      height: 55px;
    }
    .el-form-item:nth-of-type(-n + 5) {
      .el-form-item__label {
        padding: 0;
      }
    }
    .el-form-item:nth-of-type(4) {
      .el-input-group__append {
        background-color: #fff;
      }
    }
  }
}

:deep(.avatar_uploader) {
  .el-upload {
    width: 100%;
    .el-upload-dragger {
      width: 100%;
      height: 100px;
      .el-icon {
        margin: 20px 0 0 0;
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
