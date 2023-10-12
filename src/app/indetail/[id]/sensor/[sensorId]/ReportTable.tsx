'use client'
import { LineChart } from "@/components/charts/line_charts/LineChart";
import { SetPeriod } from "./SetPeriod";
import { useSensorStore } from "./store";
import { SensorType } from "@/types/types";

type ReportTablePropsType = {
   sensors: Array<SensorType> | undefined
}

export function ReportTable({ sensors }: ReportTablePropsType) {

   const { period, setPeriod } = useSensorStore((state) => ({
      period: state.period,
      setPeriod: state.setPeriod,
   }))

   return (
      <div>
         <SetPeriod period={period} setPeriod={setPeriod} />
         <LineChart sensors={sensors}/>
      </div>
   )
}