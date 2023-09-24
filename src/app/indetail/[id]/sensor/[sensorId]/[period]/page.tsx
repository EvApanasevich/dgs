export default async function Period({ params }: { params: { id: number, sensorId: number, period: string } }) {

   // const session = await getServerSession(authConfig)
   // const sensors = await devicesApi.getDeviceSensors(params.id, session?.user.token)

   return (
      <div>
         page of sensor data from period: {params.period} with sensor ID: {params.sensorId}
      </div>
   )
}