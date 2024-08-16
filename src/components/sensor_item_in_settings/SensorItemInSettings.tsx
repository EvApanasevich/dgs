import { SensorType } from '@/types/types';
import { useState } from 'react';
import Image from 'next/image';
import pencilIcon from '../../../public/pencil.png';
import { useForm } from 'react-hook-form';
import { UpdatedSensor } from '../../../lib/actions/settings.actions';
import { IconsPopUp } from '../icons_popup/IconsPopUp';
import { Icons } from '../icons_svg/Icons';

type IconType = {
  sensorId: number;
  icon: number;
};

type SensorItemInSettingsPropsType = {
  sensor: SensorType;
  settingsSensors: UpdatedSensor[] | undefined;
  lang: string;
  icons: Array<IconType>;
  setIcons: (icons: Array<IconType>) => void;
};

export function SensorItemInSettings({ sensor, settingsSensors, lang, icons, setIcons }: SensorItemInSettingsPropsType) {
  const [editMode, setEditMode] = useState<boolean>(false);
  //const [value, setValue] = useState<string | undefined>(settingsSensors ? settingsSensors.find(s => s.id === sensor.id)?.newName : sensor.name);

  const {
    register,
    formState: { errors },
  } = useForm<any>();

  return (
    <li key={sensor.id} className="flex flex-col mb-4 px-2 pt-1 border border-gray-500 rounded-md">
      <div className="flex pb-2 lg:flex-col">
        {editMode ? (
          <input
            {...register(`${sensor.name}`, {
              required: lang === 'RU' ? 'Обязательно к заполнению' : 'Required to be filled in',
              maxLength: {
                value: 50,
                message: 'Не более 50 символов',
              },
              value: settingsSensors ? settingsSensors.find(s => s.id === sensor.id)?.newName : sensor.name,
            })}
            autoFocus
            onBlur={() => setEditMode(false)}
            //onChange={e => setValue(e.currentTarget.value)}
            className="w-auto text-base text-gray-700 font-semibold outline-none ml-3"
            type="text"
          />
        ) : (
          <div className="text-base text-gray-700 font-semibold ml-3 mr-2">{sensor.name}</div>
        )}
        {!editMode && (
          <div onClick={() => setEditMode(true)}>
            <Image className="w-6 h-6" src={pencilIcon} alt="pencil" />
          </div>
        )}
      </div>

      <div className="">
        <div className="flex pb-4 lg:flex-col">
          <div className="flex lg:justify-between"></div>
          {errors[`${sensor.name}`] && <p className="text-red-400 pl-4">{`${errors[`${sensor.name}`]?.message}`}</p>}
        </div>
        <div className="flex lg:flex-col">
          <div className="flex pr-5 lg:pb-3">
            <IconsPopUp lang={lang} sensorId={sensor.id} icons={icons} setIcons={setIcons} />

            <Icons icon={icons.find(ic => ic.sensorId === sensor.id)?.icon} color={'red'} size={'25'} />
          </div>
          <div className="flex">
            <span className="px-3 leading-6 lg:pl-0">{lang === 'RU' ? 'Отображать датчик: ' : 'display the sensor '}</span>
            <input
              {...register('visible')}
              type="checkbox"
              value={`${sensor.name}`}
              defaultChecked={settingsSensors ? settingsSensors.find(s => s.id === sensor.id)?.visible : true}
            />
          </div>
        </div>
      </div>
    </li>
  );
}
