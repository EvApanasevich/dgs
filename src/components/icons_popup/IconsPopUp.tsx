'use client';
import { useState } from 'react';
import { Icons } from '../icons_svg/Icons';
import './IconsPopUp.css';
import { COUNT_ICONS } from '../icons_svg/Icons';

type IconsPopUpPropsType = {
  lang: string;
  sensorId: number;
  icons: Array<{ sensorId: number; icon: number }>;
  setIcons: (icons: Array<{ sensorId: number; icon: number }>) => void;
};

export function IconsPopUp({ lang, sensorId, icons, setIcons }: IconsPopUpPropsType) {
  const [isOpenIcons, setIsOpenIcons] = useState(false);

  const clickHandler = (icon: number) => {
    setIcons(icons.map(ic => (ic.sensorId === sensorId ? { sensorId: sensorId, icon: icon } : ic)));
  };

  return (
    <div className="relative pb-2">
      <div className="flex items-center">
        <div className="pr-3 text-gray-700 text-base font-medium" onClick={() => setIsOpenIcons(!isOpenIcons)}>
          {lang === 'RU' ? 'Иконка:' : 'Icon'}
        </div>
        <div onClick={() => setIsOpenIcons(!isOpenIcons)} className="cursor-pointer">
          <Icons icon={icons.find(ic => ic.sensorId === sensorId)?.icon} color={'red'} size={'40'} />
        </div>
      </div>

      {isOpenIcons && (
        <div
          onMouseLeave={() => setIsOpenIcons(!isOpenIcons)}
          className="absolute left-12 top-14 flex border rounded-md border-gray-500 z-10 bg-white"
        >
          <div className="rectangle"></div>
          {COUNT_ICONS.map(n => {
            return (
              <div key={n} className="icon-item" onClick={() => clickHandler(n)}>
                <Icons icon={n} color={'gray'} size={'35'} />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
