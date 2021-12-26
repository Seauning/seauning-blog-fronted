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
        <el-form-item prop="logusername">
          <el-input v-model="loginForm.logusername"
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
          <img :src="loginForm.validImg"
               @click="getVerifyCode()"
               style="float: right;cursor:pointer;"
               alt="验证码" />
        </el-form-item>
        <!-- 按钮区域 -->
        <el-form-item class="btns">
          <el-button type="success"
                     @click="changeRegisterVisible(true)">注册</el-button>
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
import {
  getCurrentInstance, reactive, inject, onMounted, onUnmounted,
} from 'vue';
import { getUUID } from '@/utils/tool';
import { getImgCodeApi, postCheckUserApi } from '@/api/loginApi.js';

export default {
  name: 'LoginDialog',
  props: {
    formRules: {},
  },
  setup() {
    // 获取图片的次数
    let getImgCounts = 0;
    // 禁止获取图像验证码的倒计时
    let forbidGetTimer = null;
    // 系统自动刷新图片验证码的定时器
    let flushValidImgTimer = null;
    // 图片验证码的uuid，用于比较图片验证码
    let uuid = '';
    // 获取当前的app实例，并从中解构出proxy
    const { proxy } = getCurrentInstance();
    // 禁止获取图片
    const changeRegisterVisible = inject('changeRegisterVisible');
    // 这是登录表单的数据绑定对象
    const loginForm = reactive({
      logusername: '',
      password: '',
      validImg: '',
      verifyCode: '',
    });
    // 重置表单
    const resetLoginForm = () => {
      proxy.$refs.loginFormRef.resetFields();
    };
    // 开启禁止获取图片验证码的计时器
    const startForbidGetImgTimer = () => {
      clearTimeout(forbidGetTimer);
      function reset() {
        getImgCounts = 0 && clearTimeout(forbidGetTimer);
      }
      // 禁用3秒的获取图片验证码
      forbidGetTimer = setTimeout(reset, 3000); // 此处不能加()否则会立即执行函数体里的内容
    };
    // 获取图片验证码
    const getVerifyCode = async () => {
      if (forbidGetTimer != null && getImgCounts >= 5) {
        proxy.Message({
          message: '您点击的次数太快，请稍后重试',
          type: 'warning',
        });
        return;
      }
      startForbidGetImgTimer();
      uuid = getUUID();
      loginForm.validImg = await getImgCodeApi(uuid);
      getImgCounts += 1;
    };
    /* 这是Vue3对对象的某一个属性监听的新写法，如果将该函数改为'loginForm.verifyCode'会有警告
    watch(() => loginForm.verifyCode, (newV) => {
      emit('getValidCode', newV);
    }); */
    // 开启自动刷新验证码的定时器
    const startFlushValidImgTimer = () => {
      clearInterval(flushValidImgTimer);
      // 首次开启的时候先获取一次图片验证码
      getVerifyCode();
      // 每隔60秒获取一次图片验证码
      flushValidImgTimer = setInterval(getVerifyCode, 60000);
    };
    // 渲染完毕开启自动刷新的定时器
    onMounted(() => { startFlushValidImgTimer(); });
    // 需要在组件销毁的时候关闭所有计时器
    onUnmounted(() => { clearTimeout(forbidGetTimer); clearInterval(flushValidImgTimer); });
    // 登录
    const handleLogin = async () => {
      const res = await proxy.$refs.loginFormRef.validate().catch((err) => err);
      if (res !== true) {
        return false;
      }
      const { code, msg } = await postCheckUserApi({
        username: loginForm.logusername,
        password: loginForm.password,
        verifyCode: loginForm.verifyCode,
        uuid,
      });
      if (code === 400) {
        switch (msg) {
          case 'pars err':
            proxy.Message({ message: '登录信息不能为空', type: 'warning' });
            break;
          case 'usr nonexists':
            proxy.Message({ message: '用户名不存在', type: 'warning' });
            break;
          case 'pwd err':
            proxy.Message({ message: '密码错误', type: 'error' });
            break;
          case 'valid dead':
            proxy.Message({ message: '验证码失效', type: 'warning' });
            getVerifyCode();
            break;
          case 'valid err':
            proxy.Message({ message: '验证码错误', type: 'warning' });
            break;
          default:
        }
        return false;
      }
      if (code === 500) {
        proxy.Message({ message: '登录失败!!', type: 'error' });
        return false;
      }
      proxy.Message({ message: '登录成功!!', type: 'success' });
      return true;
    };
    return {
      loginForm,
      changeRegisterVisible,
      resetLoginForm,
      getVerifyCode,
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
  max-width: 500px;
  width: 14.4rem;
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
    max-width: 450px;
    width: 13.4rem;
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

@media screen and (max-width: 518px) {
  .blog_login {
    .login_form {
    }
  }
}
</style>
