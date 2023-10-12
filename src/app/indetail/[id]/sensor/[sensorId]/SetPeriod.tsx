'use client'
import { useParams, usePathname, useRouter } from "next/navigation";
import { ChangeEventHandler, MouseEventHandler, useState } from "react";
import { convertMonth, convertDate } from "./utils";

type SetPeriodPropsType = {
   period: { date: string, from: string, to: string }
   setPeriod: (period: { date: string, from: string, to: string }) => void
}

export function SetPeriod({ period, setPeriod }: SetPeriodPropsType) {

   const params = useParams()
   const pathName = usePathname()
   const router = useRouter()
   const [dateFrom, setDateFrom] = useState('')
   const [dateTo, setDateTo] = useState('')

   const periodTitles = [
      ['today', 'Сегодня'],
      ['yesterday', 'Вчера'],
      ['week', 'Неделя'],
      ['month', 'Месяц'],
   ]

   const onClickHandler = (per: string) => {
      setDateFrom('')
      setDateTo('')

      const date = new Date()

      switch (per) {
         case 'today':
            router.push(`/indetail/${params.id}/sensor/${params.sensorId}/${per}`)
            break
         case 'yesterday':
            router.push(`/indetail/${params.id}/sensor/${params.sensorId}/${per}`)
            break
         case 'week':
            router.push(`/indetail/${params.id}/sensor/${params.sensorId}/${per}`)
            break
         case 'month':
            router.push(`/indetail/${params.id}/sensor/${params.sensorId}/${per}`)
            break
         default:
            setPeriod({ date: per, from: `${dateFrom} 00:00:00`, to: `${dateTo} 00:00:00` })
      }
   }

   const handlerFrom: ChangeEventHandler<HTMLInputElement> = (event) => {
      setDateFrom(event.currentTarget.value)
   }
   const handlerTo: ChangeEventHandler<HTMLInputElement> = (event) => {
      setDateTo(event.currentTarget.value)
   }

   return (
      <div>
         <div className="flex pt-4">
            {periodTitles.map(title => {
               return <div onClick={() => onClickHandler(title[0])} className={`${params.period === title[0] ?
                  'bg-gray-200 border border-gray-700' : 'bg-gray-300'} 
                  flex-1 p-2 text-center cursor-pointer`}>{title[1]}</div>
            })}
         </div>
         {/* <div className="py-5">
            <label htmlFor="from">С: {dateFrom}</label>
            <input onChange={handlerFrom} value={dateFrom} className="border border-gray-500 mx-2" name="from" type="date" />
            <label htmlFor="to">По: {dateTo}</label>
            <input onChange={handlerTo} value={dateTo} className="border border-gray-500 mx-2" name="to" type="date" />
            <button onClick={() => onClickHandler('set')} className="border border-gray-500 bg-gray-200 px-2 ml-2">OK</button>
         </div> */}
      </div>
   )
}