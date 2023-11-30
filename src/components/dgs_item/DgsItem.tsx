import { HomeSvg } from "../icons_svg/HomeSvg";
import { GeneratorSvg } from "../icons_svg/GeneratorSvg";
import Link from "next/link";

type DgsItemPropsType = {
  deviceId: number;
  deviceName: string;
  reservPower: string;
  time: string;
};

export function DgsItem({
  deviceId,
  deviceName,
  reservPower,
  time,
}: DgsItemPropsType) {
  return (
    <Link
      href={`/indetail/${deviceId}`}
      className={`${
        reservPower === "ready"
          ? "border-lime-500"
          : reservPower === "in_work"
          ? "border-yellow-400"
          : reservPower === "not_ready"
          ? "border-red-500"
          : "border-gray-300"
      }font-sans font-bold flex flex-col relative w-full border-2 rounded-xl`}
    >
      <span className="absolute font-medium text-xs -top-3 px-1 leading-tight left-8 inline-block bg-white">
        {deviceName ? deviceName : "no_name"}:
      </span>

      <div className="flex justify-between">
        <div className="flex flex-col pt-5">
          <div className="mx-auto">
            <HomeSvg
              color={`${
                reservPower === "in_work"
                  ? "#facc15"
                  : reservPower === "not_ready" || reservPower === "ready"
                  ? "#84cc16"
                  : "#d1d5db"
              }`}
              size={"25"}
            />
          </div>
          <div className="px-3 py-2 text-center text-[0.6rem]">
            {reservPower === "in_work"
              ? "Питание от ДГУ"
              : "Питание от основной сети"}
          </div>
        </div>

        <div className="flex flex-col pt-5">
          <div className="mx-auto">
            <GeneratorSvg
              color={`${
                reservPower === "in_work"
                  ? "#facc15"
                  : reservPower === "not_ready"
                  ? "#ef4444"
                  : reservPower === "ready"
                  ? "#84cc16"
                  : "#d1d5db"
              }`}
              size={"25"}
            />
          </div>
          <div className="px-3 py-2 text-center text-[0.6rem]">
            Резервный источник{" "}
            {reservPower === "in_work"
              ? "находится в работе"
              : reservPower === "ready"
              ? "готов к пуску"
              : reservPower === "not_ready"
              ? "не готов к пуску"
              : "не определён"}
          </div>
        </div>
      </div>
      <div className=" mx-auto w-11/12 h-px bg-gray-300"></div>
      <div className="h-10 text-center"></div>
      <span className="text-[0.5rem] text-center">
        Обновлено: {time ? time : "нет информации"}
      </span>
    </Link>
  );
}
