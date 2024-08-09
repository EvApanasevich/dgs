import { DgsItem } from '@/components/dgs_item/DgsItem';
import { devicesApi } from '../api/devices/api_devices';
import { getServerSession } from 'next-auth/next';
import { authConfig } from '../../../configs/auth';
import { DeviceType } from '@/types/types';
import { Search } from '@/components/search/search';
import { NavProfile } from '@/components/navbar/nav_profile/NavProfile';
import { Language } from '@/components/language/Language';
import { getUserSettings } from '../../../lib/actions/user_settings.actions';
import { Pagination } from '@/components/pagination/Pagination';

const COUNT_OBJECTS_IN_PAGE = 9;

export default async function Review({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
  const session = await getServerSession(authConfig);
  const devices = await devicesApi.getDevices(session?.user.token);
  const userSettings = await getUserSettings(session?.user.id);

  let filteredDevices: Array<DeviceType> | undefined = [];

  if (!searchParams.search) {
    filteredDevices = devices;
  } else {
    filteredDevices = devices?.filter(device => device.name !== null && device.name.toLowerCase().includes(searchParams.search));
  }

  let devicesForPage: Array<DeviceType> = [];
  if (filteredDevices) {
    devicesForPage = filteredDevices.filter((d, i) => {
      return i < Number(searchParams.page) * COUNT_OBJECTS_IN_PAGE && i >= (Number(searchParams.page) - 1) * COUNT_OBJECTS_IN_PAGE;
    });
  }

  return (
    <div className="flex flex-col">
      <div className="flex justify-between pt-8 pb-6 md:flex-col-reverse md:items-end border-b border-gray-500">
        <div className="flex items-end gap-x-10 xl:gap-x-4 lg820:flex-col-reverse lg820:justify-between lg820:items-start md:items-end">
          <Search lang={userSettings.language} />
          <Language lang={userSettings.language} />
        </div>
        <NavProfile lang={userSettings.language} />
      </div>
      <Pagination countDevices={filteredDevices?.length} countObjectsInPage={COUNT_OBJECTS_IN_PAGE} />
      <div
        className="grid gap-x-8 gap-y-10 grid-cols-3 
      xl:grid-cols-2 xl:px-24 lg820:px-12 lg:px-0  py-8 md:grid-cols-1 md:px-20 sm:px-0 
      scroll-auto"
      >
        {devices &&
          devicesForPage.map(device => {
            return <DgsItem key={device.id} lang={userSettings.language} deviceId={device.id} deviceName={device.name} time={device.time} />;
          })}
      </div>
    </div>
  );
}
