<template>
  <div class="main">
    <div class="blog_login animate__animated animate__bounceInUp">
      <div class="logo_box">
        <img src="../assets/imgs/avatar.jpg"
             alt="头像">
      </div>
      <div class="login_box">
        <!-- 登录表单区域 -->
        <el-form ref="loginFormRef"
                 :model="loginForm"
                 :rules="formRules"
                 label-width="0px"
                 class="login_form">
          <!-- 用户名 -->
          <el-form-item prop="username">
            <el-input v-model="loginForm.username"
                      placeholder="请输入用户名"
                      prefix-icon="el-icon"></el-input>
            <span class="icon_wrap">
              <svg class="icon iconfont"
                   aria-hidden="true">
                <use xlink:href="#icon-17"></use>
              </svg>
            </span>
          </el-form-item>
          <!-- 密码 -->
          <el-form-item prop="password">
            <el-input v-model="loginForm.password"
                      placeholder="请输入密码"
                      prefix-icon="el-icon"
                      type="password"></el-input>
            <span class="icon_wrap">
              <svg class="icon iconfont"
                   aria-hidden="true">
                <use xlink:href="#icon-ziyuan"></use>
              </svg>
            </span>
          </el-form-item>
          <el-form-item prop="verifyCode">
            <span class="icon_wrap">
              <svg class="icon iconfont"
                   aria-hidden="true">
                <use xlink:href="#icon-yanzhengma"></use>
              </svg>
            </span>
            <el-input v-model="loginForm.verifyCode"
                      placeholder="请输入验证码"
                      prefix-icon="el-icon"
                      style="width: 50%"></el-input>
            <img src="../assets/imgs/valid.png"
                 @click="getVerifyCode()"
                 style="float: right;cursor:pointer;" />
          </el-form-item>
          <!-- 按钮区域 -->
          <el-form-item class="btns">
            <el-button type="success"
                       @click="registerForm.registerVisible = true">注册</el-button>
            <el-button type="primary"
                       @click="handleLogin">登录</el-button>
            <el-button type="info"
                       @click="resetLoginForm">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="blog_register">
      <el-dialog custom-class="register_dialog"
                 title="注册用户"
                 center
                 v-model="registerForm.registerVisible">
        <div class="register_box">
          <!-- 注册表单区域 -->
          <el-form ref="rigisterFormRef"
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
            <!-- 邮箱 -->
            <el-form-item prop="email"
                          label="邮箱">
              <el-input v-model="registerForm.email"
                        placeholder="请输入邮箱"></el-input>
            </el-form-item>
            <!-- 验证码 -->
            <el-form-item prop="emVerifyCode"
                          label="验证码">
              <el-input v-model="registerForm.emVerifyCode"
                        placeholder="请输入验证码"
                        style="width:80%"></el-input>
              <el-button type="default"
                         plain
                         :loading="false"
                         style="width:20%">获取</el-button>
            </el-form-item>
            <el-form-item label="选择本地图片作头像">
              <!-- <el-upload class="avatar_uploader"
                         drag
                         action="#"
                         list-type="picture"
                         :limit="1"
                         :file-list="registerForm.fileList">
              </el-upload> -->
              <el-upload class="avatar_uploader"
                         action="http://localhost:8081"
                         :limit="1"
                         :on-preview="handlePreview"
                         :on-exceed="warnOverLimit"
                         :on-remove="handleRemove"
                         :file-list="registerForm.fileList"
                         list-type="picture">
                <el-button size="middle"
                           type="primary">点击上传</el-button>
              </el-upload>
            </el-form-item>
            <!-- 按钮区域 -->
            <el-form-item class="btns">
              <el-button type="default"
                         @click="registerForm.registerVisible = false">取消</el-button>
              <el-button type="primary"
                         @click="handleRegister">确定</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { reactive } from 'vue';

export default {
  name: 'loginFrame',
  setup() {
    // 这是登录表单的数据绑定对象
    const loginForm = reactive({
      username: '',
      password: '',
      validKey: '',
      verifyCode: '',
    });
    const registerForm = reactive({
      username: '',
      password: '',
      email: '',
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
    // 这是表单的验证规则对象
    const formRules = {
      // 验证用户名是否合法
      username: [
        { required: true, message: '请输入登录名称', trigger: 'blur' },
        {
          min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur',
        },
      ],
      // 验证密码是否合法
      password: [
        { required: true, message: '请输入登录密码', trigger: 'blur' },
        {
          min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur',
        },
      ],
      // 邮箱
      email: [
        { required: true, message: '请输入邮箱', trigger: 'blur' },
        {
          message: '长度在 3 到 15 个字符', trigger: 'blur',
        },
      ],
      // 图片验证码
      verifyCode: [
        { required: true, message: '请输入验证码', trigger: 'blur' },
      ],
      // 邮箱验证码
      emVerifyCode: [
        { required: true, message: '请输入验证码', trigger: 'blur' },
      ],

    };
    return {
      loginForm,
      registerForm,
      formRules,
    };
  },
  methods: {
    // 获取图像验证码
    getVerifyCode() {
      console.log(1);
    },
    // 获取邮箱验证码
    getEmVerifyCode() {
      console.log(1);
    },
    // 登录
    handleLogin() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          console.log(1);
        } else { // 校验不通过
          console.log(2);
        }
      });
    },
    // 注册
    handleRegister() {
      console.log(3);
    },
    // 重置表单
    resetLoginForm() {
      this.$refs.loginFormRef.resetFields();
    },
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
  },
};
</script>

<style lang="scss" scoped>
.main {
  height: 100vh;
  padding-top: 180px;
  background: url('@/assets/imgs/loginbgimg.jpg') center center / cover no-repeat;
  background-attachment: fixed; // 背景相对于视口固定
  animation: header-effect 1s;
  box-sizing: border-box;
}

.blog_login {
  margin: auto;
  background-color: #fff;
  border-radius: 5px;
  box-sizing: border-box;
}

.btns {
  text-align: right;
}

.avatar {
  width: 50px;
  height: 50px;
}

.blog_login {
  position: relative;
  width: 500px;
  height: 410px;
  padding: 80px 0 15px;
  .logo_box {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    top: -70px;
    left: 50%;
    transform: translateX(-50%);
    width: 150px;
    height: 150px;
    border: 2px solid #ededed;
    border-radius: 50%;
    background-color: #fff;
    img {
      display: block;
      width: 130px;
      height: 130px;
      border-radius: 50%;
    }
  }
  .login_box {
    width: 450px;
    margin: 80px auto 0;
  }
}
.login_box {
  .el-form-item {
    img {
      width: 150px;
      height: 40px;
    }
    .icon_wrap {
      position: absolute;
      left: 0;
      top: 0;
      display: block;
      width: 30px;
      height: 40px;
      text-align: center;
      line-height: 47px;
      z-index: 2;
      .iconfont {
        font-size: 20px;
      }
    }
  }
}

:deep(.register_dialog) {
  width: 11rem;
  margin-top: 10px;
  .el-dialog__body {
    padding-bottom: 10px;
  }
}

.register_box {
  :deep(.el-form) {
    .el-form-item:nth-of-type(-n + 4) {
      height: 55px;
    }
    .el-form-item:nth-of-type(-n + 5) {
      .el-form-item__label {
        padding: 0;
      }
    }
    .el-form-item:nth-of-type(4) {
      .el-button {
        span {
          text-align: center;
          font-size: 16px;
        }
      }
    }
  }
}

:deep(.avatar_uploader) {
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
