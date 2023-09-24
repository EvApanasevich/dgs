import { Period } from "./Period"

type SensorTableLayoutPropsType = {
   params: {
      id: number
      sensorId: number
   }
   children: React.ReactNode
}

export default async function SensorTableLayout({ params, children }: SensorTableLayoutPropsType) {

   // const session = await getServerSession(authConfig)
   // const sensors = await devicesApi.getDeviceSensors(params.id, session?.user.token)

   return (
      <div>
         <Period/>
         {children}
      </div>
   )
}