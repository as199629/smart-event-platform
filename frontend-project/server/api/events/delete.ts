// server/api/deleteEvent.ts
import { readFileSync, writeFileSync } from 'fs'
import { resolve } from 'path'

export default defineEventHandler(event => {
    const { id } = getRequestURL(event)
    const filePath = resolve('./server/data/events.json')
    const rawData = readFileSync(filePath, 'utf-8')
    let events = JSON.parse(rawData)
    events = events.filter(e => e.id !== id)
    writeFileSync(filePath, JSON.stringify(events, null, 2))
    return { deleted: true }
})
