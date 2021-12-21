<template>
  <div class="main">
    <login-dialog :formRules="formRules"></login-dialog>
    <register-dialog :formRules="formRules"></register-dialog>
  </div>
</template>

<script>
import { ref, provide } from 'vue';
import LoginDialog from '@/views/login/LoginDialog.vue';
import RegisterDialog from '@/views/login/RegisterDialog.vue';

export default {
  name: 'loginFrame',
  components: {
    LoginDialog,
    RegisterDialog,
  },
  setup() {
    // 这是表单的验证规则对象
    const formRules = {
      // 验证用户名是否合法
      username: [
        { required: true, message: '请输入登录名称', trigger: 'blur' },
        {
          min: 1, max: 12, message: '长度在 1 到 12 个字符', trigger: 'blur',
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
