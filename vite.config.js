import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import electronVitePlugin from 'vite-plugin-electron/simple';
import pkg from './package.json';
import { rmSync } from 'fs';

export default defineConfig(({ command }) => {
    rmSync('dist-electron', { recursive: true, force: true });
    const isServe = command === 'serve';
    const isBuild = command === 'build';
    const sourcemap = isServe;

    return {
        plugins: [
            react(),
            electronVitePlugin({
                main: {
                    entry: './src/index.js',
                    vite: {
                        build: {
                            sourcemap,
                            minify: isBuild,
                            outDir: 'dist-electron',
                            rollupOptions: {
                                external: Object.keys('dependencies' in pkg ? pkg.dependencies : {}),
                            },
                        },
                    },
                },
            }),
        ],
        server: {
            port: 9090,
            watch: {
                usePolling: true, // 修复HMR热更新失效
            },
            host: true,
        },
    };
});
