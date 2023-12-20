import { getServerSession } from "next-auth/next";
import { devicesApi } from "../api/devices/api_devices";
import { authConfig } from "../../../configs/auth";
import { DeviceType } from "@/types/types";
import Link from "next/link";

export default async function InDetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
//   const session = await getServerSession(authConfig);
//   const devices: DeviceType[] | undefined = await devicesApi.getDevices(
//     session?.user.token
//   );

  return (
    <div className="flex-1 pt-10">
      <div className="border-b border-gray-500 pb-5 pt-2.5">
        <Link
          href="/review"
          className=" text-sm text-gray-800 hover:text-gray-400"
        >
          {"<< Вернуться к списку доступных объектов"}
        </Link>
      </div>
      {/* <ObjectList devices={devices} /> */}
      {children}
    </div>
  );
}
