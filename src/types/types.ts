import { PowerSetting } from "./../../lib/actions/power_settings";
import { UpdatedSensor } from "../../lib/actions/settings.actions";
import { BackupPowerSetting } from "../../lib/actions/backuppower_settings";

export type SensorType = {
  id: number;
  name: string;
  rate: string;
  value: string;
};

export type SensorValueType = {
  date: string;
  package_id: number;
  value: number;
};

export type DeviceType = {
  id: number;
  name: string;
  lat: number;
  lon: number;
  time: string;
};

export type SettingsForDeviceType = {
  _id: string;
  deviceId: string;
  date: Date;
  sensors: Array<UpdatedSensor>;
  userId: string;
};

export type PowerSettingsForDeviceType = {
  _id: string;
  deviceId: string;
  date: Date;
  powerSettings: Array<PowerSetting>;
  userId: string;
};

export type BackupPowerSettingsForDeviceType = {
  _id: string;
  deviceId: string;
  date: Date;
  backuppowerSettings: Array<BackupPowerSetting>;
  userId: string;
};
