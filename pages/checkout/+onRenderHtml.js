import { escapeInject, dangerouslySkipEscape } from 'vike/server'

function base64UrlDecode(base64UrlString) {
    // Replace URL-safe chars back to standard base64 chars
    let base64 = base64UrlString
        .replace(/-/g, '+')
        .replace(/_/g, '/')

    // Pad with '=' chars if needed (base64 length must be multiple of 4)
    while (base64.length % 4) {
        base64 += '='
    }

    // Decode base64 to a UTF-8 string
    return Buffer.from(base64, 'base64').toString('utf-8')
}
export function onRenderHtml(pageContext) {
    const { headHtml = '' } = pageContext
    const { url: encodedUrl = '', slug = '' } = pageContext.routeParams

    const decodedUrl = base64UrlDecode(encodedUrl)
    const urlEncoded = encodeURIComponent(`https://bratags.com/checkout/?url=${decodedUrl}&slug=${slug}`)


    const documentHtml = escapeInject`<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <title>Bratags Checkout ${decodedUrl} - ${slug}</title>
        <link rel="alternate" type="application/json+oembed" href="https://api.june07.com/v1/bratags/oEmbed?url=${urlEncoded}" />
        ${dangerouslySkipEscape(headHtml)}
      </head>
      <body>
        <div style="height: 100vh; width: 100vw; display: flex; align-items: center; justify-content: center; font-size: 3rem">🧺 ${decodedUrl} - ${slug}</div>
      </body>
    </html>`

    return {
        documentHtml
    }
}
