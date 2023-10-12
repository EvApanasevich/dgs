'use client'
import { devicesApi } from '@/app/api/devices/api_devices'
import { SensorValueType } from '@/types/types'
import { create } from 'zustand'
import { convertDate, convertMonth } from './utils'

interface SensorState {
   period: { date: string, from: string, to: string }
   sensorsValues: SensorValueType[]
   loading: boolean
   error: null
   setPeriod: (period: { date: string, from: string, to: string }) => void
   getSensorsValuesForPeriod: (id: number, sensorId: number, from: string, to: string, token: string | undefined) => void
}

/////////////////////////////////////////////////////////////////////////////////////////
const date = new Date()
const start = `${date.getFullYear()}-${convertMonth(date.getMonth())}-${convertDate(date.getDate())}`
const end = `${date.getFullYear()}-${convertMonth(date.getMonth())}-${convertDate(date.getDate())} ${convertDate(date.getHours())}:${convertDate(date.getMinutes())}:${convertDate(date.getSeconds())}`
/////////////////////////////////////////////////////////////////////////////////////////

export const useSensorStore = create<SensorState>()((set) => ({
   period: {
      date: 'today',
      from: `${start} 00:00:00`,
      to: `${end}`
   },
   sensorsValues: [],
   loading: false,
   error: null,
   setPeriod: (period) => {
      set((state) => ({ period: period }))
   },
   getSensorsValuesForPeriod: async (id: number, sensorId: number, from: string, to: string, token: string | undefined) => {
      console.log('load true')
      set({ loading: true })
      try {
         const res = await devicesApi.getDeviceSensorValuesForPeriod(id, sensorId, from, to, token)
         if (!res) throw new Error('Failed to fetch! Try again.')
         console.log(res)
         set((state) => ({ sensorsValues: res }))
      } catch (error: any) {
         set({ error: error.message })
      } finally {
         set({ loading: false })
         console.log('load false')
      }
   }
}))