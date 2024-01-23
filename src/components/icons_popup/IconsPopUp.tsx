"use client";
import { useState } from "react";
import { Icons } from "../icons_svg/Icons";
import "./IconsPopUp.css";
import { COUNT_ICONS } from "../icons_svg/Icons";

type IconsPopUpPropsType = {
  lang: string;
  sensorId: number;
  icons: Array<{ sensorId: number; icon: number }>;
  setIcons: (icons: Array<{ sensorId: number; icon: number }>) => void;
};

export function IconsPopUp({
  lang,
  sensorId,
  icons,
  setIcons,
}: IconsPopUpPropsType) {
  const [isOpenIcons, setIsOpenIcons] = useState(false);

  const clickHandler = (icon: number) => {
    setIcons(
      icons.map((ic) =>
        ic.sensorId === sensorId ? { sensorId: sensorId, icon: icon } : ic
      )
    );
  };

  return (
    <div className="relative">
      <span
        className="cursor-pointer px-3 py-1 mr-2 border border-gray-500"
        onClick={() => setIsOpenIcons(!isOpenIcons)}
      >
        {lang === "RU" ? "сменить иконку:" : "change the icon"}
      </span>
      {isOpenIcons && (
        <div
          onMouseLeave={() => setIsOpenIcons(!isOpenIcons)}
          className="absolute left-10 top-10 flex border rounded-md border-gray-500 z-10 bg-white"
        >
          <div className="rectangle"></div>
          {COUNT_ICONS.map((n) => {
            return (
              <div
                key={n}
                className="icon-item"
                onClick={() => clickHandler(n)}
              >
                <Icons icon={n} color={"gray"} size={"35"} />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
