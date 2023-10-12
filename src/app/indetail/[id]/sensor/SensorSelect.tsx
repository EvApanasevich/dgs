'use client'
import { SensorType } from "@/types/types"
import { useParams, useRouter } from "next/navigation"

type SensorSelectTypeProps = {
   sensors: Array<SensorType> | undefined
}

export function SensorSelect({ sensors }: SensorSelectTypeProps) {
   const router = useRouter()
   const params = useParams()

   const getNameSelectedSensor = () => {
      let selected
      sensors?.forEach(sensor => {
         if (Number(params.sensorId) === sensor.id) {
            selected = sensor.name
         }
      })
      return selected
   }

   const onChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const currentSensor = sensors?.find((sensor) => {
         return e.currentTarget.value === sensor.name
      })
      router.push(`/indetail/${params.id}/sensor/${currentSensor?.id}/${params.period}`)
   }

   return (
      <>
         <label htmlFor="sensors" className="pr-2">Выберите датчик:</label>
         <select onChange={onChangeHandler} defaultValue={getNameSelectedSensor()} name="sensors" className="bg-gray-200 p-2 rounded-lg">
            {sensors?.map(sensor => {
               return <option key={sensor.id}
                  value={sensor.name}
               >{sensor.name}</option>
            })}
         </select>
      </>
   )
}