import fs from 'node:fs'
import md from 'unplugin-vue-markdown/vite'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import vike from 'vike/plugin'

const cert = fs.existsSync('./localdev.crt') ? fs.readFileSync('./localdev.crt') : undefined
const key = fs.existsSync('./localdev.key') ? fs.readFileSync('./localdev.key') : undefined

export default defineConfig({
	plugins: [
		vike(),
		vue({
			include: [/\.vue$/, /\.md$/],
		}),
		md({}),
	],
	server: {
		port: 3033,
		hmr: {
			host: 'dev-bratags-embed.keycloak.june07.com',
		},
		https: {
			cert,
			key,
		},
		watch: {
			usePolling: true,
		},
	},
	build: {
		target: 'es2022',
	},
})
