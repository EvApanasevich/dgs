"use client";

import { useRouter } from "next/navigation";
import { SettingsSvg } from "../icons_svg/SettingsSvg";

type ViewBlockPropsType = {
  children: React.ReactNode;
  title: string;
  borderColor: string;
  gridPos?: string;
};

export function ViewBlock({
  children,
  title,
  borderColor,
  gridPos,
}: ViewBlockPropsType) {
  const router = useRouter();

  return (
    <div className={`${borderColor} ${gridPos} relative border-2 rounded-xl`}>
      <span className="absolute inline-block font-medium text-xs -top-2 left-8 px-1 leading-tight bg-white">
        {title}:
      </span>
      <div className="p-5">{children}</div>
    </div>
  );
}
