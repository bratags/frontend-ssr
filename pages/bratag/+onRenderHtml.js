import { escapeInject, dangerouslySkipEscape } from 'vike/server'

export function onRenderHtml(pageContext) {
    const { headHtml = '' } = pageContext
    const braTagId = pageContext.routeParams?.braTagId

    const documentHtml = escapeInject`<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <title>Bra Tag ${braTagId}</title>
        <link rel="alternate" type="application/json+oembed" href="https://api.june07.com/v1/bratags/oEmbed?url=https://bratags.com/bratag/${braTagId}" />
        ${dangerouslySkipEscape(headHtml)}
      </head>
      <body>
        <div style="height: 100vh; width: 100vw; display: flex; align-items: center; justify-content: center; font-size: 3rem">🏷️ ${braTagId}</div>
      </body>
    </html>`

    return {
        documentHtml
    }
}
