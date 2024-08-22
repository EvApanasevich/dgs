'use server';

import { SensorType } from '@/types/types';
import Settings from '../models/settings.model';
import { connectToDB } from '../mongoose';

export interface UpdatedSensor {
  icon: number | undefined;
  visible: boolean;
  newName: string;
  id: number;
  name: string;
  rate: string;
  value: string;
}

interface Params {
  userId: number | undefined;
  deviceId: string;
  arrSensors: Array<UpdatedSensor>;
}

export async function updateSettings({ userId, deviceId, arrSensors }: Params): Promise<boolean> {
  try {
    connectToDB();

    const result = await Settings.findOneAndUpdate(
      { deviceId: deviceId },
      {
        userId: userId,
        sensors: arrSensors,
        date: Date.now(),
      },
      { upsert: true, new: true },
    );

    return !!result;
  } catch (error: any) {
    throw new Error(`Failed: ${error.message}`);
  }
}

export async function getUpdatedSettingsForDevice(deviceId: string) {
  try {
    connectToDB();

    return await Settings.findOne({ deviceId: deviceId });
  } catch (error: any) {
    throw new Error(`Failed: ${error.message}`);
  }
}

export async function resetSettings(settingsId: string | undefined): Promise<any> {
  try {
    connectToDB();

    const result = await Settings.findOneAndDelete({ _id: settingsId });

    return !!result;
  } catch (error: any) {
    throw new Error(`Failed: ${error.message}`);
  }
}
