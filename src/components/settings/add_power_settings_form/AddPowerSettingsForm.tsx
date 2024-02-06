"use client";

import { SensorType } from "@/types/types";
import { useForm } from "react-hook-form";
import { UpdatedSensor } from "../../../../lib/actions/settings.actions";
import { useEffect, useState } from "react";

type AddPowerSettingsFormPropsType = {
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
  setValues: (
    values: Array<{
      sensorId: number;
      rate: string;
      setValue: string;
      exist: boolean;
      deleted: boolean;
    }>
  ) => void;
  setErr: (err: string) => void;
  setIsOpenAddForm: (isOpen: boolean) => void;
};

export function AddPowerSettingsForm({
  lang,
  sensors,
  settingsSensors,
  values,
  err,
  setValues,
  setErr,
  setIsOpenAddForm,
}: AddPowerSettingsFormPropsType) {
  const [settingSensorId, setSettingSensorId] = useState<string>("");
  const [existSensorValue, setExistSensorValue] = useState<string | undefined>(
    ""
  );
  const [val, setVal] = useState<string>("");
  const [correctVal, setCorrectVal] = useState<boolean>(true);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<any>({
    defaultValues: {
      sensorName: "",
    },
  });

  const onChangeSelectHandler = (sensorId: string) => {
    setSettingSensorId(sensorId);
    setVal("");
    setErr("");
  };
  const onKeyDownHandler = (keyCode: string) => {
    if (keyCode === "Enter") {
      onClickApplyHandler();
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
    setVal(inpVal);
  };

  const onClickApplyHandler = () => {
    if (val) {
      if (correctVal) {
        if (!values.find((v) => v.sensorId === Number(settingSensorId))) {
          setValues([
            ...values,
            {
              sensorId: Number(settingSensorId),
              rate: "...",
              setValue: val,
              exist: false,
              deleted: false,
            },
          ]);
          setSettingSensorId("");
          setIsOpenAddForm(false);
          setErr("");
        } else {
          setErr(
            `${
              lang === "RU"
                ? "Настройки с таким датчиком уже существуют, выберите другой датчик"
                : "Settings with such a sensor already exist, select another sensor"
            }`
          );
        }
      } else {
        setErr(
          `${
            lang === "RU"
              ? "Неверный формат ввода значения"
              : "Invalid value input format"
          }`
        );
      }
    } else {
      setErr(
        `${
          lang === "RU"
            ? "Значение датчика не может быть пустым"
            : "The sensor value cannot be empty"
        }`
      );
    }
  };

  useEffect(() => {
    const actValue = sensors.find(
      (s) => s.id === Number(settingSensorId)
    )?.value;
    setExistSensorValue(actValue);
  }, [settingSensorId, existSensorValue]);

  return (
    <div className={"flex p-2 pt-3 items-start"}>
      <label className="pr-3" htmlFor={"sensors"}>
        {lang === "RU" ? "Датчик: " : "Sensor: "}
      </label>

      <select
        id={"sensors"}
        {...register("sensorName")}
        className={"h-7 border border-gray-700 rounded px-2 cursor-pointer"}
        onChange={(s) => onChangeSelectHandler(s.currentTarget.value)}
      >
        <option value="">
          {lang === "RU" ? "Выберите датчик..." : "Select a sensor..."}
        </option>
        {settingsSensors
          ? settingsSensors?.map((s) => {
              return (
                <option key={s.id} value={s.id}>
                  {s.newName}
                </option>
              );
            })
          : sensors?.map((s) => {
              return (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              );
            })}
      </select>
      {settingSensorId && (
        <span className="flex items-start pl-3">
          <div className="flex">
            <span className="pr-2">
              {lang === "RU" ? "Значение:" : "Value:"}
            </span>
            <input
              onChange={(e) => onChangeInputHandler(e.currentTarget.value)}
              onKeyDown={(e) => onKeyDownHandler(e.code)}
              className={`${
                correctVal ? "text-lime-700" : "text-red-700"
              } border border-gray-700 rounded px-2 font-medium w-28 h-7 text-sm`}
              type={"text"}
              placeholder={existSensorValue}
              autoFocus={true}
              maxLength={30}
              value={val}
            />
          </div>

          <span className="pl-4 w-64 text-gray-500">
            {lang === "RU"
              ? "Установите необходимое значение. Пример установки:"
              : "Set the required value. Example of setting a range of values:"}
            <div>
              {lang === "RU"
                ? '1) Диапазон значений: "12.5-12.8"; (включительно)'
                : '1) Range of values: "12.5-12.8"; (inclusive)'}
            </div>
            <div>
              {lang === "RU" ? '2) Меньше: "<12.5";' : '2) Less than: "<12.5";'}
            </div>
            <div>
              {lang === "RU" ? '3) Больше: ">12.5";' : '3) More: ">12.5";'}
            </div>
            <div>
              {lang === "RU"
                ? '4) Точное значение: "12.5";'
                : '4) The exact value: "12.5";'}
            </div>
          </span>
          <span
            onClick={onClickApplyHandler}
            className="ml-4 font-semibold text-lime-700 border-b-2 border-lime-700 cursor-pointer"
          >
            {lang === "RU" ? "Применить" : "Apply"}
          </span>
        </span>
      )}
    </div>
  );
}