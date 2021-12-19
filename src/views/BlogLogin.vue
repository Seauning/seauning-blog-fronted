<template>
  <div class="main">
    <div class="blog_login">
      <div class="logo_box">
        <img src="../assets/imgs/avatar.jpg"
             alt="头像">
      </div>
      <div class="login_box">
        <!-- 登录表单区域 -->
        <el-form ref="loginFormRef"
                 :model="loginForm"
                 :rules="loginFormRules"
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
                       @click="handleCreate">注册</el-button>
            <el-button type="primary"
                       @click="handleLogin">登录</el-button>
            <el-button type="info"
                       @click="resetLoginForm">重置</el-button>
          </el-form-item>
        </el-form>
        <!-- <form class="info_form">
          <div class="error is-required input_wrap">
            <el-input v-model="uname"
                      placeholder="请输入用户名">
              <template #prefix></template>
            </el-input>
            <span class="icon_wrap">
              <svg class="icon iconfont"
                   aria-hidden="true">
                <use xlink:href="#icon-17"></use>
              </svg>
            </span>
          </div>
          <div class="is_required input_wrap">
            <el-input v-model="passwd"
                      placeholder="请输入密码"
                      required>
              <template #prefix></template>
            </el-input>
            <span class=" icon_wrap">
              <svg class="icon iconfont"
                   aria-hidden="true">
                <use xlink:href="#icon-ziyuan"></use>
              </svg>
            </span>
          </div>
          <div class="is_required input_wrap">
            <span class="icon_wrap">
              <svg class="icon iconfont"
                   aria-hidden="true">
                <use xlink:href="#icon-yanzhengma"></use>
              </svg>
            </span>
            <el-input class="valid"
                      v-model="validstr"
                      placeholder="请输入验证码"
                      required>
              <template #prefix></template>
            </el-input>
            <img src="../assets/imgs/valid.png"
                 alt="验证码"
                 class="validimg">
          </div>
          <div class="btn_wrap">
            <el-button type="primary">注册</el-button>
            <el-button type="success">登录</el-button>
            <el-button type="info">重置</el-button>
          </div>
        </form> -->
      </div>
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
    // 这是表单的验证规则对象
    const loginFormRules = {
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
      // 验证码
      code: [
        { required: true, message: '请输入验证码', trigger: 'blur' },
      ],
      nickname: [
        { required: true, message: '请输入昵称', trigger: 'blur' },
        {
          min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur',
        },
      ],
    };

    return {
      loginForm,
      loginFormRules,
    };
  },
  methods: {
    getVerifyCode() {
      console.log(1);
    },
    handleCreate() {
      console.log(2);
    },
    handleLogin() {
      console.log(3);
    },
    resetLoginForm() {
      this.$refs.loginFormRef.resetFields();
    },
  },
};
</script>

<style lang="scss" scoped>
.blog_login {
  position: relative;
  width: 500px;
  height: 410px;
  margin: auto;
  padding: 80px 0 15px;
  background-color: #fff;
  border-radius: 5px;
  box-sizing: border-box;
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
    .btns {
      text-align: right;
    }
  }
}
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
// .input_wrap {
//   position: relative;
//   margin-bottom: 22px;
//   &.error {
//     position: relative;
//     z-index: 2;
//     &::after {
//       position: absolute;
//       left: 2px;
//       bottom: -12px;
//       content: '111';
//       font-size: 12px;
//       color: red;
//     }
//   }

//   .valid {
//     width: 50%;
//   }
//   .validimg {
//     margin-left: 115px;
//     height: 40px;
//   }
// }

// .btn_wrap {
//   text-align: right;
//   .el-button {
//     width: 76px;
//     height: 45px;
//     font-style: 26px;
//     font-weight: 500;
//     font-family: $ffVERDANA;
//   }
// }
</style>
