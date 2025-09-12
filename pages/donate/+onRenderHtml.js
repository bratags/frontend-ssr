import donateHtml from './index.html?raw'

export function onRenderHtml() {
    return {
        documentHtml: donateHtml
    }
}
