import { devicesApi } from "@/app/api/devices/api_devices";
import { GeneratorSvg } from "@/components/icons_svg/GeneratorSvg";
import { HomeSvg } from "@/components/icons_svg/HomeSvg";
import { SensorItem } from "@/components/sensor/SensorItem";
import { ViewBlock } from "@/components/view_block/ViewBlock";
import { getServerSession } from "next-auth/next";
import { authConfig } from "../../../../configs/auth";

export default async function ObjectInDetail({
  params,
}: {
  params: { id: number };
}) {
  const session = await getServerSession(authConfig);
  const device = await devicesApi.getDevice(params.id, session?.user.token);

  const getSensors = () => {
    let arrSensors = [];
    for (let id in device.sensors) {
      arrSensors.push(device.sensors[id]);
    }
    return arrSensors;
  };

  if (!device) {
    return (
      <p className="text-base text-red-500 pt-5">
        Информация отсутствует. Попробуйте получить другой девайс.
      </p>
    );
  }

  return (
    <div className="container">
      <p className="text-2xl font-semibold pt-10">{`"${
        device.name ? device.name : "no name"
      }"`}</p>
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
            {getSensors().map((sensor) => {
              return (
                <SensorItem
                  key={sensor.id}
                  id={sensor.id}
                  deviceId={params.id}
                  name={sensor.name}
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
