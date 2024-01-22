"use client";

import { useState } from "react";
import { Icons } from "../icons_svg/Icons";
import "./IconsPopUp.css";

type IconsPopUpPropsType = {
  sensorId: number;
  icons: Array<{ sensorId: number; icon: number }>;
  setIcons: (icons: Array<{ sensorId: number; icon: number }>) => void;
};

export function IconsPopUp({ sensorId, icons, setIcons }: IconsPopUpPropsType) {
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
        сменить иконку:
      </span>
      {isOpenIcons && (
        <div
          onMouseLeave={() => setIsOpenIcons(!isOpenIcons)}
          className="absolute left-10 top-10 flex border rounded-md border-gray-500 z-10 bg-white"
        >
          <div className="rectangle"></div>
          <div className="icon-item" onClick={() => clickHandler(1)}>
            <Icons icon={1} color={"gray"} size={"35"} />
          </div>
          <div className="icon-item" onClick={() => clickHandler(2)}>
            <Icons icon={2} color={"gray"} size={"35"} />
          </div>
          <div className="icon-item" onClick={() => clickHandler(3)}>
            <Icons icon={3} color={"gray"} size={"35"} />
          </div>
        </div>
      )}
    </div>
  );
}
