import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import styleImport from 'vite-plugin-style-import';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import { resolve } from 'path';

// 此处关于vite的配置需要学习，官方文档https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 8081, // 端口号
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
  // 配置引入全局的scss变量
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "./src/assets/scss/globalVarible.scss";',
      },
    },
  },
  // 设置反向代理，跨域
  proxy: {},
  build: {
    outDir: 'dist', // 打包输出路径
  },
});
