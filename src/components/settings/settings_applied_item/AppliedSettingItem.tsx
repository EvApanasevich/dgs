"use client";
import Image from "next/image";
import editIcon from "../../../../public/pencil.png";
import deleteIcon from "../../../../public/delete.png";
import cancelIcon from "../../../../public/cancel.png";
import { UpdatedSensor } from "../../../../lib/actions/settings.actions";
import { Icons } from "@/components/icons_svg/Icons";
import { useState } from "react";
import { SensorType } from "@/types/types";

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
  setErr: (err: string) => void;
  setValues: (
    values: Array<{
      sensorId: number;
      rate: string;
      setValue: string;
      exist: boolean;
      deleted: boolean;
    }>
  ) => void;
  editHandler: (sensorId: number) => void;
  deleteHandler: (sensorId: number) => void;
};

export function AppliedSettingItem({
  lang,
  val,
  updatedSensor,
  sensor,
  values,
  err,
  setErr,
  setValues,
}: AppliedSettingItemPropsType) {
  const [editMode, setEditMode] = useState<boolean>(false);
  const [value, setValue] = useState<string>(val.setValue);
  const [correctVal, setCorrectVal] = useState<boolean>(true);

  const onClickEditHandler = (sensorId: number) => {
    setEditMode(true);
  };
  const onClickDeleteHandler = (sensorId: number) => {
    setValues(
      values.map((v) => (v.sensorId === sensorId ? { ...v, deleted: true } : v))
    );
  };
  const onClickCancelDeleteHandler = (sensorId: number) => {
    setValues(
      values.map((v) =>
        v.sensorId === sensorId ? { ...v, deleted: false } : v
      )
    );
  };
  const onClickApplyHandler = (newValue: string) => {
    setValue(newValue);
    setValues(
      values.map((v) =>
        v.sensorId === val.sensorId ? { ...v, setValue: value } : v
      )
    );
    setEditMode(false);
  };
  const error = (newValue: string) => {
    if (!newValue) {
      setErr(
        `${
          lang === "RU"
            ? "Значение датчика не может быть пустым"
            : "The sensor value cannot be empty"
        }`
      );
    } else
      setErr(
        `${
          lang === "RU"
            ? "Неверный формат ввода значения"
            : "Invalid value input format"
        }`
      );
  };
  const onBlurHandler = (newValue: string) => {
    if (correctVal) {
      onClickApplyHandler(newValue);
    } else error(newValue);
  };
  const onKeyDownHandler = (keyCode: string, newValue: string) => {
    if (newValue.length < 30) {
      if (keyCode === "Enter" && correctVal) {
        onClickApplyHandler(newValue);
      }
      // else error(newValue);
    }
  };
  const onChangeInputHandler = (inpVal: string) => {
    setErr("");

    const regEx = /(^\d*|^<\d*|^>\d*)\.?\d+$|^\d*\.?\d+-\d*\.?\d+$/gm;
    const isCorrect = regEx.test(inpVal);

    if (isCorrect) {
      if (inpVal.includes("-")) {
        console.log(inpVal);
        const arrRange = inpVal.split("-");
        console.log(Number(arrRange[0]) >= Number(arrRange[1]));
        Number(arrRange[0]) >= Number(arrRange[1])
          ? setCorrectVal(false)
          : setCorrectVal(true);
      } else setCorrectVal(true);
    } else setCorrectVal(false);
    setValue(inpVal);
  };

  return (
    <li className="flex justify-between relative py-2 pl-8 sm:pl-0 sm:flex-col sm:py-4">
      {!val.exist && <div className="absolute left-3">+</div>}
      <div
        className={`${val.exist && "bg-gray-100"} ${
          val.deleted && "opacity-20 bg-transparent"
        } flex w-auto justify-between border-b border-gray-500 sm:flex-col`}
      >
        <div className="flex sm:py-2 sm:justify-between">
          <div className="px-2">
            {updatedSensor ? updatedSensor.newName : sensor?.name}
          </div>
          <div className="sm:pr-2">
            <Icons
              icon={updatedSensor ? updatedSensor.icon : 1}
              color={"#84cc16"}
              size={"25"}
            />
          </div>
        </div>
        <span className="sm:pl-2">
          {lang === "RU" ? "Значение: " : "Value: "}
        </span>
        {editMode ? (
          <input
            className={`${
              correctVal ? "text-lime-700" : "text-red-700"
            } border border-gray-700 rounded font-medium w-16 px-2`}
            onChange={(e) => onChangeInputHandler(e.currentTarget.value)}
            onBlur={(e) => onBlurHandler(e.currentTarget.value)}
            onKeyDown={(e) => onKeyDownHandler(e.code, e.currentTarget.value)}
            type={"text"}
            autoFocus
            value={value}
            maxLength={30}
          ></input>
        ) : (
          <div className="px-2">{value}</div>
        )}
      </div>
      <div className="flex sm:justify-end sm:pt-2">
        {!editMode && !val.deleted && (
          <Image
            onClick={() => onClickEditHandler(val.sensorId)}
            className="w-5 h-5 mx-2 cursor-pointer"
            src={editIcon}
            alt="edit"
          />
        )}
        {!val.deleted ? (
          <div>
            <Image
              onClick={() => onClickDeleteHandler(val.sensorId)}
              className="w-5 h-5 cursor-pointer"
              src={deleteIcon}
              alt="delete"
            />
          </div>
        ) : (
          <div>
            <Image
              onClick={() => onClickCancelDeleteHandler(val.sensorId)}
              className="w-5 h-5 ml-2 cursor-pointer"
              src={cancelIcon}
              alt="cancelDelete"
            />
          </div>
        )}
      </div>
    </li>
  );
}
