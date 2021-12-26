<template>
  <div class="blog_register">
    <el-dialog custom-class="register_dialog"
               title="注册用户"
               top="10vh"
               center
               v-model="registerVisible"
               @close="closeRegisterDialog">
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
          <el-form-item prop="regusername"
                        label="用户名">
            <el-input v-model="registerForm.regusername"
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
          <el-form-item prop="smsVerifyCode"
                        label="验证码">
            <el-input v-model="registerForm.smsVerifyCode"
                      placeholder="请输入验证码">
              <template #append>
                <el-button @click="getsmsVerifyCode"
                           :disabled="isDisabled">
                  <span class="verify_text"
                        v-if="restTime === 0">获取验证码</span>
                  <span class="verify_time"
                        v-else>剩余{{restTime}}秒
                    <el-icon class="is-loading">
                      <loading />
                    </el-icon>
                  </span>
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
                       @click="closeRegisterDialog">取消</el-button>
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
import { UploadFilled, Loading } from '@element-plus/icons';
import {
  reactive, getCurrentInstance, ref, inject, onUnmounted,
} from 'vue';
import { getSmscodeApi, postUploadAvatarApi, postRegisterUserApi } from '@/api/registerApi.js';

export default {
  name: 'RegisterDialog',
  props: {
    formRules: {},
  },
  components: {
    UploadFilled,
    Loading,
  },
  setup() {
    // 因为我们不希望在子组件中修改注册表单，所以需要在父组件传入一个change方法用于改变注册表单的显示状态
    const registerVisible = inject('registerVisible');
    const changeRegisterVisible = inject('changeRegisterVisible'); // 更改注册会话显示状态的方法
    let timer = null; // 计时器
    const restTime = ref(0); // 计时器中的时间
    const isDisabled = ref(false); // 发送短信按钮是否禁用
    const { proxy } = getCurrentInstance(); // 当前实例
    const registerForm = reactive({
      regregusername: '',
      password: '',
      phone: '',
      smsVerifyCode: '',
      fileList: [],
    });
    // 计时器
    const startInterval = () => {
      clearInterval(timer); // 先清一遍除计时器
      isDisabled.value = true; // 禁用按钮
      restTime.value = 30; // 初始化时间
      timer = setInterval(() => { // 开启计时器
        restTime.value -= 1;
        if (restTime.value === 0) {
          clearInterval(timer); // 到时间后清除计时器
          isDisabled.value = false;
        }
      }, 1000);
    };
    // 获取手机验证码
    const getsmsVerifyCode = () => {
      // 在表单项中进行手机号校验
      proxy.$refs.registerFormRef.validateField('phone', async (pass) => {
        const phoneValidRes = pass === ''; // 判断是否通过验证
        if (!phoneValidRes) {
          return false;
        }
        const { code, msg } = await getSmscodeApi(registerForm.phone);
        if (code !== 0) {
          const type = code === 400 ? 'warning' : 'error';
          return proxy.Message({
            message: msg,
            type,
          });
        }
        // 当验证码发送成功后开启倒计时
        startInterval();
        return proxy.Message({
          message: msg,
          type: 'success',
        });
      });
    };
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
      proxy.$refs.upload.clearFiles();
      registerForm.fileList.push({ name: file.name, url: data.url });
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
      const { code, msg } = await postRegisterUserApi(
        registerForm.regusername,
        registerForm.password,
        registerForm.phone,
        registerForm.smsVerifyCode,
        registerForm.fileList[0] || '',
      );
      if (code !== 0) {
        const type = code === 400 ? 'warning' : 'error';
        return proxy.Message({
          message: msg,
          type,
        });
      }
      return proxy.Message({
        message: msg,
        type: 'success',
      });
    };
    // 关闭注册对话框
    const closeRegisterDialog = () => {
      changeRegisterVisible(false);
      proxy.$refs.registerFormRef.resetFields();
    };
    // 需要在组件销毁的时候关闭所有计时器
    onUnmounted(() => clearInterval(timer));
    return {
      isDisabled,
      restTime,
      registerForm,
      registerVisible,
      getsmsVerifyCode,
      uploadAvatar,
      onBeforeUploadAvatar,
      warnOverLimit,
      handleRemove,
      handleRegister,
      closeRegisterDialog,
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
        width: 73px;
        height: 38px;
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
      .el-icon--upload {
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
