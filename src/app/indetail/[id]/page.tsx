import { devicesApi } from "@/app/api/devices/api_devices";
import { GeneratorSvg } from "@/components/icons_svg/GeneratorSvg";
import { HomeSvg } from "@/components/icons_svg/HomeSvg";
import { SensorItem } from "@/components/sensor/SensorItem";
import { ViewBlock } from "@/components/view_block/ViewBlock";
import { getServerSession } from "next-auth/next";
import { authConfig } from "../../../../configs/auth";
import { Settings } from "@/components/settings/Settings";
import Image from "next/image";
import settingsIcon from "../../../../public/settings.png";
import { getSensors } from "./sensor_utils";
import { getUpdatedSettingsForDevice } from "../../../../lib/actions/settings.actions";
import { SettingsForDeviceType } from "@/types/types";

export default async function ObjectInDetail({
   params,
}: {
   params: { id: string };
}) {

   const session = await getServerSession(authConfig);
   const device = await devicesApi.getDevice(params.id, session?.user.token);

   if (!device) {
      return (
         <p className="text-sm text-red-500 pt-5">
            Информация отсутствует. Попробуйте получить другой девайс.
         </p>
      )
   }

   const sensors = getSensors(device);
   const settingsForDevice: SettingsForDeviceType | null = await getUpdatedSettingsForDevice(device.id);

   return (
      <div className="container">
         <div className="flex pt-10">
            <p className="flex-1 text-lg leading-6 font-semibold">{`${device.name ? device.name : "no name"
               }`}</p>
            <Image className="w-6 h-6" src={settingsIcon} alt="settings" />
            <Settings email={session?.user.email}
               deviceId={device.id}
               sensors={sensors}
               settingsSensors={settingsForDevice?.sensors}
            />
         </div>

         <div className="grid grid-cols-2 gap-4 p-5">
            <ViewBlock title={"Питание объекта"} borderColor={"border-lime-500"}>
               <div className="flex gap-4">
                  <HomeSvg color={`${"#84cc16"}`} size={"32"} />
                  <span className="text-xs">Питание от основной сети</span>
               </div>
            </ViewBlock>
            <ViewBlock
               title={"Резервное электроснабжение"}
               borderColor={device.lon > 27 ? "border-lime-500" : "border-red-500"}
            >
               <div className="flex gap-4">
                  <GeneratorSvg
                     color={device.lon > 27 ? "#84cc16" : "#ef4444"}
                     size={"32"}
                  />
                  <span className="text-xs">
                     {device.lon > 27
                        ? "Резервный источник готов к пуску"
                        : "Резервный источник не готов к пуску"}
                  </span>
               </div>
            </ViewBlock>
            <ViewBlock
               title={"Параметры"}
               borderColor={"border-gray-300"}
               gridPos={"col-span-2"}
            >
               <div className="flex flex-wrap">
                  {sensors.map((sensor) => {
                     return (
                        <SensorItem
                           key={sensor.id}
                           id={sensor.id}
                           deviceId={params.id}
                           name={
                              settingsForDevice?.sensors ?
                                 settingsForDevice?.sensors.find(sen => sen.id === sensor.id)?.newName
                                 : sensor.name
                           }
                           rate={sensor.rate}
                           value={sensor.value}
                        />
                     );
                  })}
               </div>
            </ViewBlock>
            <ViewBlock title={"Диспетчер"} borderColor={"border-gray-300"}>
               <div className="text-xs">Диспетчер</div>
            </ViewBlock>
            <ViewBlock title={"Сообщения"} borderColor={"border-gray-300"}>
               <div className="text-xs">Сообщения</div>
            </ViewBlock>
         </div>
      </div>
   );
}
