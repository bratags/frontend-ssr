import fs from 'fs'
import path from 'path'

export function onRenderHtml() {
    // Read HTML file
    const htmlFilePath = path.resolve('./index.html')
    const documentHtml = fs.readFileSync(htmlFilePath, 'utf-8')

    return {
        documentHtml
    }
}
