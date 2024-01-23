import { HomeSvg } from "../icons_svg/HomeSvg";
import { GeneratorSvg } from "../icons_svg/GeneratorSvg";
import Link from "next/link";

type DgsItemPropsType = {
  lang: string;
  deviceId: number;
  deviceName: string;
  reservPower: string;
  time: string;
};

export function DgsItem({
  lang,
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
      } flex flex-col relative w-full border-2 rounded-xl`}
    >
      <span className="absolute font-medium text-xs -top-2 px-1 leading-tight left-8 inline-block bg-white">
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
              ? lang === "RU"
                ? "Питание от ДГУ"
                : "Powered by a diesel generator"
              : lang === "RU"
              ? "Питание от основной сети"
              : "Powered by the main power supply"}
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
            {lang === "RU" ? "Резервный источник " : "The backup source "}
            {reservPower === "in_work"
              ? lang === "RU"
                ? "находится в работе"
                : "is in operation"
              : reservPower === "ready"
              ? lang === "RU"
                ? "готов к пуску"
                : "is ready to start"
              : reservPower === "not_ready"
              ? lang === "RU"
                ? "не готов к пуску"
                : "is not ready to start"
              : lang === "RU"
              ? "не определён"
              : "is not defined"}
          </div>
        </div>
      </div>
      <div className=" mx-auto w-11/12 h-px bg-gray-300"></div>
      <div className="h-10 text-center"></div>
      <span className="text-[0.5rem] text-center">
        {lang === "RU" ? "Обновлено:  " : "updated:  "}
        {time
          ? time
          : lang === "RU"
          ? "нет информации"
          : "no information available"}
      </span>
    </Link>
  );
}
