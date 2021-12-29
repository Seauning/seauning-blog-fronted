import { createStore } from 'vuex';

const defaultState = {
  token: '',
};

// Create a new store instance.
const store = createStore({
  state() {
    return defaultState;
  },
  // 获取属性的状态
  getters() {
    return {
      GET_TOKEN: (state) => state.token,
    };
  },
  // 设置属性状态
  mutations() {
    // 保存登录状态
    return {
      SET_TOKEN: (state, v) => {
        state.token = v;
      },
      REMOVE_TOKEN: (state) => {
        localStorage.setItem('token', '');
        state.token = '';
      },
    };
  },
  // 应用mutations
  actions() {
    // 获取登录状态
    return {
      setToken: ({ comment }, v) => {
        comment('SET_TOKEN', v);
      },
    };
  },
});

export default store;
