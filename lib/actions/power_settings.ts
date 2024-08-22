'use server';

import PowerSettings from '../models/power_settings';
import Settings from '../models/settings.model';
import { connectToDB } from '../mongoose';

export interface PowerSetting {
  sensorId: number;
  rate: string;
  setValue: string;
}

interface Params {
  userId: number | undefined;
  deviceId: string;
  powerSettings: Array<PowerSetting>;
}

export async function setPowerSettings({ userId, deviceId, powerSettings }: Params): Promise<boolean> {
  try {
    connectToDB();

    const result = await PowerSettings.findOneAndUpdate(
      { deviceId: deviceId },
      {
        userId: userId,
        powerSettings: powerSettings,
        date: Date.now(),
      },
      { upsert: true, new: true },
    );

    return !!result;
  } catch (error: any) {
    throw new Error(`Failed: ${error.message}`);
  }
}

export async function getPowerSettingsForDevice(deviceId: string) {
  try {
    connectToDB();

    return await PowerSettings.findOne({ deviceId: deviceId });
  } catch (error: any) {
    throw new Error(`Failed: ${error.message}`);
  }
}
