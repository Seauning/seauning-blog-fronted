module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:vue/vue3-essential',
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 13,
    sourceType: 'module',
  },
  plugins: [
    'vue',
  ],
  rules: {
    'space-before-function-paren': 0, // 函数前的空格为0
    'import/no-unresolved': 'off', // 通过该句话解决path no-unresolved报错
    // 配置开发模式允许console和debugger
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-plusplus': [ // 禁止++运算符报错
      'off',
      {
        allowForLoopAfterthoughts: true,
      },
    ],
    'vue/comment-directive': 'off', // 允许在标签中写注释
  },
};
