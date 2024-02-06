"use client";

import { useEffect, useState } from "react";
import { Modal } from "../modal/Modal";
import { UpdatedSensor } from "../../../lib/actions/settings.actions";
import { useRouter } from "next/navigation";
import { SensorType } from "@/types/types";
import { useForm } from "react-hook-form";
import { SettingsSvg } from "../icons_svg/SettingsSvg";
import {
  PowerSetting,
  setPowerSettings,
} from "../../../lib/actions/power_settings";
import { PowerSettingItem } from "./settings_power/PowerSettingItem";
import { AddPowerSettingsForm } from "./add_power_settings_form/AddPowerSettingsForm";
import { SuccessModal } from "../success_modal/SuccessModal";
import Image from "next/image";
import arrowIcon from "../../../public/arrow.png";

type SettingsPropsType = {
  lang: string;
  email: string | undefined;
  userId: number | undefined;
  deviceId: string;
  sensors: SensorType[];
  settingsSensors: UpdatedSensor[] | undefined;
  powerSettings: PowerSetting[] | undefined;
};

export function SettingsPower({
  lang,
  email,
  userId,
  deviceId,
  sensors,
  settingsSensors,
  powerSettings,
}: SettingsPropsType) {
  const router = useRouter();
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [isOpenAddForm, setIsOpenAddForm] = useState<boolean>(false);
  const [values, setValues] = useState<
    Array<{
      sensorId: number;
      rate: string;
      setValue: string;
      exist: boolean;
      deleted: boolean;
    }>
  >([]);
  const [err, setErr] = useState<string>("");
  const [saveOkModal, setSaveOkModal] = useState<boolean>(false);

  useEffect(() => {
    if (powerSettings) {
      setValues([]);
      powerSettings.forEach((pow) => {
        setValues((prev) => [
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
  }, [powerSettings]);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<any>({
    defaultValues: {
      sensorName: "",
    },
  });

  const onSubmit = async (data: any) => {
    const setValues = values
      .filter((v) => !v.deleted)
      .map((v) => ({
        sensorId: v.sensorId,
        rate: v.rate,
        setValue: v.setValue,
      }));

    if (values.length) {
      const OK = await setPowerSettings({
        userId: userId,
        deviceId: deviceId,
        powerSettings: setValues,
      });
      if (OK) {
        setTimeout(() => {
          setTimeout(() => {
            setSaveOkModal(false);
          }, 3000);
          setSaveOkModal(true);
        }, 500);
      }
    }

    router.refresh();
    setIsOpenModal(false);
    setIsOpenAddForm(false);
  };

  const EditHandler = (sensorId: number) => {
    console.log("edit", sensorId);
  };
  const DeleteHandler = (sensorId: number) => {
    setValues(values.filter((v) => v.sensorId !== sensorId));
    console.log("delete", sensorId);
  };
  const OpenCloseEditFormHandler = () => {
    setErr("");
    setIsOpenAddForm(!isOpenAddForm);
  };

  return (
    <div className="text-sm">
      <SuccessModal saveOkModal={saveOkModal} lang={lang} />

      <div className="" onClick={() => setIsOpenModal(true)}>
        <SettingsSvg
          title={
            lang === "RU"
              ? "Настройка параметров источника питания"
              : "Setting the power supply parameters"
          }
          color={"#616161"}
          size={"25"}
        />
      </div>
      <Modal active={isOpenModal} setActive={setIsOpenModal}>
        <p className="pb-5">
          <span className="text-lime-600 font-medium">{email}</span>
          {lang === "RU"
            ? ", сдесь вы можете настроить параметры отображения источника питания"
            : ", here you can adjust the display settings of the power supply"}
        </p>
        <div className="flex">
          <div className="pr-4">
            {lang === "RU" ? "Существующие настройки:" : "Existing settings"}
          </div>
          <ul>
            {values.length !== 0 ? (
              values.map((val) => {
                return (
                  <PowerSettingItem
                    key={val.sensorId}
                    lang={lang}
                    val={val}
                    values={values}
                    setValues={setValues}
                    err={err}
                    setErr={setErr}
                    updatedSensor={
                      settingsSensors &&
                      settingsSensors.find((sen) => sen.id === val.sensorId)
                    }
                    sensor={sensors.find((sen) => sen.id === val.sensorId)}
                    editHandler={EditHandler}
                    deleteHandler={DeleteHandler}
                  />
                );
              })
            ) : (
              <div>
                {lang === "RU"
                  ? "настройки отсутствуют"
                  : "there are no settings"}
              </div>
            )}
          </ul>
        </div>
        <div
          onClick={OpenCloseEditFormHandler}
          className="flex cursor-pointer align-center items-center bg-gray-100 mt-5 pl-2"
        >
          <div className={"max-w-32 p-1"}>
            {lang === "RU" ? "Добавить настройки" : "add settings"}
          </div>

          <Image
            className={`${
              isOpenAddForm && "rotate-180 transition-all scale-50"
            } w-7 h-7 transition-all scale-50`}
            src={arrowIcon}
            alt="edit"
          />

          <div className="text-red-700 pl-5">{err}</div>
        </div>

        {isOpenAddForm && (
          <AddPowerSettingsForm
            lang={lang}
            sensors={sensors}
            settingsSensors={settingsSensors}
            values={values}
            setValues={setValues}
            err={err}
            setErr={setErr}
            setIsOpenAddForm={setIsOpenAddForm}
          />
        )}
        <form className={"pt-5"} onSubmit={handleSubmit(onSubmit)}>
          <button
            className="border-2 border-lime-500 rounded-md p-2"
            type="submit"
          >
            {lang === "RU" ? "Сохранить настройки" : "Save Settings"}
          </button>
        </form>
      </Modal>
    </div>
  );
}