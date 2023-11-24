import { getServerSession } from "next-auth/next";
import { authConfig } from "../../../../../../configs/auth";
import { devicesApi } from "@/app/api/devices/api_devices";

export default async function Sensor({
  params,
}: {
  params: { id: number; sensorId: number };
}) {
  const session = await getServerSession(authConfig);
  //   const sensors = await devicesApi.getDeviceSensors(
  //     params.id,
  //     session?.user.token
  //   );

  return <div></div>;
}
