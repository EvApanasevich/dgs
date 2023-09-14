import { devicesApi } from "../api/devices/api_devices";
import { DeviceType } from "../review/page";
import { ObjectList } from "./ObjectList";

export default async function InDetailLayout({ children }: { children: React.ReactNode }) {

   const devices: DeviceType[] | undefined = await devicesApi.getDevices()

   return (
      <div>
         <ObjectList devices={devices} />
         {children}
      </div>
   )
}