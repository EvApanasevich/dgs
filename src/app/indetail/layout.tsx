import { getServerSession } from "next-auth/next";
import { devicesApi } from "../api/devices/api_devices";
import { DeviceType } from "../review/page";
import { ObjectList } from "./ObjectList";
import { authConfig } from "../../../configs/auth";

export default async function InDetailLayout({ children }: { children: React.ReactNode }) {

   const session = await getServerSession(authConfig)
   const devices: DeviceType[] | undefined = await devicesApi.getDevices(session?.user.token)

   return (
      <div>
         <ObjectList devices={devices} />
         {children}
      </div>
   )
}