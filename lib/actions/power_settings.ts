"use server"

import PowerSettings from "../models/power_settings";
import Settings from "../models/settings.model";
import { connectToDB } from "../mongoose"

export interface PowerSetting {
   sensorId: number
   sensorName: string
   rate: string
   setValue: string
}

interface Params {
   userId: number | undefined
   deviceId: string
   powerSettings: Array<PowerSetting>
}

export async function setPowerSettings({ userId, deviceId, powerSettings }: Params): Promise<void> {
   try {
      connectToDB();

      await PowerSettings.findOneAndUpdate(
         { deviceId: deviceId },
         {
            userId: userId,
            powerSettings: powerSettings,
            date: Date.now(),
         },
         { upsert: true }
      )
   } catch (error: any) {
      throw new Error(`Failed: ${error.message}`)
   }
}

export async function getPowerSettings(deviceId: string) {
   try {
      connectToDB();

      return await PowerSettings.findOne({ deviceId: deviceId })
   } catch (error: any) {
      throw new Error(`Failed: ${error.message}`)
   }
}