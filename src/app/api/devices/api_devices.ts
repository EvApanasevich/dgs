import { convertDate, convertMonth } from '@/app/indetail/[id]/sensor/[sensorId]/utils';
import { SensorType, SensorValueType } from '@/types/types';

export const authApi = {
  async authorize(cred: { email: string; password: string; language: string }) {
    try {
      let formData = new FormData();
      formData.append('email', cred.email);
      formData.append('password', cred.password);
      formData.append('lang', cred.language);

      const response = await fetch('http://api.mechatronics.by:8080/api/3/login', {
        method: 'POST',
        body: formData,
        redirect: 'follow',
      });

      if (response.status === 404) {
        throw new Error('Invalid login or password');
      }

      if (response.status !== 201) {
        throw new Error('Failed to log in');
      }

      const user = await response.json();

      return user;
    } catch (e) {
      console.log(e);
      throw new Error('Authorization failed');
    }
  },
};

export const devicesApi = {
  async getDevices(token: string | undefined) {
    try {
      let responseDevices = await fetch('http://api.mechatronics.by:8080/api/3/get_devices', {
        method: 'POST',
        headers: {
          authorization: `Bearer ${token}`,
        },
        redirect: 'follow',
      });
      const devices = await responseDevices.json();

      //console.log(devices);

      let arrDevices = [];
      for (let id in devices) {
        arrDevices.push(devices[id]);
      }

      return arrDevices;
    } catch (e) {}
  },
  async getDevice(id: string, token: string | undefined) {
    try {
      let responseDeviceProperties = await fetch('http://api.mechatronics.by:8080/api/3/get_device', {
        method: 'POST',
        body: JSON.stringify({ id: id }),
        headers: {
          authorization: `Bearer ${token}`,
          'Content-Type': 'application/json;charset=utf-8',
        },
        redirect: 'follow',
      });

      console.log(responseDeviceProperties);

      const device = await responseDeviceProperties.json();

      return device;
    } catch (error) {}
  },
  async getDeviceSensors(id: number, token: string | undefined) {
    try {
      let responseDeviceSensors = await fetch('http://api.mechatronics.by:8080/api/3/get_device_sens', {
        method: 'POST',
        body: JSON.stringify({ id: id }),
        headers: {
          authorization: `Bearer ${token}`,
          'Content-Type': 'application/json;charset=utf-8',
        },
        redirect: 'follow',
      });

      const sensors = await responseDeviceSensors.json();

      let arrSensors: Array<SensorType> = [];
      for (let id in sensors) {
        arrSensors.push(sensors[id]);
      }

      return arrSensors;
    } catch (error) {}
  },
  async getDeviceSensorValuesForPeriod(id: number, sensorId: number, from: string, to: string, token: string | undefined) {
    try {
      let responseDeviceSensorValuesForPeriod = await fetch('http://api.mechatronics.by:8080/api/3/get_sensors', {
        method: 'POST',
        body: JSON.stringify({
          id: id,
          sensor: sensorId,
          start: from, //utc+3
          finish: to,
        }),
        headers: {
          authorization: `Bearer ${token}`,
          'Content-Type': 'application/json;charset=utf-8',
        },
        redirect: 'follow',
      });

      let sensorValuesForPeriod = await responseDeviceSensorValuesForPeriod.json();

      let arrSensorsValues: Array<SensorValueType> = [];
      for (let valueDate in sensorValuesForPeriod) {
        let date = new Date(valueDate);
        date.setHours(date.getHours() - date.getTimezoneOffset() / 60);

        let newDate = `${date.getFullYear()}-${convertMonth(date.getMonth())}-${convertDate(date.getDate())} ${convertDate(
          date.getHours(),
        )}:${convertDate(date.getMinutes())}:${convertDate(date.getSeconds())}`;

        arrSensorsValues.push({
          date: newDate,
          ...sensorValuesForPeriod[valueDate],
        });
      }

      console.log(arrSensorsValues);
      return arrSensorsValues;
    } catch (error) {}
  },
};
