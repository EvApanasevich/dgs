'use client';

import { useEffect, useState } from 'react';
import { Modal } from '../modal/Modal';
import { UpdatedSensor } from '../../../lib/actions/settings.actions';
import { useRouter } from 'next/navigation';
import { SensorType } from '@/types/types';
import { useForm } from 'react-hook-form';
import { SettingsSvg } from '../icons_svg/SettingsSvg';
import { PowerSetting, setPowerSettings } from '../../../lib/actions/power_settings';
import { AppliedSettingItem } from './settings_applied_item/AppliedSettingItem';
import { AddSettingForm } from './add_setting_form/AddSettingForm';
import { SuccessModal } from '../success_modal/SuccessModal';
import Image from 'next/image';
import arrowIcon from '../../../public/arrow.png';
import { Loading } from '../loading/Loading';

type SettingsPowerPropsType = {
  lang: string;
  email: string | undefined;
  userId: number | undefined;
  deviceId: string;
  sensors: SensorType[];
  settingsSensors: UpdatedSensor[] | undefined;
  appliedSettings: PowerSetting[] | undefined;
};

export function SettingsPower({ lang, email, userId, deviceId, sensors, settingsSensors, appliedSettings }: SettingsPowerPropsType) {
  const router = useRouter();
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [isOpenAddForm, setIsOpenAddForm] = useState<boolean>(false);
  const [isSavingSettings, setIsSavingSettings] = useState<boolean>(false);
  const [values, setValues] = useState<
    Array<{
      sensorId: number;
      rate: string;
      setValue: string;
      exist: boolean;
      deleted: boolean;
    }>
  >([]);
  const [correctVal, setCorrectVal] = useState<boolean>(true);
  const [correctEditingValue, setCorrectEditingValue] = useState<boolean>(true);
  const [err, setErr] = useState<string>('');
  const [saveOkModal, setSaveOkModal] = useState<boolean>(false);
  const [wasChangedValue, setWasChangedValue] = useState<boolean>(false);

  useEffect(() => {
    if (appliedSettings) {
      setValues([]);
      appliedSettings.forEach(pow => {
        setValues(prev => [
          ...prev,
          {
            sensorId: pow.sensorId,
            rate: pow.rate,
            setValue: pow.setValue,
            exist: true,
            deleted: false,
          },
        ]);
      });
    }
  }, [appliedSettings]);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<any>({
    defaultValues: {
      sensorName: '',
    },
  });

  const onSubmit = async (data: any) => {
    const setValues = values
      .filter(v => !v.deleted)
      .map(v => ({
        sensorId: v.sensorId,
        rate: v.rate,
        setValue: v.setValue,
      }));

    if (values.length) {
      setIsSavingSettings(true);

      const OK = await setPowerSettings({
        userId: userId,
        deviceId: deviceId,
        powerSettings: setValues,
      });

      if (OK) {
        setIsSavingSettings(false);
        setTimeout(() => {
          setTimeout(() => {
            setSaveOkModal(false);
          }, 3000);
          setSaveOkModal(true);
        }, 500);
      } else {
        setIsSavingSettings(false);
      }
    }

    router.refresh();
    setIsOpenModal(false);
    setIsOpenAddForm(false);
    setWasChangedValue(false);
  };

  const EditHandler = (sensorId: number) => {
    console.log('edit', sensorId);
  };
  const DeleteHandler = (sensorId: number) => {
    setValues(values.filter(v => v.sensorId !== sensorId));
    console.log('delete', sensorId);
  };
  const OpenCloseEditFormHandler = () => {
    setErr('');
    setIsOpenAddForm(!isOpenAddForm);
  };

  return (
    <div className="text-sm">
      <SuccessModal saveOkModal={saveOkModal} lang={lang} />

      <div className="" onClick={() => setIsOpenModal(true)}>
        <SettingsSvg
          title={lang === 'RU' ? 'Настройка параметров источника питания' : 'Setting the power supply parameters'}
          color={'#616161'}
          size={'25'}
        />
      </div>

      <Modal active={isOpenModal} setActive={setIsOpenModal}>
        <div className="flex flex-col">
          {values.length !== 0 ? (
            <div className="pb-2 text-lg text-gray-700 font-semibold">{lang === 'RU' ? 'Настройки:' : 'Settings'}</div>
          ) : (
            <div className="pr-4 pb-4 text-lg text-orange-700 font-semibold">{lang === 'RU' ? 'Настройки отсутствуют' : 'There are no settings'}</div>
          )}

          <ul>
            {values.map(val => {
              return (
                <AppliedSettingItem
                  key={val.sensorId}
                  lang={lang}
                  val={val}
                  values={values}
                  setValues={setValues}
                  err={err}
                  setErr={setErr}
                  updatedSensor={settingsSensors && settingsSensors.find(sen => sen.id === val.sensorId)}
                  sensor={sensors.find(sen => sen.id === val.sensorId)}
                  editHandler={EditHandler}
                  deleteHandler={DeleteHandler}
                  setWasChangedValue={setWasChangedValue}
                  correctEditingValue={correctEditingValue}
                  setCorrectEditingValue={setCorrectEditingValue}
                />
              );
            })}
          </ul>
        </div>

        <div
          onClick={OpenCloseEditFormHandler}
          className={`${
            !isOpenAddForm && 'rounded-md'
          } flex justify-between h-10 cursor-pointer align-center items-center rounded-t-md bg-orange-600 mt-2 pl-2`}
        >
          <div className={'max-w-32 p-1 text-base text-stone-50'}>{lang === 'RU' ? 'Добавить настройки' : 'add settings'}</div>

          <Image
            className={`${isOpenAddForm && 'rotate-180 transition-all scale-50'} w-8 h-8 text-lg font-bold transition-all scale-50`}
            src={arrowIcon}
            alt="edit"
          />
        </div>

        {isOpenAddForm && (
          <AddSettingForm
            lang={lang}
            sensors={sensors}
            settingsSensors={settingsSensors}
            values={values}
            setValues={setValues}
            err={err}
            setErr={setErr}
            setIsOpenAddForm={setIsOpenAddForm}
            correctVal={correctVal}
            setCorrectVal={setCorrectVal}
          />
        )}

        <form className={''} onSubmit={handleSubmit(onSubmit)}>
          {values.find(v => !v.exist || v.deleted || wasChangedValue) && (
            <button
              className={`relative p-2 mt-5 text-base text-stone-50 font-semibold border border-gray-700 bg-gray-700 rounded ${
                correctVal && correctEditingValue && !isOpenAddForm ? 'hover:bg-stone-50 hover:text-gray-700' : 'opacity-30'
              } sm:text-xs transition-all`}
              disabled={!correctVal || !correctEditingValue || isOpenAddForm || isSavingSettings}
              type="submit"
            >
              {lang === 'RU' ? 'Сохранить' : 'Save'}
              {isSavingSettings && (
                <div className="absolute top-1 right-1">
                  <Loading width={'w-3.5'} height={'h-3.5'} />
                </div>
              )}
            </button>
          )}
        </form>
      </Modal>
    </div>
  );
}
