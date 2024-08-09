'use server';

import UserSettings from '../models/user_settings.model';
import { connectToDB } from '../mongoose';

interface Params {
  userId: number | undefined;
  language: string;
}

export async function updateLanguage({ userId, language }: Params): Promise<void> {
  try {
    connectToDB();

    await UserSettings.findOneAndUpdate(
      { userId: userId },
      {
        language: language,
        date: Date.now(),
      },
      { upsert: true },
    );
  } catch (error: any) {
    throw new Error(`Failed: ${error.message}`);
  }
}

export async function getUserSettings(userId: number | undefined) {
  try {
    connectToDB();

    let settings = await UserSettings.findOne({ userId: userId });

    if (!settings) {
      settings = new UserSettings({
        userId: userId,
        language: 'RU',
      });
      await settings.save();
    }

    return settings;
  } catch (error: any) {
    throw new Error(`Failed: ${error.message}`);
  }
}
