import { defineConfig } from 'vite';
import { resolve } from 'path'

export default defineConfig({
    root: resolve(__dirname, 'public_html/'),

    server: {
        middlewareMode: false
    },

    build: {
        outDir: resolve(__dirname, 'src/main/webapp/dist/'),
        emptyOutDir: true,
        
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'public_html/src/ts/main.ts')

                // main: resolve(__dirname, 'public_html/www/index.html'),
                // about: resolve(__dirname, 'public_html/www/about.html')
            },
            output: {
                entryFileNames: 'js/[name].js',
                chunkFileNames: 'js/[name]-[hash].js',
                assetFileNames: (assetInfo) => {
                    if (assetInfo.name.endsWith('.css')) {
                        return 'css/[name].css';
                    }
                    return 'assets/[name].[ext]';
                },
            }
        },
    },

    // publicDir: resolve(__dirname, 'public_html/www/assets'),
    publicDir: false,

    resolve: {
        alias: {
        '@': resolve(__dirname, 'public_html/src'),
        '@ts': resolve(__dirname, 'public_html/src/ts'),
        '@scss': resolve(__dirname, 'public_html/src/sass')
        }
    },

    extensions: ['.js', '.ts', '.jsx', '.tsx', '.json'],
});