'use client'
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

export function Period() {

   const params = useParams()
   const pathName = usePathname()

   // const periods = [
   //    {today: 'Сегодня'},
   //    {yesterday: 'Вчера'},
   //    {week: 'Неделя'},
   //    {month: 'Месяц'},
   // ]

   return (
      <div className="flex pt-4">
         <Link href={`/indetail/${params.id}/sensor/${params.sensorId}/today`}
            className={`${pathName.includes('/today') ?
               'bg-gray-200 border border-gray-700' : 'bg-gray-300'} flex-1   p-2 text-center`}>Сегодня</Link>
         <Link href={`/indetail/${params.id}/sensor/${params.sensorId}/yesterday`}
            className={`${pathName.includes('/yesterday') ?
            'bg-gray-200 border border-gray-700' : 'bg-gray-300'} flex-1   p-2 text-center`}>Вчера</Link>
         <Link href={`/indetail/${params.id}/sensor/${params.sensorId}/week`}
            className={`${pathName.includes('/week') ?
            'bg-gray-200 border border-gray-700' : 'bg-gray-300'} flex-1   p-2 text-center`}>Неделя</Link>
         <Link href={`/indetail/${params.id}/sensor/${params.sensorId}/month`}
            className={`${pathName.includes('/month') ?
            'bg-gray-200 border border-gray-700' : 'bg-gray-300'} flex-1   p-2 text-center`}>Месяц</Link>
      </div>
   )
}