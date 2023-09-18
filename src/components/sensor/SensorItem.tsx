'use client'

import Link from "next/link"
import { SensorSvg } from '../icons_svg/SensorSvg'

type SensorItemPropsType = {
   id: number,
   name: string,
   rate: string | null,
   value: string,
}

const isActiveSensor = (title: string) => {
   switch (title) {
      case 'Напряжение сети':
      case 'Напряжение питания':
      case 'Расход топлива':
      case 'Мгновенный расход топлива':
      case 'Объем топлива в баке':
      case 'Уровень топлива':
         return true
   }
}

export function SensorItem({ id, name, rate, value }: SensorItemPropsType) {
   return (
      <Link href='#' className="w-28 flex flex-col justify-between text-center">
         <div className="flex-1 text-[0.8rem] leading-3">
            {name}
         </div>
         <div className="mx-auto">
            <SensorSvg color={isActiveSensor(name) ? '#84cc16' : '#d1d5db'} />
         </div>
         <div className="text-[0.8rem] pt-2">
            {value === null ? 0 : value.includes('.') ? Number(value).toFixed(2) : value}
         </div>
      </Link>
   )
}