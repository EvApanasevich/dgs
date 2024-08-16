'use client';

import { SensorType } from '@/types/types';
import { useForm } from 'react-hook-form';
import { UpdatedSensor } from '../../../../lib/actions/settings.actions';
import { useEffect, useState } from 'react';

type AddSettingFormPropsType = {
  lang: string;

  sensors: SensorType[];
  settingsSensors: UpdatedSensor[] | undefined;
  values: Array<{
    sensorId: number;
    rate: string;
    setValue: string;
    exist: boolean;
    deleted: boolean;
  }>;
  err: string;
  correctVal: boolean;
  setCorrectVal: (flag: boolean) => void;
  setValues: (
    values: Array<{
      sensorId: number;
      rate: string;
      setValue: string;
      exist: boolean;
      deleted: boolean;
    }>,
  ) => void;
  setErr: (err: string) => void;
  setIsOpenAddForm: (isOpen: boolean) => void;
};

export function AddSettingForm({
  lang,
  sensors,
  settingsSensors,
  values,
  err,
  correctVal,
  setCorrectVal,
  setValues,
  setErr,
  setIsOpenAddForm,
}: AddSettingFormPropsType) {
  const [settingSensorId, setSettingSensorId] = useState<string>('');
  const [existSensorValue, setExistSensorValue] = useState<string | undefined>('');
  const [val, setVal] = useState<string>('');

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<any>({
    defaultValues: {
      sensorName: '',
    },
  });

  const onChangeSelectHandler = (sensorId: string) => {
    setSettingSensorId(sensorId);
    setVal('');
    setErr('');
  };
  const onKeyDownHandler = (keyCode: string) => {
    if (keyCode === 'Enter') {
      onClickApplyHandler();
    }
  };
  const onChangeInputHandler = (inpVal: string) => {
    const regEx = /(^\d*|^<\d*|^>\d*)\.?\d+$|^\d*\.?\d+-\d*\.?\d+$/gm;
    const isCorrect = regEx.test(inpVal);

    if (isCorrect || !inpVal) setErr('');
    if ((err === 'Значение датчика не может быть пустым' || err === 'The sensor value cannot be empty') && inpVal) setErr('');

    if (isCorrect) {
      if (inpVal.includes('-')) {
        const arrRange = inpVal.split('-');
        Number(arrRange[0]) >= Number(arrRange[1]) ? setCorrectVal(false) : setCorrectVal(true);
      } else setCorrectVal(true);
    } else setCorrectVal(false);
    setVal(inpVal);
  };

  const onClickApplyHandler = () => {
    if (val) {
      if (correctVal) {
        if (!values.find(v => v.sensorId === Number(settingSensorId))) {
          setValues([
            ...values,
            {
              sensorId: Number(settingSensorId),
              rate: '...',
              setValue: val,
              exist: false,
              deleted: false,
            },
          ]);
          setSettingSensorId('');
          setIsOpenAddForm(false);
          setErr('');
        } else {
          setErr(
            `${
              lang === 'RU'
                ? 'Настройки с таким датчиком уже существуют, выберите другой датчик'
                : 'Settings with such a sensor already exist, select another sensor'
            }`,
          );
        }
      } else {
        setErr(`${lang === 'RU' ? 'Неверный формат ввода значения' : 'Invalid value input format'}`);
      }
    } else {
      setErr(`${lang === 'RU' ? 'Значение датчика не может быть пустым' : 'The sensor value cannot be empty'}`);
    }
  };

  useEffect(() => {
    const actValue = sensors.find(s => s.id === Number(settingSensorId))?.value;
    setExistSensorValue(actValue);
  }, [settingSensorId, existSensorValue]);

  return (
    <div className={'flex flex-col justify-between px-2 py-2 border border-orange-600'}>
      {err && <div className={'px-3 py-2 mb-3 text-red-700 text-sm font-semibold bg-red-100 border-2 border-red-400 rounded'}>{err}</div>}

      <div className="flex justify-between md:flex-col">
        <div className="">
          <select
            id={'sensors'}
            {...register('sensorName')}
            className={'max-w-xs h-8 px-2 text-base text-gray-700 font-medium border border-gray-500 rounded outline-none cursor-pointer sm:w-full'}
            onChange={s => onChangeSelectHandler(s.currentTarget.value)}
          >
            <option value="">{lang === 'RU' ? 'Выберите датчик...' : 'Select a sensor...'}</option>
            {settingsSensors
              ? settingsSensors?.map(s => {
                  const existSensor = values.find(v => {
                    return Number(v.sensorId) === Number(s.id);
                  });

                  if (!existSensor) {
                    return (
                      <option key={s.id} value={s.id}>
                        {s.newName}
                      </option>
                    );
                  }
                })
              : sensors?.map(s => {
                  return (
                    <option key={s.id} value={s.id}>
                      {s.name}
                    </option>
                  );
                })}
          </select>

          {settingSensorId && (
            <div className="flex py-4 md:flex-col">
              <div className="pr-2 text-base font-medium leading-7">{lang === 'RU' ? 'Значение:' : 'Value:'}</div>

              <input
                id={'value'}
                onChange={e => onChangeInputHandler(e.currentTarget.value)}
                onKeyDown={e => onKeyDownHandler(e.code)}
                className={`${
                  correctVal ? 'text-lime-700' : 'text-red-700'
                } w-36 h-7 px-2 text-base font-semibold border border-gray-500 rounded outline-none`}
                type={'text'}
                placeholder={existSensorValue}
                autoFocus={true}
                maxLength={30}
                value={val}
              />
            </div>
          )}
        </div>

        {settingSensorId && (
          <span className="pl-4 w-64 text-sm text-gray-500 sm:w-full pb-3">
            <div className="pb-2 text-gray-700 font-medium">{lang === 'RU' ? 'Пример установки значения:' : 'Example of setting the value:'}</div>
            <div>
              {lang === 'RU' ? (
                <span>
                  1) Диапазон значений: <span className="text-sm text-lime-700 font-medium">12.5-12.8</span>; (включительно)
                </span>
              ) : (
                <span>
                  1) Range of values: <span className="text-sm text-lime-700 font-medium">12.5-12.8</span>; (inclusive)
                </span>
              )}
            </div>
            <div>
              {lang === 'RU' ? (
                <span>
                  2) Меньше: <span className="text-sm text-lime-700 font-medium">{'<12.5'}</span>;
                </span>
              ) : (
                <span>
                  2) Less than: <span className="text-sm text-lime-700 font-medium">{'<12.5'}</span>;
                </span>
              )}
            </div>

            <div>
              {lang === 'RU' ? (
                <span>
                  3) Больше: <span className="text-sm text-lime-700 font-medium">{'>12.5'}</span>;
                </span>
              ) : (
                <span>
                  3) More: <span className="text-sm text-lime-700 font-medium">{'>12.5'}</span>;
                </span>
              )}
            </div>

            <div>
              {lang === 'RU' ? (
                <span>
                  4) Точное значение: <span className="text-sm text-lime-700 font-medium">{'12.5'}</span>;
                </span>
              ) : (
                <span>
                  4) The exact value: <span className="text-sm text-lime-700 font-medium">{'12.5'}</span>;
                </span>
              )}
            </div>
          </span>
        )}
      </div>

      {settingSensorId && (
        <button
          onClick={onClickApplyHandler}
          className="w-fit p-2 mt-1 text-sm text-stone-50 font-semibold border border-gray-700 bg-gray-700 rounded hover:bg-stone-50 hover:text-orange-600 sm:text-xs transition-all"
        >
          {lang === 'RU' ? 'Добавить' : 'Add value'}
        </button>
      )}
    </div>
  );
}
