import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import svgr from 'vite-plugin-svgr';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  server: {
    proxy: {
      '/api': {
        target: 'https://test.smu-notice.kr',
        changeOrigin: true,
        secure: false,
        //rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
})
