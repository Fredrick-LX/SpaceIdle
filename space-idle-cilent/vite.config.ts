import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import dotenv from 'dotenv'
dotenv.config({ path: resolve(__dirname, './config/.env') })
const port = process.env.GAME_PORT ? parseInt(process.env.GAME_PORT) : 1453//如果环境变量中没有GAME_PORT，则使用1453
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
    envDir: './config',
    resolve: {
        alias: {
            '@': resolve(__dirname, 'src')
        }
    },
    server: {
        port: port,
        proxy: {
            '/ws': {
                target: `ws://localhost:${port}`,
                changeOrigin: true,
                ws: true,
            }
        }
    }
})
