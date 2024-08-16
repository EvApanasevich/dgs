'use client';
import Image from 'next/image';
import editIcon from '../../../../public/pencil.png';
import deleteIcon from '../../../../public/delete.png';
import cancelIcon from '../../../../public/cancel.png';
import { UpdatedSensor } from '../../../../lib/actions/settings.actions';
import { Icons } from '@/components/icons_svg/Icons';
import { useState } from 'react';
import { SensorType } from '@/types/types';

type AppliedSettingItemPropsType = {
  lang: string;
  val: {
    sensorId: number;
    rate: string;
    setValue: string;
    exist: boolean;
    deleted: boolean;
  };
  updatedSensor: UpdatedSensor | undefined;
  sensor: SensorType | undefined;
  values: Array<{
    sensorId: number;
    rate: string;
    setValue: string;
    exist: boolean;
    deleted: boolean;
  }>;
  err: string;
  correctEditingValue: boolean;
  setCorrectEditingValue: (flag: boolean) => void;
  setErr: (err: string) => void;
  setValues: (
    values: Array<{
      sensorId: number;
      rate: string;
      setValue: string;
      exist: boolean;
      deleted: boolean;
    }>,
  ) => void;
  editHandler: (sensorId: number) => void;
  deleteHandler: (sensorId: number) => void;
  setWasChangedValue: (flag: boolean) => void;
};

export function AppliedSettingItem({
  lang,
  val,
  updatedSensor,
  sensor,
  values,
  err,
  correctEditingValue,
  setCorrectEditingValue,
  setErr,
  setValues,
  setWasChangedValue,
}: AppliedSettingItemPropsType) {
  const [editMode, setEditMode] = useState<boolean>(false);
  const [value, setValue] = useState<string>(val.setValue);

  const onClickEditHandler = (sensorId: number) => {
    setEditMode(true);
  };
  const onClickDeleteHandler = (sensorId: number) => {
    setValues(values.map(v => (v.sensorId === sensorId ? { ...v, deleted: true } : v)));
  };
  const onClickCancelDeleteHandler = (sensorId: number) => {
    setValues(values.map(v => (v.sensorId === sensorId ? { ...v, deleted: false } : v)));
  };
  const onClickApplyHandler = (newValue: string) => {
    setValue(newValue);
    setValues(values.map(v => (v.sensorId === val.sensorId ? { ...v, setValue: value } : v)));
    setEditMode(false);
  };
  // const error = (newValue: string) => {
  //   if (!newValue) {
  //     setErr(`${lang === 'RU' ? 'Значение датчика не может быть пустым' : 'The sensor value cannot be empty'}`);
  //   } else setErr(`${lang === 'RU' ? 'Неверный формат ввода значения' : 'Invalid value input format'}`);
  // };
  const onBlurHandler = (newValue: string) => {
    if (correctEditingValue) {
      onClickApplyHandler(newValue);
    }
  };
  const onKeyDownHandler = (keyCode: string, newValue: string) => {
    if (newValue.length < 30) {
      if (keyCode === 'Enter' && correctEditingValue) {
        onClickApplyHandler(newValue);
      }
      // else error(newValue);
    }
  };
  const onChangeInputHandler = (inpVal: string) => {
    setWasChangedValue(true);
    setErr('');

    const regEx = /(^\d*|^<\d*|^>\d*)\.?\d+$|^\d*\.?\d+-\d*\.?\d+$/gm;
    const isCorrect = regEx.test(inpVal);

    if (isCorrect) {
      if (inpVal.includes('-')) {
        const arrRange = inpVal.split('-');
        Number(arrRange[0]) >= Number(arrRange[1]) ? setCorrectEditingValue(false) : setCorrectEditingValue(true);
      } else setCorrectEditingValue(true);
    } else setCorrectEditingValue(false);
    setValue(inpVal);
  };

  return (
    <li className="flex justify-between relative pl-0 pb-4">
      <div
        className={`${val.exist && 'border border-gray-500 rounded-md overflow-hidden'}
                    flex w-full justify-between md:flex-col md:flex-col-reverse`}
      >
        <div className={`${val.deleted && 'opacity-30 bg-transparent'} flex pt-1 justify-between flex-col`}>
          <div className="px-2 pb-2 text-orange-700 text-lg font-bold overflow-hidden">
            {!val.exist && <span className="pr-3 text-xl font-bold text-lime-500">{'+'}</span>}
            {updatedSensor ? updatedSensor.newName : sensor?.name}
          </div>

          <div className="flex mb-2">
            <label htmlFor={'input'} className="pl-2 pr-2 text-base text-gray-700 font-bold">
              {lang === 'RU' ? 'Значение: ' : 'Value: '}
            </label>
            {editMode ? (
              <input
                id={'input'}
                className={`${
                  correctEditingValue ? 'text-lime-700 bg-lime-100' : 'text-red-700 bg-red-100'
                } w-42 pl-2 mr-2 text-base rounded outline-none font-medium sm:w-full`}
                onChange={e => onChangeInputHandler(e.currentTarget.value)}
                onBlur={e => onBlurHandler(e.currentTarget.value)}
                onKeyDown={e => onKeyDownHandler(e.code, e.currentTarget.value)}
                type={'text'}
                autoFocus
                value={value}
                maxLength={30}
              ></input>
            ) : (
              <div className="px-2 text-base text-lime-700 font-semibold">{value}</div>
            )}

            <div className="flex justify-end">
              {!editMode && !val.deleted && (
                <Image onClick={() => onClickEditHandler(val.sensorId)} className="w-6 h-6 mx-2 cursor-pointer" src={editIcon} alt="edit" />
              )}
            </div>
          </div>
        </div>

        <div className="flex md:justify-between">
          <div className={`${val.deleted && 'opacity-30 bg-transparent'} flex justify-center items-center pl-1 pr-8 md:pt-2 pl-2`}>
            <Icons icon={updatedSensor ? updatedSensor.icon : 1} color={'#4b5563'} size={'46'} />
          </div>

          <div className="w-10">
            {!val.deleted ? (
              <div
                onClick={() => onClickDeleteHandler(val.sensorId)}
                className={'flex justify-center items-center h-full bg-red-100 cursor-pointer hover:bg-red-200 transition-all md:rounded-bl'}
              >
                <Image className="w-8 h-8" src={deleteIcon} alt="delete" />
              </div>
            ) : (
              <div
                onClick={() => onClickCancelDeleteHandler(val.sensorId)}
                className={'flex justify-center items-center h-full bg-blue-100 cursor-pointer hover:bg-blue-200 transition-all md:rounded-bl'}
              >
                <Image className="w-6 h-6 mx-2 cursor-pointer" src={cancelIcon} alt="cancelDelete" />
              </div>
            )}
          </div>
        </div>
      </div>
    </li>
  );
}
