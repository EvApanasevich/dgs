import { devicesApi } from '@/app/api/devices/api_devices';
import { GeneratorSvg } from '@/components/icons_svg/GeneratorSvg';
import { HomeSvg } from '@/components/icons_svg/HomeSvg';
import { SensorItem } from '@/components/sensor/SensorItem';
import { ViewBlock } from '@/components/view_block/ViewBlock';
import { getServerSession } from 'next-auth/next';
import { authConfig } from '../../../../configs/auth';
import { SettingsSensors } from '@/components/settings/SettingsSensors';
import { getSensors } from './sensor_utils';
import { getUpdatedSettingsForDevice } from '../../../../lib/actions/settings.actions';
import { BackupPowerSettingsForDeviceType, PowerSettingsForDeviceType, SettingsForDeviceType } from '@/types/types';
import { getUserSettings } from '../../../../lib/actions/user_settings.actions';
import { SettingsPower } from '@/components/settings/SettingsPower';
import { SettingsBackupPower } from '@/components/settings/SettingsBackupPower';
import { getPowerSettingsForDevice } from '../../../../lib/actions/power_settings';
import { globalVars } from '@/app/global_vars';
import { getStatusByPowerSupply } from '@/app/global_funcs';
import { getBackuppowerSettingsForDevice } from '../../../../lib/actions/backuppower_settings';

export default async function ObjectInDetail({ params }: { params: { id: string } }) {
  const session = await getServerSession(authConfig);
  const device = await devicesApi.getDevice(params.id, session?.user.token);
  const userSettings = await getUserSettings(session?.user.id);

  if (!device) {
    return (
      <p className="text-sm text-red-500 pt-5">
        {userSettings.language === 'RU'
          ? 'Информация отсутствует. Попробуйте получить другой девайс.'
          : 'There is no information available. Try to get another device.'}
      </p>
    );
  }

  const sensors = getSensors(device);
  const settingsForDevice: SettingsForDeviceType | null = await getUpdatedSettingsForDevice(device.id);
  const powerSettings: PowerSettingsForDeviceType | null = await getPowerSettingsForDevice(device.id);
  const backuppowerSettings: BackupPowerSettingsForDeviceType | null = await getBackuppowerSettingsForDevice(device.id);

  return (
    <div className="container md:px-0">
      <div className="flex pt-10">
        <p className="text-gray-700 text-lg leading-6 font-bold">{`${device.name ? device.name : 'no name'}`}</p>
      </div>

      <div className="grid grid-cols-2 gap-4 pt-7 md:px-0">
        <ViewBlock
          title={userSettings.language === 'RU' ? 'Питание объекта' : "The object's power supply"}
          borderColor={getStatusByPowerSupply(powerSettings?.powerSettings, sensors, 'hex')}
          gridPos={'lg:col-span-2'}
        >
          <div className="flex gap-4">
            <HomeSvg color={getStatusByPowerSupply(powerSettings?.powerSettings, sensors, 'hex')} size={'32'} />
            <span className="text-xs">
              {!powerSettings?.powerSettings.length
                ? userSettings.language === 'RU'
                  ? 'Необходимо настроить источник питания'
                  : 'The power supply needs to be set up'
                : getStatusByPowerSupply(powerSettings.powerSettings, sensors, 'status') === 'main'
                ? userSettings.language === 'RU'
                  ? 'Питание от основной сети'
                  : 'Powered by the main network'
                : userSettings.language === 'RU'
                ? 'Питание не от основной сети'
                : 'Power is not supplied from the main network'}
            </span>
          </div>
          <div className="absolute right-1 top-1">
            <SettingsPower
              lang={userSettings.language}
              email={session?.user.email}
              userId={session?.user.id}
              deviceId={device.id}
              sensors={sensors}
              settingsSensors={settingsForDevice?.sensors}
              appliedSettings={powerSettings?.powerSettings}
            />
          </div>
        </ViewBlock>
        <ViewBlock
          title={userSettings.language === 'RU' ? 'Резервное электроснабжение' : 'Backup power supply'}
          borderColor={getStatusByPowerSupply(backuppowerSettings?.backuppowerSettings, sensors, 'hex')}
          gridPos={'lg:col-span-2'}
        >
          <div className="flex gap-4">
            <GeneratorSvg color={getStatusByPowerSupply(backuppowerSettings?.backuppowerSettings, sensors, 'hex')} size={'32'} />
            <span className="text-xs">
              {!backuppowerSettings?.backuppowerSettings.length
                ? userSettings.language === 'RU'
                  ? 'Необходимо настроить резервный источник питания'
                  : 'It is necessary to set up a backup power supply'
                : getStatusByPowerSupply(backuppowerSettings?.backuppowerSettings, sensors, 'status') === 'main'
                ? userSettings.language === 'RU'
                  ? 'Резервный источник готов к пуску'
                  : 'The backup source is ready to start'
                : userSettings.language === 'RU'
                ? 'Резервный источник не готов к пуску'
                : 'The backup source is not ready to start'}
            </span>
          </div>
          <div className="absolute right-1 top-1">
            <SettingsBackupPower
              lang={userSettings.language}
              email={session?.user.email}
              userId={session?.user.id}
              deviceId={device.id}
              sensors={sensors}
              settingsSensors={settingsForDevice?.sensors}
              appliedSettings={backuppowerSettings?.backuppowerSettings}
            />
          </div>
        </ViewBlock>
        <ViewBlock
          title={userSettings.language === 'RU' ? 'Параметры' : 'Parameters'}
          borderColor={globalVars.colorUndefinedHEX}
          gridPos={'col-span-2'}
        >
          <div className="flex flex-wrap sm:justify-center">
            {sensors.map(sensor => {
              const visible = settingsForDevice ? settingsForDevice?.sensors.find(sen => sen.id === sensor.id)?.visible : null;

              return (
                (visible === null || visible) && (
                  <SensorItem
                    key={sensor.id}
                    id={sensor.id}
                    deviceId={params.id}
                    icon={settingsForDevice ? settingsForDevice?.sensors.find(sen => sen.id === sensor.id)?.icon : 1}
                    name={settingsForDevice?.sensors ? settingsForDevice?.sensors.find(sen => sen.id === sensor.id)?.newName : sensor.name}
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
              userId={session?.user.id}
              deviceId={device.id}
              sensors={sensors}
              settingsSensors={settingsForDevice?.sensors}
              settingsId={String(settingsForDevice?._id)}
            />
          </div>
        </ViewBlock>
        <ViewBlock
          title={userSettings.language === 'RU' ? 'Диспетчер' : 'Dispatcher'}
          borderColor={globalVars.colorUndefinedHEX}
          gridPos={'lg:col-span-2'}
        >
          <div className="text-xs">{userSettings.language === 'RU' ? 'Диспетчер' : 'Dispatcher'}</div>
        </ViewBlock>
        <ViewBlock
          title={userSettings.language === 'RU' ? 'Сообщения' : 'Messages'}
          borderColor={globalVars.colorUndefinedHEX}
          gridPos={'lg:col-span-2'}
        >
          <div className="text-xs">{userSettings.language === 'RU' ? 'Сообщения' : 'Messages'}</div>
        </ViewBlock>
      </div>
    </div>
  );
}
