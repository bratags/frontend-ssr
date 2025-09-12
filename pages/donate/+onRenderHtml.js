import donateHtml from './index.html?raw'

export function onRenderHtml() {
    let html = donateHtml

    if (import.meta.env.PROD) {
        // inject the refresh meta right after <head>
        html = html.replace(
            /<head>/,
            `<head>\n<meta http-equiv="refresh" content="0;url=https://bratags.com/?donate=1">`
        )
    }

    return { documentHtml: html }
}
