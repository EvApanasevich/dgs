export default async function SensorLayout({ params }: { params: { id: number, sensorId: number } }) {
   return (
      <div>
         sensor with ID: {params.sensorId} and device ID: {params.id}
      </div>
   )
}