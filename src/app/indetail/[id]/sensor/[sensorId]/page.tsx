import { getServerSession } from "next-auth/next";
import { ReportTable } from "./ReportTable";
import { authConfig } from "../../../../../../configs/auth";
import { devicesApi } from "@/app/api/devices/api_devices";

export default async function Sensor({ params }: { params: { id: number, sensorId: number } }) {

   const session = await getServerSession(authConfig)
   const sensors = await devicesApi.getDeviceSensors(params.id, session?.user.token)

   return (
      <div className="min-h-[64rem]">
         <ReportTable sensors={sensors}/>
      </div>
   )
}