"use server"

import { SensorType } from "@/types/types";
import Settings from "../models/settings.model";
import { connectToDB } from "../mongoose"

export interface UpdatedSensor {
   newName: string
   id: number
   name: string
   rate: string
   value: string
}

interface Params {
   userId: number | undefined
   deviceId: string
   arrSensors: Array<UpdatedSensor>
}

export async function updateSettings({ userId, deviceId, arrSensors }: Params): Promise<void> {
   try {
      connectToDB();

      await Settings.findOneAndUpdate(
         { deviceId: deviceId },
         {
            userId: userId,
            sensors: arrSensors,
            date: Date.now(),
         },
         { upsert: true }
      )
   } catch (error: any) {
      throw new Error(`Failed: ${error.message}`)
   }
}

export async function getUpdatedSettingsForDevice(deviceId: string) {
   try {
      connectToDB();

      return await Settings.findOne({ deviceId: deviceId })
   } catch (error: any) {
      throw new Error(`Failed: ${error.message}`)
   }
}