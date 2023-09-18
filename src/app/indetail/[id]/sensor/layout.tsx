type SensorLayoutPropsType = {
   params: { id: number, sensorId: number }
   children: React.ReactNode
}

export default async function SensorLayout({ params, children }: SensorLayoutPropsType) {
   console.log('lay', params)
   return (
      <div>
         sensor page with device ID: {params.sensorId}
         <div>.....................................................................</div>
         {children}
      </div>
   )
}