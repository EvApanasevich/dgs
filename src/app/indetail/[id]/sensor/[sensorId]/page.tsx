export default async function Sensor({ params }: { params: { id: number, sensorId: number } }) {

   // const session = await getServerSession(authConfig)
   // const sensors = await devicesApi.getDeviceSensors(params.id, session?.user.token)

   return (
      <div>
         table sensor ID: {params.sensorId} 
      </div>
   )
}