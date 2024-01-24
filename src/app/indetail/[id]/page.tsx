import { devicesApi } from "@/app/api/devices/api_devices";
import { GeneratorSvg } from "@/components/icons_svg/GeneratorSvg";
import { HomeSvg } from "@/components/icons_svg/HomeSvg";
import { SensorItem } from "@/components/sensor/SensorItem";
import { ViewBlock } from "@/components/view_block/ViewBlock";
import { getServerSession } from "next-auth/next";
import { authConfig } from "../../../../configs/auth";
import { SettingsSensors } from "@/components/settings/SettingsSensors";
import { getSensors } from "./sensor_utils";
import { getUpdatedSettingsForDevice } from "../../../../lib/actions/settings.actions";
import { SettingsForDeviceType } from "@/types/types";
import { getUserSettings } from "../../../../lib/actions/user_settings.actions";
import { SettingsPower } from "@/components/settings/SettingsPower";
import { SettingsBackupPower } from "@/components/settings/SettingsBackupPower";

export default async function ObjectInDetail({
  params,
}: {
  params: { id: string };
}) {
  const session = await getServerSession(authConfig);
  const device = await devicesApi.getDevice(params.id, session?.user.token);
  const userSettings = await getUserSettings(session?.user.id);

  if (!device) {
    return (
      <p className="text-sm text-red-500 pt-5">
        {userSettings.language === "RU"
          ? "Информация отсутствует. Попробуйте получить другой девайс."
          : "There is no information available. Try to get another device."}
      </p>
    );
  }

  const sensors = getSensors(device);
  const settingsForDevice: SettingsForDeviceType | null =
    await getUpdatedSettingsForDevice(device.id);

  return (
    <div className="container">
      <div className="flex pt-10">
        <p className="flex-1 text-lg leading-6 font-semibold">{`${
          device.name ? device.name : "no name"
        }`}</p>
      </div>

      <div className="grid grid-cols-2 gap-4 p-5">
        <ViewBlock
          title={
            userSettings.language === "RU"
              ? "Питание объекта"
              : "The object's power supply"
          }
          borderColor={"border-lime-500"}
        >
          <div className="flex gap-4">
            <HomeSvg color={`${"#84cc16"}`} size={"32"} />
            <span className="text-xs">
              {userSettings.language === "RU"
                ? "Питание от основной сети"
                : "Powered by the main network"}
            </span>
          </div>
          <div className="absolute right-1 top-1">
            <SettingsPower
              lang={userSettings.language}
              email={session?.user.email}
              deviceId={device.id}
              sensors={sensors}
              settingsSensors={settingsForDevice?.sensors}
            />
          </div>
        </ViewBlock>
        <ViewBlock
          title={
            userSettings.language === "RU"
              ? "Резервное электроснабжение"
              : "Backup power supply"
          }
          borderColor={device.lon > 27 ? "border-lime-500" : "border-red-500"}
        >
          <div className="flex gap-4">
            <GeneratorSvg
              color={device.lon > 27 ? "#84cc16" : "#ef4444"}
              size={"32"}
            />
            <span className="text-xs">
              {device.lon > 27
                ? userSettings.language === "RU"
                  ? "Резервный источник готов к пуску"
                  : "The backup source is ready to launch"
                : userSettings.language === "RU"
                ? "Резервный источник не готов к пуску"
                : "The backup source is not ready to start"}
            </span>
          </div>
          <div className="absolute right-1 top-1">
            <SettingsBackupPower
              lang={userSettings.language}
              email={session?.user.email}
              deviceId={device.id}
              sensors={sensors}
              settingsSensors={settingsForDevice?.sensors}
            />
          </div>
        </ViewBlock>
        <ViewBlock
          title={userSettings.language === "RU" ? "Параметры" : "Parameters"}
          borderColor={"border-gray-300"}
          gridPos={"col-span-2"}
        >
          <div className="flex flex-wrap">
            {sensors.map((sensor) => {
              const visible = settingsForDevice
                ? settingsForDevice?.sensors.find((sen) => sen.id === sensor.id)
                    ?.visible
                : null;

              return (
                (visible === null || visible) && (
                  <SensorItem
                    key={sensor.id}
                    id={sensor.id}
                    deviceId={params.id}
                    icon={
                      settingsForDevice
                        ? settingsForDevice?.sensors.find(
                            (sen) => sen.id === sensor.id
                          )?.icon
                        : 1
                    }
                    name={
                      settingsForDevice?.sensors
                        ? settingsForDevice?.sensors.find(
                            (sen) => sen.id === sensor.id
                          )?.newName
                        : sensor.name
                    }
                    rate={sensor.rate}
                    value={sensor.value}
                  />
                )
              );
            })}
          </div>
          <div className="absolute right-1 top-1">
            <SettingsSensors
              lang={userSettings.language}
              email={session?.user.email}
              deviceId={device.id}
              sensors={sensors}
              settingsSensors={settingsForDevice?.sensors}
            />
          </div>
        </ViewBlock>
        <ViewBlock
          title={userSettings.language === "RU" ? "Диспетчер" : "Dispatcher"}
          borderColor={"border-gray-300"}
        >
          <div className="text-xs">
            {userSettings.language === "RU" ? "Диспетчер" : "Dispatcher"}
          </div>
        </ViewBlock>
        <ViewBlock
          title={userSettings.language === "RU" ? "Сообщения" : "Messages"}
          borderColor={"border-gray-300"}
        >
          <div className="text-xs">
            {userSettings.language === "RU" ? "Сообщения" : "Messages"}
          </div>
        </ViewBlock>
      </div>
    </div>
  );
}
