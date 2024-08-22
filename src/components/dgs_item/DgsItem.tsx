import { HomeSvg } from '../icons_svg/HomeSvg';
import { GeneratorSvg } from '../icons_svg/GeneratorSvg';
import Link from 'next/link';
import { BackupPowerSettingsForDeviceType, PowerSettingsForDeviceType } from '@/types/types';
import { getPowerSettingsForDevice } from '../../../lib/actions/power_settings';
import { getServerSession } from 'next-auth/next';
import { authConfig } from '../../../configs/auth';
import { devicesApi } from '@/app/api/devices/api_devices';
import { getSensors } from '@/app/indetail/[id]/sensor_utils';
import { getStatusByPowerSupply } from '@/app/global_funcs';
import { getBackuppowerSettingsForDevice } from '../../../lib/actions/backuppower_settings';

type DgsItemPropsType = {
  lang: string;
  deviceId: number;
  deviceName: string;
  time: string;
};

export async function DgsItem({ lang, deviceId, deviceName, time }: DgsItemPropsType) {
  const powerSettings: PowerSettingsForDeviceType | null = await getPowerSettingsForDevice(String(deviceId));
  const backuppowerSettings: BackupPowerSettingsForDeviceType | null = await getBackuppowerSettingsForDevice(String(deviceId));
  const session = await getServerSession(authConfig);
  const device = await devicesApi.getDevice(String(deviceId), session?.user.token);
  const sensors = getSensors(device);

  return (
    <Link
      href={`/indetail/${deviceId}`}
      style={{
        borderColor: getStatusByPowerSupply(backuppowerSettings?.backuppowerSettings, sensors, 'hex'),
      }}
      className={'relative flex flex-col w-full border-2 rounded-xl border-gray-300 bg-stone-50 hover:shadow-lg transition-all'}
    >
      <span className="absolute font-medium text-xs -top-2 px-2 leading-tight left-8 inline-block bg-stone-50">
        {deviceName ? deviceName : 'no_name'}:
      </span>

      <div className="flex justify-between">
        <div className="flex flex-col pt-5">
          <div className="mx-auto">
            <HomeSvg color={getStatusByPowerSupply(powerSettings?.powerSettings, sensors, 'hex')} size={'25'} />
          </div>
          <div className="px-3 py-2 text-center text-[0.6rem]">
            {!powerSettings?.powerSettings.length
              ? lang === 'RU'
                ? 'Необходимо настроить источник питания'
                : 'The power supply needs to be set up'
              : getStatusByPowerSupply(powerSettings.powerSettings, sensors, 'status') === 'main'
              ? lang === 'RU'
                ? 'Питание от основной сети'
                : 'Powered by the main network'
              : lang === 'RU'
              ? 'Питание не от основной сети'
              : 'Power is not supplied from the main network'}
          </div>
        </div>

        <div className="flex flex-col pt-5">
          <div className="mx-auto">
            <GeneratorSvg color={getStatusByPowerSupply(backuppowerSettings?.backuppowerSettings, sensors, 'hex')} size={'25'} />
          </div>
          <div className="px-3 py-2 text-center text-[0.6rem]">
            {!backuppowerSettings?.backuppowerSettings.length
              ? lang === 'RU'
                ? 'Необходимо настроить резервный источник питания'
                : 'It is necessary to set up a backup power supply'
              : getStatusByPowerSupply(backuppowerSettings?.backuppowerSettings, sensors, 'status') === 'main'
              ? lang === 'RU'
                ? 'Резервный источник готов к пуску'
                : 'The backup source is ready to start'
              : lang === 'RU'
              ? 'Резервный источник не готов к пуску'
              : 'The backup source is not ready to start'}
          </div>
        </div>
      </div>
      <div className=" mx-auto w-11/12 h-px bg-gray-300"></div>
      <div className="h-10 text-center"></div>
      <span className="text-[0.5rem] text-center">
        {lang === 'RU' ? 'Обновлено:  ' : 'updated:  '}
        {time ? time : lang === 'RU' ? 'нет информации' : 'no information available'}
      </span>
    </Link>
  );
}
