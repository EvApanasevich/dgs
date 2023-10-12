import { devicesApi } from "@/app/api/devices/api_devices";
import { LineChart } from "@/components/charts/line_charts/LineChart";
import { getServerSession } from "next-auth/next";
import { authConfig } from "../../../../../../../configs/auth";
import { convertDate, convertMonth } from "../utils";

export default async function Period({ params }: { params: { id: number, sensorId: number, period: string } }) {

   const session = await getServerSession(authConfig)
   const sensors = await devicesApi.getDeviceSensors(params.id, session?.user.token)

   const currDate = new Date();

   const year = currDate.getFullYear();
   const month = convertMonth(currDate.getMonth());
   const date = convertDate(currDate.getDate());
   const day = currDate.getDay();
   const hours = convertDate(currDate.getHours());
   const minutes = convertDate(currDate.getMinutes());
   const seconds = convertDate(currDate.getSeconds());
   const midnight = '00:00:00';
   
   let from = `${year}-${month}`;
   const to = `${year}-${month}-${date} ${hours}:${minutes}:${seconds}`;

   if (params.period === 'today') {
      from = `${from}-${date} ${midnight}`
   }
   if (params.period === 'yesterday') {
      from = `${from}-${+date - 1} ${midnight}`
   }
   if (params.period === 'week') {
      from = `${from}-${+date - day + 1} ${midnight}`
   }
   if (params.period === 'month') {
      from = `${from}-01 ${midnight}`
   }

   const sensorsValues = await devicesApi.getDeviceSensorValuesForPeriod(
      params.id, params.sensorId, from, to, session?.user.token)

   return (
      <div className="pt-5 pb-10">
         period page
         <LineChart sensors={sensors} sensorsValues={sensorsValues} from={from} to={to}/>
      </div>
   )
}