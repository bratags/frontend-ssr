import { escapeInject, dangerouslySkipEscape } from 'vike/server'

export function onRenderHtml(pageContext) {
    const { headHtml = '', urlOriginal } = pageContext

    const u = new URL(`http://fake-origin${urlOriginal}`) // fake origin because urlOriginal is just path+query
    const entries = Object.fromEntries(u.searchParams.entries())
    const { url: urlEncodedUrl = '', slug = '' } = entries
    const decodedUrl = decodeURIComponent(urlEncodedUrl)
    const urlEncoded = encodeURIComponent(`https://bratags.com/checkout?url=${decodedUrl}&slug=${slug}`)

    console.log('originalUrl: ', urlOriginal)
    console.log('entries: ', entries)
    console.log('urlEncoded: ', urlEncoded)
    console.log('urlEncodedUrl: ', urlEncodedUrl)


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
