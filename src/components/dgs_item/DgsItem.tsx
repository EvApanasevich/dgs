import { HomeSvg } from "../icons_svg/HomeSvg";
import { GeneratorSvg } from "../icons_svg/GeneratorSvg";
import Link from "next/link";
import { PowerSettingsForDeviceType } from "@/types/types";
import { getPowerSettingsForDevice } from "../../../lib/actions/power_settings";
import { getServerSession } from "next-auth/next";
import { authConfig } from "../../../configs/auth";
import { devicesApi } from "@/app/api/devices/api_devices";
import { getSensors } from "@/app/indetail/[id]/sensor_utils";
import { getStatusByPowerSupply } from "@/app/global_funcs";

type DgsItemPropsType = {
  lang: string;
  deviceId: number;
  deviceName: string;
  reservPower: string;
  time: string;
};

export async function DgsItem({
  lang,
  deviceId,
  deviceName,
  reservPower,
  time,
}: DgsItemPropsType) {
  const powerSettings: PowerSettingsForDeviceType | null =
    await getPowerSettingsForDevice(String(deviceId));
  const session = await getServerSession(authConfig);
  const device = await devicesApi.getDevice(
    String(deviceId),
    session?.user.token
  );
  const sensors = getSensors(device);

  return (
    <Link
      href={`/indetail/${deviceId}`}
      className={
        "border-gray-300 flex flex-col relative w-full border-2 rounded-xl"
      }
    >
      <span className="absolute font-medium text-xs -top-2 px-1 leading-tight left-8 inline-block bg-white">
        {deviceName ? deviceName : "no_name"}:
      </span>

      <div className="flex justify-between">
        <div className="flex flex-col pt-5">
          <div className="mx-auto">
            <HomeSvg
              color={getStatusByPowerSupply(powerSettings, sensors, "hex")}
              size={"25"}
            />
          </div>
          <div className="px-3 py-2 text-center text-[0.6rem]">
            {!powerSettings?.powerSettings.length
              ? lang === "RU"
                ? "Необходимо настроить источник питания"
                : "The power supply needs to be set up"
              : getStatusByPowerSupply(powerSettings, sensors, "status") ===
                "main"
              ? lang === "RU"
                ? "Питание от основной сети"
                : "Powered by the main network"
              : lang === "RU"
              ? "Питание не от основной сети"
              : "Power is not supplied from the main network"}
          </div>
        </div>

        <div className="flex flex-col pt-5">
          <div className="mx-auto">
            <GeneratorSvg color={"#d1d5db"} size={"25"} />
          </div>
          <div className="px-3 py-2 text-center text-[0.6rem]">
            {lang === "RU" ? "Резервный источник " : "The backup source "}
            {lang === "RU" ? "не определён" : "is not defined"}
            {/* {reservPower === "in_work"
              ? lang === "RU"
                ? "находится в работе"
                : "is in operation"
              : reservPower === "ready"
              ? lang === "RU"
                ? "готов к пуску"
                : "is ready to start"
              : reservPower === "not_ready"
              ? lang === "RU"
                ? "не готов к пуску"
                : "is not ready to start"
              : lang === "RU"
              ? "не определён"
              : "is not defined"} */}
          </div>
        </div>
      </div>
      <div className=" mx-auto w-11/12 h-px bg-gray-300"></div>
      <div className="h-10 text-center"></div>
      <span className="text-[0.5rem] text-center">
        {lang === "RU" ? "Обновлено:  " : "updated:  "}
        {time
          ? time
          : lang === "RU"
          ? "нет информации"
          : "no information available"}
      </span>
    </Link>
  );
}
