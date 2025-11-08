import { escapeInject, dangerouslySkipEscape } from 'vike/server'
import { renderToString } from '@vue/server-renderer'
import { createSSRApp, h } from 'vue'
import ApairMedia from '@/components/ApairMedia.vue'

const { VITE_APP_API_SERVER } = process.env

export default async function onRenderHtml(pageContext) {
	// 1. Create a Vue SSR app
	const app = createSSRApp({
		render: () =>
			h(ApairMedia, {
				ssr: true,
				apairId: pageContext.routeParams.apairId,
				apiServer: VITE_APP_API_SERVER,
			}),
	})

	// 2. Render component to HTML string
	const appHtml = await renderToString(app)

	const documentHtml = escapeInject`<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <title>Apair ${pageContext.routeParams.apairId}</title>
      </head>
      <body>
        ${dangerouslySkipEscape(appHtml)}
      </body>
    </html>`

	return {
		documentHtml,
	}
}
