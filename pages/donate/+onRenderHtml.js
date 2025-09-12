import fs from 'fs'
import path from 'path'

export function onRenderHtml() {
    const htmlFilePath = path.join(process.cwd(), 'index.html')
    const documentHtml = fs.readFileSync(htmlFilePath, 'utf-8')

    return { documentHtml }
}
