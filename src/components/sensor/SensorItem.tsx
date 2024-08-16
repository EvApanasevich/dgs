import Link from 'next/link';
import { Icons } from '../icons_svg/Icons';

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
    case 'Расход топлива':
    case 'Мгновенный расход топлива':
    case 'Объем топлива в баке':
    case 'Уровень топлива':
      return true;
  }
};

export function SensorItem({ id, icon, deviceId, name, rate, value }: SensorItemPropsType) {
  const isValueNull = value === null || Number(value) === 0;

  return (
    <Link
      // href={`${deviceId}/sensor/${id}/today`}
      href={'#'}
      className="w-28 pb-4 flex flex-col justify-between text-center"
    >
      <div className="flex flex-1 justify-center items-center pb-2 text-[0.75rem] text-gray-700 font-semibold leading-3">
        <div className="overflow-hidden">{name}</div>
      </div>
      <div className="mx-auto">
        <Icons icon={icon} color={isValueNull ? '#d1d5db' : '#4b5563'} size={'35'} />
      </div>
      <div className={`pt-1 text-[0.75rem] ${isValueNull ? 'text-gray-300' : 'text-orange-600'} font-bold`}>
        {value === null ? 0 : value.includes('.') ? Number(value).toFixed(2) : value}
      </div>
    </Link>
  );
}
