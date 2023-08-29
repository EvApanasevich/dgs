import { DgsType } from "@/app/review/page";
import { HomeSvg } from "../icons_svg/HomeSvg";
import { GeneratorSvg } from "../icons_svg/GeneratorSvg";

type DgsItemPropsType = {
   dgs: DgsType,
}

export function DgsItem({ dgs }: DgsItemPropsType) {

   return (
      <div className={`${dgs.reservPower === 'ready' ? 'border-lime-500' :
         dgs.reservPower === 'in_work' ? 'border-yellow-400' :
            dgs.reservPower === 'not_ready' ? 'border-red-500' : 'border-gray-300'} flex flex-col relative w-80 border-2 rounded-xl`}>
         <span className="absolute font-medium -top-3 px-1 leading-tight left-8 inline-block bg-white">{dgs.name}:</span>

         <div className="flex justify-between">

            <div className="flex flex-col pt-5">
               <div className="mx-auto">
                  <HomeSvg color={`${dgs.reservPower === 'in_work' ? '#facc15' :
                     dgs.reservPower === 'not_ready' || dgs.reservPower === 'ready' ? '#84cc16' : '#d1d5db'}`}
                  />
               </div>
               <div className="px-3 py-2 text-center text-sm">{dgs.reservPower === 'in_work' ? 'Питание от ДГУ' :
                  'Питание от основной сети'}
               </div>
            </div>

            <div className="flex flex-col pt-5">
               <div className="mx-auto">
                  <GeneratorSvg color={`${dgs.reservPower === 'in_work' ? '#facc15' :
                     dgs.reservPower === 'not_ready' ? '#ef4444' : dgs.reservPower === 'ready' ? '#84cc16' : '#d1d5db'}`} />
               </div>
               <div className="px-3 py-2 text-center text-sm">Резервный источник {dgs.reservPower === 'in_work' ? 'находится в работе' :
                  dgs.reservPower === 'ready' ? 'готов к пуску' :
                     dgs.reservPower === 'not_ready' ? 'не готов к пуску' : 'не определён'}
               </div>
            </div>

         </div>
         <div className=" mx-auto w-11/12 h-0.5 bg-gray-300"></div>
         <div className="h-20 text-center"></div>
         <span className="text-[0.6rem] text-center">Обновлено 01.01.2020 в 21:00</span>
      </div>
   )
}