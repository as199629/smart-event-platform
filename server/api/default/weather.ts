import fs from 'fs'
import path from 'path'
import os from 'os'
import { defineEventHandler } from 'h3'

const CACHE_FILE = path.join(os.tmpdir(), 'weather')
const CACHE_DURATION = 3000000 // 50 minutes in milliseconds

interface CacheData {
  timestamp: number
  data: any
}

interface WeatherLocation {
  locationName: string;
  weatherElement: {
    elementName: string;
    time: {
      startTime: string;
      endTime: string;
      parameter: {
        parameterName: string;
        parameterUnit?: string;
      };
    }[];
  }[];
}

interface ProcessedWeatherData {
  locationName: string;
  temperature: string;
  description: string;
  rainProbability: string;
}

export default defineEventHandler(async () => {
  const authorizedToken = process.env.WEATHER_API_TOKEN
  
  if (!authorizedToken) {
    console.error('Weather API key is not set')
    return { error: 'Weather API key is not configured' }
  }

  try {
    // Check cache first
    if (fs.existsSync(CACHE_FILE)) {
      const cacheData: CacheData = JSON.parse(
        fs.readFileSync(CACHE_FILE, 'utf-8')
      )
      if (Date.now() - cacheData.timestamp < CACHE_DURATION)
        return cacheData.data
    }

    const apiUrl = `https://opendata.cwa.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=${authorizedToken}`
    const response = await fetch(apiUrl)

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    const result = await response.json()
    
    // Process the weather data
    const locations = result.records.location
    const processedData = locations.map((location: WeatherLocation): ProcessedWeatherData => {
      const wx = location.weatherElement.find(el => el.elementName === 'Wx')
      const minT = location.weatherElement.find(el => el.elementName === 'MinT')
      const maxT = location.weatherElement.find(el => el.elementName === 'MaxT')
      const pop = location.weatherElement.find(el => el.elementName === 'PoP')

      return {
        locationName: location.locationName,
        temperature: `${minT?.time[0].parameter.parameterName}°C - ${maxT?.time[0].parameter.parameterName}°C`,
        description: wx?.time[0].parameter.parameterName || '',
        rainProbability: `${pop?.time[0].parameter.parameterName}%`
      }
    })

    const cacheData: CacheData = {
      timestamp: Date.now(),
      data: processedData,
    }

    fs.writeFileSync(CACHE_FILE, JSON.stringify(cacheData))
    return processedData
  } catch (error) {
    console.error('Error fetching weather data:', error)
    return { error: 'Failed to fetch weather data' }
  }
})
