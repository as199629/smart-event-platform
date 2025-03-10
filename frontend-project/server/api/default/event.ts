import { readFileSync } from 'fs'
import { resolve } from 'path'

export default defineEventHandler(() => {
    // 讀取 JSON 檔案
    const filePath = resolve('./server/data/events.json')
    const rawData = readFileSync(filePath, 'utf-8')
    const events = JSON.parse(rawData)
    return events
})
