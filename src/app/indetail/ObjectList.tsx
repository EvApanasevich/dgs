'use client'

import Link from "next/link"
import { DgsType } from "../review/page"
import { useParams } from "next/navigation"

type ObjectListTypeProps = {
   dgses: DgsType[]
   // paramsId: string | string[]
}

export function ObjectList({ dgses }: ObjectListTypeProps) {

   const params = useParams()
   
   return (
      <div className="flex gap-10 p-10">
         {dgses.map((dgs) => {
            const isActive = dgs.id == params.id
            return <Link
               key={dgs.name}
               className={`${isActive ? `border-b-2 border-gray-500` : ``} px-3 py-2`}
               href={`/indetail/${dgs.id}`} >
               {dgs.name}
            </Link>
         })}
      </div>
   )
}