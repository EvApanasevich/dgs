import Link from "next/link";
import { Icons } from "../icons_svg/Icons";

type SensorItemPropsType = {
  id: number;
  icon: number | undefined;
  deviceId: string;
  name: string | undefined;
  rate: string | null;
  value: string;
};

const isActiveSensor = (title: string) => {
  switch (title) {
    case "Расход топлива":
    case "Мгновенный расход топлива":
    case "Объем топлива в баке":
    case "Уровень топлива":
      return true;
  }
};

export function SensorItem({
  id,
  icon,
  deviceId,
  name,
  rate,
  value,
}: SensorItemPropsType) {
  return (
    <Link
      // href={`${deviceId}/sensor/${id}/today`}
      href={"#"}
      className="w-28 pb-3 flex flex-col justify-between text-center"
    >
      <div className="flex-1 text-[0.6rem] leading-3">{name}</div>
      <div className="mx-auto">
        <Icons
          icon={icon}
          color={value === null || Number(value) === 0 ? "#d1d5db" : "#84cc16"}
          size={"35"}
        />
      </div>
      <div className="text-[0.6rem] pt-2">
        {value === null
          ? 0
          : value.includes(".")
          ? Number(value).toFixed(2)
          : value}
      </div>
    </Link>
  );
}
