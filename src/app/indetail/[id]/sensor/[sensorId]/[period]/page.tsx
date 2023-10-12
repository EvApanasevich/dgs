import { devicesApi } from "@/app/api/devices/api_devices";
import { LineChart } from "@/components/charts/line_charts/LineChart";
import { getServerSession } from "next-auth/next";
import { authConfig } from "../../../../../../../configs/auth";

export default async function Period({ params }: { params: { id: number, sensorId: number, period: string } }) {

   //const session = await getServerSession(authConfig)
   //const sensors = await devicesApi.getDeviceSensors(params.id, session?.user.token)
   
   return (
      <div className="pt-5 pb-10">
         period page
      </div>
   )
}