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
import { DgsItems } from '@/components/dgs_items/dgs_items';

const COUNT_OBJECTS_IN_PAGE = 12;
const COUNT_PAGES_IN_BLOCK = 5;

export default async function Review({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
  const session = await getServerSession(authConfig);
  const devices: Array<DeviceType> | undefined = await devicesApi.getDevices(session?.user.token);
  const userSettings = await getUserSettings(session?.user.id);

  let filteredDevices: Array<DeviceType> | undefined = [];

  if (!searchParams.search) {
    filteredDevices = devices;
  } else {
    filteredDevices = devices?.filter(device => device.name !== null && device.name.toLowerCase().includes(String(searchParams.search)));
  }

  let devicesForPage: Array<DeviceType> = [];
  if (filteredDevices) {
    devicesForPage = filteredDevices.filter((d, i) => {
      return i < Number(searchParams.page) * COUNT_OBJECTS_IN_PAGE && i >= (Number(searchParams.page) - 1) * COUNT_OBJECTS_IN_PAGE;
    });
  }

  const isNotFoundDevices = Boolean(searchParams.search && devicesForPage.length === 0);

  return (
    <div className="flex flex-col">
      <div className="flex justify-between pt-8 pb-6 md:flex-col-reverse md:items-end border-b border-gray-500">
        <div className="flex items-end gap-x-10 xl:gap-x-4 lg820:flex-col-reverse lg820:justify-between lg820:items-start md:items-end">
          <Search lang={userSettings.language} />
          <Language language={userSettings.language} />
        </div>
        <NavProfile lang={userSettings.language} />
      </div>
      <Pagination
        countDevices={filteredDevices?.length}
        countObjectsInPage={COUNT_OBJECTS_IN_PAGE}
        countPagesInBlock={COUNT_PAGES_IN_BLOCK}
        isNotFoundDevices={isNotFoundDevices}
      />

      {isNotFoundDevices ? (
        <div className="pt-10 text-gray-700 font-medium text-center">
          {userSettings.language === 'RU' ? 'По вашему запросу ничего не найдено...' : 'Nothing was found for your request...'}
        </div>
      ) : (
        <DgsItems devices={devices} devicesForPage={devicesForPage} language={userSettings.language} />
      )}
    </div>
  );
}
