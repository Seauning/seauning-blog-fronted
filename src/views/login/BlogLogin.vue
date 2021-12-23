<template>
  <div class="main">
    <login-dialog :formRules="formRules"></login-dialog>
    <register-dialog :formRules="formRules"></register-dialog>
  </div>
</template>

<script>
import { ref, provide, getCurrentInstance } from 'vue';
import LoginDialog from '@/views/login/LoginDialog.vue';
import RegisterDialog from '@/views/login/RegisterDialog.vue';

export default {
  name: 'loginFrame',
  components: {
    LoginDialog,
    RegisterDialog,
  },
  setup() {
    const { proxy } = getCurrentInstance();
    // 添加用户名规则检测用户是否存在
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
    // 添加手机号规则检测手机号是否存在
    const checkPhoneCount = async (rule, value, callback) => {
      const { data: res } = await proxy.$http.get(`/phones/${value}/count/`);
      if (res.code === 0) {
        if (res.count !== 0) {
          return callback(new Error('手机号已被注册'));
        }
      } else if (res.code === 1) {
        return callback(new Error('手机号格式错误'));
      } else {
        return callback(new Error('服务器响应错误'));
      }
      return true;
    };
    // 这是表单的验证规则对象
    const formRules = {
      // 验证用户名是否合法
      username: [
        { required: true, message: '请输入登录名称', trigger: 'blur' },
        {
          min: 2, max: 6, message: '长度在 2 到 6 个字符', trigger: 'blur',
        },
        { validator: checkUserCount, trigger: 'blur' },
      ],
      // 验证密码是否合法
      password: [
        { required: true, message: '请输入登录密码', trigger: 'blur' },
        {
          min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur',
        },
      ],
      // 手机号
      phone: [
        { required: true, message: '请输入手机号', trigger: 'blur' },
        {
          min: 11, max: 11, message: '请输入长度为11位的手机号', trigger: 'blur',
        },
        { validator: checkPhoneCount, trigger: 'blur' },
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
    const registerVisible = ref(false);
    provide('registerVisible', registerVisible);
    return {
      formRules,
    };
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
</style>
