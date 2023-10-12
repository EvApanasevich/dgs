import { getServerSession } from "next-auth/next"
import { authConfig } from "../../../../../../configs/auth"
import { devicesApi } from "@/app/api/devices/api_devices"
import { ReportTable } from "./ReportTable"

type SensorTableLayoutPropsType = {
   params: {
      id: number
      sensorId: number
   }
   children: React.ReactNode
}

export default async function SensorTableLayout({ params, children }: SensorTableLayoutPropsType) {

   const session = await getServerSession(authConfig)
   const sensors = await devicesApi.getDeviceSensors(params.id, session?.user.token)

   return (
      <div className="min-h-[64rem]">
         <ReportTable sensors={sensors} />
         {children}
      </div>
   )
}