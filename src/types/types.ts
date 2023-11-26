export type SensorType = {
   id: number
   name: string
   rate: string
   value: string
}

export type SensorValueType = {
   date: string
   package_id: number
   value: number
}

export type DeviceType = {
   id: number;
   name: string;
   lat: number;
   lon: number;
   time: string;
 };