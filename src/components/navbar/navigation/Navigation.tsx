'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"

export function Navigation() {

   const pathName = usePathname()
   
   return (
      <>
         <Link
            href={'/review'}
            className={pathName.includes('/review') ? "bg-white text-gray-900 rounded-lg px-3 py-2 text-sm font-medium" :
               "text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"}
         >
            Обзор
         </Link >
         <Link
            href={'/indetail'}
            className={pathName.includes('/indetail') ? "bg-white text-gray-900 rounded-lg px-3 py-2 text-sm font-medium" :
               "text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"}
         >
            Детально
         </Link >
         <Link
            href={'/trends'}
            className={pathName.includes('/trends') ? "bg-white text-gray-900 rounded-lg px-3 py-2 text-sm font-medium" :
               "text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"}
         >
            Тренды
         </Link >
         <Link
            href={'/messages'}
            className={pathName.includes('/messages') ? "bg-white text-gray-900 rounded-lg px-3 py-2 text-sm font-medium" :
               "text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"}
         >
            Сообщения
         </Link >
         <Link
            href={'/settings'}
            className={pathName.includes('/settings') ? "bg-white text-gray-900 rounded-lg px-3 py-2 text-sm font-medium" :
               "text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"}
         >
            Настройки
         </Link >
      </>

   )
}