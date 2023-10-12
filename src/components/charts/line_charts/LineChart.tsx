'use client'
import React, { useEffect } from 'react';
import {
   Chart as ChartJS,
   CategoryScale,
   LinearScale,
   PointElement,
   LineElement,
   Title,
   Tooltip,
   Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { SensorType, SensorValueType } from '@/types/types';
import { useSession } from 'next-auth/react';
import { useParams } from 'next/navigation';
import { useSensorStore } from '@/app/indetail/[id]/sensor/[sensorId]/store';

type LineChartPropsType = {
   sensors: Array<SensorType> | undefined
}

export function LineChart({ sensors }: LineChartPropsType) {

   const session = useSession()
   const params = useParams()

   const { period, loading, error, sensorsValues, setPeriod, getSensorsValuesForPeriod } = useSensorStore((state) => ({
      period: state.period,
      loading: state.loading,
      error: state.error,
      sensorsValues: state.sensorsValues,
      setPeriod: state.setPeriod,
      getSensorsValuesForPeriod: state.getSensorsValuesForPeriod,
   }))

   ChartJS.register(
      CategoryScale,
      LinearScale,
      PointElement,
      LineElement,
      Title,
      Tooltip,
      Legend
   );

   const options = {
      responsive: true,
      plugins: {
         legend: {
            position: 'top' as const,
         },
         title: {
            display: true,
            text: `Показатели за период с ${period.from} по ${period.to}`,
         },
      },
   };

   const labels = sensorsValues?.map(item => item.date)
   const currentSensName = sensors?.find(sen => sen.id === Number(params.sensorId))

   const data = {
      labels,
      datasets: [
         {
            label: currentSensName?.name,
            data: sensorsValues?.map(item => item.value),
            borderWidth: 1,
            pointRadius: 0,
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
         },
      ],
   };

   useEffect(() => {
      console.log('useefffect')
      getSensorsValuesForPeriod(Number(params.id), Number(params.sensorId), period.from, period.to, session.data?.user.token)
   }, [period])

   if (loading) return <div className="text-red-500">LOADING...</div>

   if (sensorsValues.length === 0) return <div className="text-red-500">Данные за период отсутствуют</div>

   return (
      <div>
         <Line options={options} data={data} />
      </div>
   )
}