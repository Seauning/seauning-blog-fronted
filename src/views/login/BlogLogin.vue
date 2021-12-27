<template>
  <div class="main">
    <login-dialog :formRules="formRules"></login-dialog>
    <register-dialog :formRules="formRules"></register-dialog>
  </div>
</template>

<script>
import { ref, provide } from 'vue';
import { getUsernameCountApi, getPhoneCountApi } from '@/api/loginApi.js';
import LoginDialog from '@/views/login/LoginDialog.vue';
import RegisterDialog from '@/views/login/RegisterDialog.vue';

export default {
  name: 'loginFrame',
  components: {
    LoginDialog,
    RegisterDialog,
  },
  setup() {
    // 如果想访问到项目的app实例，需要通过getCurrentInstance()获取
    // 通过解构出proxy可以访问app的$data，$emit，$nextTick，$options，$parent，$props，$ref，$slots，$watch等属性
    // const { proxy } = getCurrentInstance();
    // 添加用户名规则检测用户是否存在
    const checkUserCount = async (rule, value, callback) => {
      const { code, data, msg } = await getUsernameCountApi(value);
      if (code === 0) {
        if (data.count !== 0) {
          return callback(new Error('用户名已注册'));
        }
      } else if (code === 400) {
        return callback(new Error(msg));
      } else {
        return callback(new Error(msg));
      }
      return true;
    };
    // 添加手机号规则检测手机号是否存在
    const checkPhoneCount = async (rule, value, callback) => {
      const { code, data, msg } = await getPhoneCountApi(value);
      if (code === 0) {
        if (data.count !== 0) {
          return callback(new Error('手机号已被注册'));
        }
      } else if (code === 400) {
        return callback(new Error(msg));
      } else {
        return callback(new Error(msg));
      }
      return true;
    };
    // 这是表单的验证规则对象
    const formRules = {
      // 验证登录用户名是否合法
      logusername: [
        { required: true, message: '请输入用户名或手机号', trigger: 'blur' },
      ],
      // 验证注册用户名是否合法
      regusername: [
        { required: true, message: '请输入用户名', trigger: 'blur' },
        {
          min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur',
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
          min: 11, max: 11, message: '请输入正确格式，长度为11位', trigger: 'blur',
        },
        { validator: checkPhoneCount, trigger: 'blur' },
      ],
      // 图片验证码
      verifyCode: [
        {
          required: true, min: 4, max: 4, message: '请输入4位的图片验证码', trigger: 'blur',
        },
      ],
      // 手机验证码
      smsVerifyCode: [
        {
          required: true, min: 6, max: 6, message: '请输入6位的手机验证码', trigger: 'blur',
        },
      ],
    };
    const registerVisible = ref(false);
    provide('registerVisible', registerVisible);
    provide('changeRegisterVisible', (val) => {
      registerVisible.value = val;
    });
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
