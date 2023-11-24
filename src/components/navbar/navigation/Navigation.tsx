"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function Navigation() {
  const pathName = usePathname();

  return (
    <div className="flex flex-col pt-28 pr-10">
      <Link
        href={"/review"}
        className={
          pathName.includes("/review")
            ? "bg-white border-l border-gray-500 text-gray-900 px-3 py-2 text-sm font-medium"
            : "text-gray-900 hover:bg-gray-100 hover: px-3 py-2 text-sm font-medium"
        }
      >
        Обзор доступных объектов
      </Link>
      <Link
        href={"/indetail"}
        className={
          pathName.includes("/indetail")
            ? "bg-white border-l border-gray-500 text-gray-900 px-3 py-2 text-sm font-medium"
            : "text-gray-900 hover:bg-gray-100 hover: px-3 py-2 text-sm font-medium"
        }
      >
        Детально
      </Link>
    </div>
  );
}
