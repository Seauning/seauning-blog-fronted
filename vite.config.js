import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import { resolve } from 'path'

// 此处关于vite的配置需要学习，官方文档https://vitejs.dev/config/
export default defineConfig({
  // 起个别名，在引用资源时，可以用‘@/资源路径’直接访问
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
  plugins: [vue()],
  server: {
    port: 8081
  },
  // 设置反向代理，跨域
  proxy: {

  }
})
