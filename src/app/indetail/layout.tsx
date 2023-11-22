import { getServerSession } from "next-auth/next";
import { devicesApi } from "../api/devices/api_devices";
import { ObjectList } from "./ObjectList";
import { authConfig } from "../../../configs/auth";
import { Search } from "@/components/search/search";
import { DeviceType } from "@/types/types";

export default async function InDetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authConfig);
  const devices: DeviceType[] | undefined = await devicesApi.getDevices(
    session?.user.token
  );

  return (
    <div>
      <ObjectList devices={devices} />
      {children}
    </div>
  );
}
