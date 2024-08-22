'use server';

import BackuppowerSettings from '../models/backuppower_settings.model';
import { connectToDB } from '../mongoose';

export interface BackupPowerSetting {
  sensorId: number;
  rate: string;
  setValue: string;
}

interface Params {
  userId: number | undefined;
  deviceId: string;
  backuppowerSettings: Array<BackupPowerSetting>;
}

export async function setBackupPowerSettings({ userId, deviceId, backuppowerSettings }: Params): Promise<boolean> {
  try {
    connectToDB();

    const result = await BackuppowerSettings.findOneAndUpdate(
      { deviceId: deviceId },
      {
        userId: userId,
        backuppowerSettings: backuppowerSettings,
        date: Date.now(),
      },
      { upsert: true, new: true },
    );

    return !!result;
  } catch (error: any) {
    throw new Error(`Failed: ${error.message}`);
  }
}

export async function getBackuppowerSettingsForDevice(deviceId: string) {
  try {
    connectToDB();

    return await BackuppowerSettings.findOne({ deviceId: deviceId });
  } catch (error: any) {
    throw new Error(`Failed: ${error.message}`);
  }
}
