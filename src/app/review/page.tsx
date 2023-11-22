import { DgsItem } from "@/components/dgs_item/DgsItem";
import { devicesApi } from "../api/devices/api_devices";
import { getServerSession } from "next-auth/next";
import { authConfig } from "../../../configs/auth";
import { DeviceType } from "@/types/types";
import { Search } from "@/components/search/search";

export default async function Review({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const session = await getServerSession(authConfig);
  const devices = await devicesApi.getDevices(session?.user.token);

  let filteredDevices: Array<DeviceType> | undefined = [];

  if (!searchParams.search) {
    filteredDevices = devices;
  } else {
    filteredDevices = devices?.filter(
      (device) =>
        device.name !== null &&
        device.name.toLowerCase().includes(searchParams.search)
    );
  }

  return (
    <div>
      <Search />
      <div className="grid gap-x-8 gap-y-10 grid-cols-3 p-12 scroll-auto">
        {devices &&
          filteredDevices?.map((device) => {
            return (
              <DgsItem
                key={device.id}
                deviceId={device.id}
                deviceName={device.name}
                time={device.time}
                reservPower={device.lon > 27 ? "ready" : "not_ready"}
              />
            );
          })}
      </div>
    </div>
  );
}
