import { DeviceType } from '@/types/types';
import { DgsItem } from '../dgs_item/DgsItem';

type DgsItemsPropsType = {
  devices: Array<DeviceType> | undefined;
  devicesForPage: Array<DeviceType>;
  language: string;
};

export function DgsItems({ devices, devicesForPage, language }: DgsItemsPropsType) {
  return (
    <div
      className="grid gap-x-8 gap-y-10 grid-cols-3 
      xl:grid-cols-2 xl:px-24 lg820:px-12 lg:px-0  py-8 md:grid-cols-1 md:px-20 sm:px-0 
      scroll-auto"
    >
      {devices &&
        devicesForPage.map(device => {
          return <DgsItem key={device.id} lang={language} deviceId={device.id} deviceName={device.name} time={device.time} />;
        })}
    </div>
  );
}
