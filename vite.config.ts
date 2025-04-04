import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'node:path'
import { VitePWA } from 'vite-plugin-pwa'
import basicSsl from '@vitejs/plugin-basic-ssl'

// https://vite.dev/config/
export default defineConfig({
	resolve: {
		alias: {
			'@': resolve(__dirname, './src')
		}
	},

	server: {
		https: {}
	},
	plugins: [
		vue(),
		tailwindcss(),
		basicSsl(),
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
