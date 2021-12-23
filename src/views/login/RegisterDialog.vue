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
          <el-form-item prop="emVerifyCode"
                        label="验证码">
            <el-input v-model="registerForm.emVerifyCode"
                      placeholder="请输入验证码">
              <template #append>
                <el-button>
                  获取验证码
                </el-button>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item label="选择本地图片作头像">
            <el-upload class="avatar_uploader"
                       drag
                       action="http://localhost:8081"
                       list-type="picture"
                       :limit="1"
                       :on-preview="handlePreview"
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
  reactive, inject, toRefs, getCurrentInstance,
} from 'vue';

export default {
  name: 'RegisterDialog',
  props: {
    formRules: {},
  },
  components: {
    UploadFilled,
  },
  setup(props) {
    const registerVisible = inject('registerVisible');
    const registerForm = reactive({
      username: '',
      password: '',
      phone: '',
      emVerifyCode: '',
      registerVisible: false,
      fileList: [
        {
          name: 'food.jpeg',
          url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
        },
        {
          name: 'food2.jpeg',
          url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
        },
      ],
    });
    const { formRules } = toRefs(props);
    const { proxy } = getCurrentInstance();
    const checkUserCount = async (rule, value, callback) => {
      const { data: res } = await proxy.$http.get(`/usernames/${value}/count/`);
      if (res.code === 0) {
        if (res.count !== 0) {
          return callback(new Error('用户名已被注册'));
        }
      } else {
        return callback(new Error('服务器响应错误'));
      }
      return true;
    };
    formRules.value.username.push({
      validator: checkUserCount,
      trigger: 'blur',
    });
    // ctx.emit('update:formRules', formRules);

    // 获取图形验证码
    const getVerifyCode = () => {
      console.log(1);
    };
    return {
      registerVisible,
      registerForm,
      getVerifyCode,
    };
  },
  methods: {
    // 头像上传成功
    handleAvatarSuccess(res, file, fileList) {
      fileList.push({
        name: file.name,
        url: file.url,
      });
      console.log(fileList);
    },
    // 提示图片数量超过1张
    warnOverLimit() {
      console.log('最多上传一张图片');
    },
    // 移除图像
    handleRemove() {
      this.registerForm.fileList.pop();
    },
    // 点击已上传图片
    handlePreview(file) {
      console.log(file);
    },
    // 注册
    handleRegister() {
      this.$refs.registerFormRef.validate((pass) => {
        if (!pass) {
          return false;
        }
        return true;
      });
    },
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
