import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: '/resume-ruben-wambacq/',
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
                @import "./src/styling/_main.scss";
              `
      }
    }
  },
  server: {
    watch: {
      usePolling: true
    }
  }
})
