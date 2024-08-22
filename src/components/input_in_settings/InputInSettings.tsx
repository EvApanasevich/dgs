'use client';

import { useState } from 'react';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import Image from 'next/image';
import pencilIcon from '../../../public/pencil.png';
import { SensorType } from '@/types/types';

type InputInSettingsPropsType = {
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
  lang: string;
  sensor: SensorType;
  sensorName: string | undefined;
};

export function InputInSettings({ register, errors, lang, sensor, sensorName }: InputInSettingsPropsType) {
  const [activeInput, setActiveInput] = useState<boolean>(false);

  return (
    <div className="flex pb-2 lg:flex-col">
      <span className="text-base font-semibold text-gray-700 pr-3">{lang === 'RU' ? 'Имя датчика: ' : 'Name of the sensor: '}</span>

      <div className="flex">
        <div
          className={`flex border-b-2 ${activeInput ? 'border-orange-700' : 'border-gray-300'} lg:justify-between lg:w-2/3 sm:w-full transition-all`}
        >
          <input
            {...register(`${sensor.name}`, {
              required: lang === 'RU' ? 'Обязательно к заполнению' : 'Required to be filled in',
              maxLength: {
                value: 50,
                message: 'Не более 50 символов',
              },
              value: sensorName,
            })}
            onFocus={() => setActiveInput(!activeInput)}
            onBlur={() => setActiveInput(!activeInput)}
            className="outline-none pl-2 text-base text-gray-600"
            type="text"
          />
        </div>
        {!activeInput && <Image className="w-5 h-5" src={pencilIcon} alt="pencil" />}
      </div>

      {errors[`${sensor.name}`] && <p className="text-red-400 pl-4">{`${errors[`${sensor.name}`]?.message}`}</p>}
    </div>
  );
}
