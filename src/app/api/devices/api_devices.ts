import { DeviceType } from "@/app/review/page";

export const authApi = {
   async authorize(cred: { email: string, password: string, language: string }) {

      let formData = new FormData();
      formData.append("email", cred.email);
      formData.append("password", cred.password);
      formData.append("lang", cred.language);

      const response = await fetch("http://api.mechatronics.by/api/3/login", {
         method: 'POST',
         body: formData,
         redirect: 'follow'
      })
      const user = await response.json();

      process.env.TOKEN = user.token;

      return user
   }
}

export const devicesApi = {
   async getDevices() {
      try {
         let responseDevices = await fetch("http://api.mechatronics.by/api/3/get_devices", {
            method: 'POST',
            headers: {
               'authorization': `Bearer ${process.env.TOKEN}`
            },
            redirect: 'follow'
         })
         const devices = await responseDevices.json();

         let arrDevices = [];
         for (let id in devices) {
            arrDevices.push(devices[id]);
         }

         return arrDevices

      } catch (e) {
         console.log(e)
      }
   },
   async getDevice(id: number) {
      try {
         let responseDeviceProperties = await fetch("http://api.mechatronics.by/api/3/get_device", {
            method: 'POST',
            body: JSON.stringify({ id: id }),
            headers: {
               'authorization': `Bearer ${process.env.TOKEN}`,
               'Content-Type': 'application/json;charset=utf-8'
            },
            redirect: 'follow'
         })

         return await responseDeviceProperties.json();

      } catch (error) {
         if (error)
            console.log('from One device', error)
      }
   }
}