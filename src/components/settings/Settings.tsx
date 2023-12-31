"use client"

import { useState } from "react";
import { Modal } from "../modal/Modal";
import { UpdatedSensor, updateSettings } from "../../../lib/actions/settings.actions";
import { useParams, useRouter } from "next/navigation";
import { SensorType } from "@/types/types";
import { useForm } from "react-hook-form";
import Image from "next/image";
import pencilIcon from "../../../public/pencil.png";
import { useSession } from "next-auth/react";

type SettingsPropsType = {
   email: string | undefined
   deviceId: string
   sensors: SensorType[]
   settingsSensors: UpdatedSensor[] | undefined
}

export function Settings({ email, deviceId, sensors, settingsSensors }: SettingsPropsType) {

   const session = useSession();
   const router = useRouter();
   const params = useParams();
   const [isOpen, setIsOpen] = useState(false);
   const userId = session.data?.user.id
   const {
      register,
      formState: {
         errors,
      },
      handleSubmit,
   } = useForm<any>();

   const onSubmit = (data: any) => {
      const arrSensors: Array<UpdatedSensor> = [];

      console.log(data)

      for (let key in data) {
         sensors.forEach(sensor => {
            if (sensor.name === key) {
               const visible = data.visible.includes(key)

               arrSensors.push({
                  visible,
                  newName: data[key],
                  id: sensor.id,
                  name: sensor.name,
                  rate: sensor.rate,
                  value: sensor.value,
               })
            }
         })
      }
      updateSettings({ userId, deviceId, arrSensors });
      router.refresh();
      setIsOpen(false);
   }

   return (
      <div className="text-sm">
         <button className="pl-4 leading-6" onClick={() => setIsOpen(true)}>{'Настроить отображение датчиков >>'}</button>
         <Modal active={isOpen} setActive={setIsOpen}>

            <p className="pb-5"><span className="text-lime-600 font-medium">{email}</span>, сдесь вы можете настроить отображение датчиков и другое</p>

            <form onSubmit={handleSubmit(onSubmit)}>
               <ul>
                  {sensors.map(sensor => {
                     return (
                        <li key={sensor.id} className="flex pb-2">

                           <div className="flex-1 leading-[2.85rem]">
                              <div>{sensor.name}</div>
                           </div>

                           <label htmlFor={`${sensor.id}`}>отображать: </label>
                           <input
                              {...register("visible")}
                              id={`${sensor.id}`}
                              type="checkbox"
                              value={`${sensor.name}`}
                              defaultChecked={
                                 settingsSensors ?
                                 settingsSensors.find(s => s.id === sensor.id)?.visible :
                                 true
                              }
                           />

                           <div>
                              <div className="flex border border-gray-500 rounded-md p-1 mx-3">
                                 <input
                                    {...register(`${sensor.name}`, {
                                       required: "Обязательно к заполнению",
                                       maxLength: { value: 40, message: "Не более 20 символов" },
                                       value: settingsSensors ?
                                          settingsSensors.find(s => s.id === sensor.id)?.newName
                                          : sensor.name
                                    })}
                                    className="outline-none px-2 py-1"
                                    type="text"
                                 />
                                 < Image className="w-5 h-5" src={pencilIcon} alt="pencil" />
                              </div>
                              {errors[`${sensor.name}`] &&
                                 <p className="text-red-400 pl-4">{`${errors[`${sensor.name}`]?.message}`}</p>}
                           </div>

                           <div className="flex-1 leading-[2.85rem]">
                              {sensor.value}
                           </div>
                        </li>
                     )
                  })}
               </ul>
               <button className="border-2 border-lime-500 rounded-md p-2" type="submit">Сохранить настройки</button>
            </form>

         </Modal>
      </div>
   )
}