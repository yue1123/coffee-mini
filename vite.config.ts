import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'node:path'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
	resolve: {
		alias: {
			'@': resolve(__dirname, './src')
		}
	},

	plugins: [
		vue(),
		tailwindcss(),
		VitePWA({
			// devOptions: { enabled: true },
			registerType: 'autoUpdate',
			manifest: {
				name: 'coffee-mini',
				short_name: 'coffee-mini',
				description: 'A simple lucky coffee app',
				icons: [
					{
						src: 'vite.svg',
						sizes: 'any',
						type: 'image/png'
					}
				],
				start_url: '/',
				display: 'standalone',
				background_color: '#ffffff',
				theme_color: '#000000'
			},
			workbox: {
				cacheId: 'bundle-prefetch',
				globPatterns: ['**/*'],
				navigateFallback: '/index.html' // 离线回退页面
			}
		})
	]
})
