'use client';

import { useState } from 'react';
import { Modal } from '../modal/Modal';
import { UpdatedSensor, updateSettings, resetSettings } from '../../../lib/actions/settings.actions';
import { useParams, useRouter } from 'next/navigation';
import { SensorType } from '@/types/types';
import { useForm } from 'react-hook-form';

import { Icons } from '../icons_svg/Icons';
import { IconsPopUp } from '../icons_popup/IconsPopUp';
import { SettingsSvg } from '../icons_svg/SettingsSvg';
import { SuccessModal } from '../success_modal/SuccessModal';
import { Loading } from '../loading/Loading';
import { InputInSettings } from '../input_in_settings/InputInSettings';
import { ResetSettings } from '../reset_settings/ResetSettings';

type SettingsPropsType = {
  lang: string;
  email: string | undefined;
  userId: number | undefined;
  deviceId: string;
  settingsId: string | undefined;
  sensors: SensorType[];
  settingsSensors: UpdatedSensor[] | undefined;
};

export function SettingsSensors({ lang, email, userId, deviceId, sensors, settingsSensors, settingsId }: SettingsPropsType) {
  const router = useRouter();
  const params = useParams();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isSavingSettings, setIsSavingSettings] = useState<boolean>(false);
  const [isResetingSettings, setIsResetingSettings] = useState<boolean>(false);
  const [icons, setIcons] = useState<Array<{ sensorId: number; icon: number }>>(() => initIcons(settingsSensors));
  const [isOpenSuccessModal, setIsOpenSuccessModal] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<any>();

  function initIcons(settingsSensors: UpdatedSensor[] | undefined) {
    const arrIcons: Array<{ sensorId: number; icon: number }> = [];
    sensors.forEach(sensor => {
      if (settingsSensors) {
        arrIcons.push({
          sensorId: sensor.id,
          icon: Number(settingsSensors.find(s => s.id === sensor.id)?.icon),
        });
      } else {
        arrIcons.push({
          sensorId: sensor.id,
          icon: 1,
        });
      }
    });
    return arrIcons;
  }

  const onSubmit = async (data: any) => {
    setIsSavingSettings(true);
    const arrSensors: Array<UpdatedSensor> = [];

    for (let key in data) {
      sensors.forEach(sensor => {
        if (sensor.name === key) {
          const visible = data.visible.includes(key);
          const icon = icons.find(ic => ic.sensorId === sensor.id)?.icon;

          arrSensors.push({
            icon: icon,
            visible: visible,
            newName: data[key],
            id: sensor.id,
            name: sensor.name,
            rate: sensor.rate,
            value: sensor.value,
          });
        }
      });
    }

    const OK = await updateSettings({ userId, deviceId, arrSensors });

    if (OK) {
      setIsSavingSettings(false);
      setTimeout(() => {
        setTimeout(() => {
          setIsOpenSuccessModal(false);
        }, 3000);
        setIsOpenSuccessModal(true);
      }, 500);
    } else {
      setIsSavingSettings(false);
    }

    router.refresh();
    setIsOpenModal(false);
  };

  const resetSettingsHandler = async () => {
    setIsResetingSettings(true);

    try {
      const OK = await resetSettings(settingsId);

      if (OK) {
        setIsResetingSettings(false);
        setTimeout(() => {
          setTimeout(() => {
            setIsOpenSuccessModal(false);
          }, 3000);
          setIsOpenSuccessModal(true);
        }, 500);
      }
    } catch (error) {
      setError(true);
      setTimeout(() => {
        setTimeout(() => {
          setIsOpenSuccessModal(false);
        }, 3000);
        setIsOpenSuccessModal(true);
      }, 500);
    }

    router.refresh();
    setIsResetingSettings(false);
    setIsOpenModal(false);
  };

  return (
    <div className="text-sm">
      <SuccessModal error={error} isOpenSuccessModal={isOpenSuccessModal} lang={lang} />

      <div className="" onClick={() => setIsOpenModal(true)}>
        <SettingsSvg title={lang === 'RU' ? 'Настройки отображения датчиков' : 'Sensor display settings'} color={'#616161'} size={'25'} />
      </div>

      <Modal active={isOpenModal} setActive={setIsOpenModal}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ul>
            {sensors.map(sensor => {
              const sensorName = settingsSensors ? settingsSensors.find(s => s.id === sensor.id)?.newName : sensor.name;

              return (
                <li key={sensor.id} className="flex flex-col p-2 border border-gray-500 rounded-md mb-4">
                  <div className="flex pb-2 justify-between lg:flex-col">
                    <div className="font-bold text-lg text-orange-700 overflow-hidden">{sensorName}</div>
                    <div className="flex font-medium text-end text-lime-700">{sensor.value !== null ? sensor.value : 0}</div>
                  </div>
                  <div className="">
                    <InputInSettings register={register} errors={errors} lang={lang} sensor={sensor} sensorName={sensorName} />

                    <div className="flex flex-col">
                      <IconsPopUp lang={lang} sensorId={sensor.id} icons={icons} setIcons={setIcons} />

                      <div className="flex">
                        <span className="text-base font-semibold text-gray-700 pr-3">
                          {lang === 'RU' ? 'Отображать датчик: ' : 'display the sensor '}
                        </span>
                        <input
                          {...register('visible')}
                          type="checkbox"
                          value={`${sensor.name}`}
                          defaultChecked={settingsSensors ? settingsSensors.find(s => s.id === sensor.id)?.visible : true}
                          className="w-5 h-5"
                        />
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>

          <div className="flex justify-between">
            <button
              className={`relative p-2 mt-5 text-base text-stone-50 font-semibold border border-gray-700 bg-gray-700 rounded hover:bg-stone-50 hover:text-gray-700 sm:text-xs transition-all`}
              disabled={isSavingSettings && isResetingSettings}
              type="submit"
            >
              {lang === 'RU' ? 'Сохранить настройки' : 'Save Settings'}
              {isSavingSettings && (
                <div className="absolute top-1 right-1">
                  <Loading width={'w-3.5'} height={'h-3.5'} />
                </div>
              )}
            </button>

            {settingsId !== 'undefined' && (
              <ResetSettings
                resetSettingsHandler={resetSettingsHandler}
                isSavingSettings={isSavingSettings}
                isResetingSettings={isResetingSettings}
                lang={lang}
              />
            )}
          </div>
        </form>
      </Modal>
    </div>
  );
}
