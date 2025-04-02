import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'node:path'

// https://vite.dev/config/
export default defineConfig({
	resolve: {
		alias: {
			'@': resolve(__dirname, './src')
		}
	},

	plugins: [vue(), tailwindcss()]
})
