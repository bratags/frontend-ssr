import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export function onRenderHtml() {
    const htmlFilePath = path.join(__dirname, 'index.html')
    const documentHtml = fs.readFileSync(htmlFilePath, 'utf-8')

    return { documentHtml }
}
