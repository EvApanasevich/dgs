import { getServerSession } from "next-auth/next"
import { SensorSelect } from "./SensorSelect"
import { authConfig } from "../../../../../configs/auth"
import { devicesApi } from "@/app/api/devices/api_devices"

type SensorLayoutPropsType = {
   params: { id: number }
   children: React.ReactNode
}

export default async function SensorLayout({ params, children }: SensorLayoutPropsType) {

   const session = await getServerSession(authConfig)
   const sensors = await devicesApi.getDeviceSensors(params.id, session?.user.token)

   return (
      <div>
         <SensorSelect sensors={sensors} />
         {children}
      </div>
   )
}