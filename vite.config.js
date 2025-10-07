import { defineConfig } from 'vite';
import { resolve } from 'path'

export default defineConfig({
    root: resolve(__dirname, 'public_html/www'),

    build: {
        outDir: resolve(__dirname, 'public_html/www/dist'),
        emptyOutDir: true,
        
        rollupOptions: {
        input: {
            main: resolve(__dirname, 'public_html/www/index.html'),
            // about: resolve(__dirname, 'public_html/www/about.html')
        }
        }
    },

    publicDir: resolve(__dirname, 'public_html/www/assets'),

    resolve: {
        alias: {
        '@': resolve(__dirname, 'public_html/src'),
        '@ts': resolve(__dirname, 'public_html/src/ts'),
        '@scss': resolve(__dirname, 'public_html/src/scss')
        }
    },
});