import { readFileSync, writeFileSync } from 'fs'
import { resolve } from 'path'

export default defineEventHandler( (event) => {
  const newEvent =  getRequestURL(event)
  const filePath = resolve('./server/data/events.json')
  const rawData = readFileSync(filePath, 'utf-8')
  const events = JSON.parse(rawData)
  events.push(newEvent)
  writeFileSync(filePath, JSON.stringify(events, null, 2))
  return newEvent
})