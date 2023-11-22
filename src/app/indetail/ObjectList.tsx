"use client";

import { DeviceType } from "@/types/types";
import Link from "next/link";
import { useParams } from "next/navigation";

type ObjectListTypeProps = {
  devices: DeviceType[] | undefined;
};

export function ObjectList({ devices }: ObjectListTypeProps) {
  const params = useParams();

  return (
    <div className="flex flex-wrap box-border max-w-5xl p-10">
      {devices &&
        devices.map((device) => {
          const isActive = String(device.id) == params.id;
          return (
            <Link
              key={device.id}
              className={`${
                isActive ? `border bg-gray-100 rounded-lg border-gray-500` : ``
              } px-3 py-2`}
              href={`/indetail/${device.id}`}
            >
              {device && device.name ? device.name : "no_name"}
            </Link>
          );
        })}
    </div>
  );
}
