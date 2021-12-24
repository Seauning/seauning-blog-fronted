<template>
  <div class="blog_login animate__animated animate__bounceInUp">
    <div class="logo_box">
      <img src="../../assets/imgs/avatar.jpg"
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
          <img src="../../assets/imgs/valid.png"
               @click="getVerifyCode()"
               style="float: right;cursor:pointer;" />
        </el-form-item>
        <!-- 按钮区域 -->
        <el-form-item class="btns">
          <el-button type="success"
                     @click="registerVisible = true">注册</el-button>
          <el-button type="primary"
                     @click="handleLogin">登录</el-button>
          <el-button type="info"
                     @click="resetLoginForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { getCurrentInstance, inject, reactive } from 'vue';

export default {
  name: 'LoginDialog',
  props: {
    formRules: {},
  },
  setup() {
    const registerVisible = inject('registerVisible');
    // 这是登录表单的数据绑定对象
    const loginForm = reactive({
      username: '',
      password: '',
      validImg: '',
      verifyCode: '',
    });
    const { proxy } = getCurrentInstance();
    // 重置表单
    const resetLoginForm = async () => {
      await proxy.$refs.loginFormRef.resetFields();
    };
    // 获取邮箱验证码
    const getEmVerifyCode = () => {
      console.log(1);
    };
    // 登录
    const handleLogin = async () => {
      const res = await proxy.$refs.loginFormRef.validate().catch((err) => err);
      if (res !== true) {
        return false;
      }
      return true;
    };
    return {
      registerVisible,
      loginForm,
      resetLoginForm,
      getEmVerifyCode,
      handleLogin,
    };
  },
};
</script>

<style lang="scss" scoped>
.blog_login {
  margin: auto;
  background-color: #fff;
  border-radius: 5px;
  box-sizing: border-box;
}
.avatar {
  width: 50px;
  height: 50px;
}
.btns {
  text-align: right;
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
</style>
