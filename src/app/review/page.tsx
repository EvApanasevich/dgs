import { DgsItem } from "@/components/dgs_item/DgsItem";

export type DgsType = {
   id: string,
   name: string,
   reservPower: string | null
}

export const dgses: DgsType[] = [
   {
      id: '1',
      name: 'Работа',
      reservPower: 'ready', // not_redy, in_work
   },
   {
      id: '2',
      name: 'Банк',
      reservPower: 'not_ready',
   },
   {
      id: '3',
      name: 'Автомастерская',
      reservPower: 'in_work',
   },
   {
      id: '4',
      name: 'Дача',
      reservPower: 'not_ready', // not_ready, in_work
   },
   {
      id: '5',
      name: 'Склад',
      reservPower: null,
   },
   {
      id: '6',
      name: 'Офис',
      reservPower: 'not_ready',
   },
]

export default function Review() {
   return (
      <div className="grid gap-x-8 gap-y-10 grid-cols-3 p-12">
         {dgses.map(dgs => {
            return <DgsItem key={dgs.name} dgs={dgs} />
         })}
      </div>
   )
}