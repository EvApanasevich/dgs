import { SensorType } from './../../../types/types';

export const getSensors = (device: any): SensorType[] => {
   let arrSensors = [];

   if(device) {
      for (let id in device.sensors) {
         arrSensors.push(device.sensors[id]);
      }
   }
   return arrSensors;
};