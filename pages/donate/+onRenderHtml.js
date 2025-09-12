import donateHtml from './donate.html?raw'

export function onRenderHtml() {
    return {
        documentHtml: donateHtml
    }
}
