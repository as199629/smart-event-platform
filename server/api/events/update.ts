// server/api/updateEvent.ts
import { readFileSync, writeFileSync } from 'fs'
import { resolve } from 'path'

export default defineEventHandler( (event) => {
  const updateData = getRequestURL(event)
  const filePath = resolve('./server/data/events.json')
  const rawData = readFileSync(filePath, 'utf-8')
  const events = JSON.parse(rawData)
  const index = events.findIndex(e => e.id === updateData.id)
  if (index !== -1) {
    events[index] = { ...events[index], ...updateData }
    writeFileSync(filePath, JSON.stringify(events, null, 2))
  }
  return events[index]
})