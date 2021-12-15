import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import styleImport from 'vite-plugin-style-import';
// 引入element-plus会出现Unable to resolve path to module 'unplugin-vue-components/vite'的错误
// 添加如下语句阻止eslint报错
/* eslint-disable import/no-unresolved */
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import { resolve } from 'path';

// 此处关于vite的配置需要学习，官方文档https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 8081,
  },
  // 起个别名，在引用资源时，可以用‘@/资源路径’直接访问
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  plugins: [
    vue(),
    /* 以下是配置element-plus */
    // 按需导入element-plus组件
    Components({
      resolvers: [ElementPlusResolver()],
    }),
    // 按需导入element-plus的css样式
    styleImport({
      libs: [
        {
          libraryName: 'element-plus',
          esModule: true,
          resolveStyle: (name) => `element-plus/theme-chalk/${name}.css`,
        },
      ],
    }),
    /* 以上是配置element-plus */

  ],
  // 设置反向代理，跨域
  proxy: {},
});
