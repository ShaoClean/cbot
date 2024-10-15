import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    base: './',
    plugins: [react()],
    server: {
        port: 9090,
        watch: {
            usePolling: true, // 修复HMR热更新失效
        },
        host: true,
    },
});
