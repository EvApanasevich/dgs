import { DgsItem } from "@/components/dgs_item/DgsItem";
import { devicesApi } from "../api/devices/api_devices";

export type DeviceType = {
   id: number
   name: string
   lat: number
   lot: number
   time: string
}

export default async function Review() {

   const devices = await devicesApi.getDevices()

   return (
      <div>
         <div className="grid gap-x-8 gap-y-10 grid-cols-3 p-12 scroll-auto">
            {devices && devices.map(device => {
               return <DgsItem
                  key={device.id}
                  deviceId={device.id}
                  deviceName={device.name}
                  time={device.time}
                  reservPower={device.lon > 27 ? 'ready' : 'not_ready'} />
            })}
         </div>
      </div>

   )
}