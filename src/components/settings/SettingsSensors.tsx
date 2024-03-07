"use client";

import { useState } from "react";
import { Modal } from "../modal/Modal";
import {
  UpdatedSensor,
  updateSettings,
} from "../../../lib/actions/settings.actions";
import { useParams, useRouter } from "next/navigation";
import { SensorType } from "@/types/types";
import { useForm } from "react-hook-form";
import Image from "next/image";
import pencilIcon from "../../../public/pencil.png";
import { Icons } from "../icons_svg/Icons";
import { IconsPopUp } from "../icons_popup/IconsPopUp";
import { SettingsSvg } from "../icons_svg/SettingsSvg";
import { SuccessModal } from "../success_modal/SuccessModal";

type SettingsPropsType = {
  lang: string;
  email: string | undefined;
  userId: number | undefined;
  deviceId: string;
  sensors: SensorType[];
  settingsSensors: UpdatedSensor[] | undefined;
};

export function SettingsSensors({
  lang,
  email,
  userId,
  deviceId,
  sensors,
  settingsSensors,
}: SettingsPropsType) {
  const router = useRouter();
  const params = useParams();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [icons, setIcons] = useState<Array<{ sensorId: number; icon: number }>>(
    () => initIcons(settingsSensors)
  );
  const [saveOkModal, setSaveOkModal] = useState<boolean>(false);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<any>();

  function initIcons(settingsSensors: UpdatedSensor[] | undefined) {
    const arrIcons: Array<{ sensorId: number; icon: number }> = [];
    sensors.forEach((sensor) => {
      if (settingsSensors) {
        arrIcons.push({
          sensorId: sensor.id,
          icon: Number(settingsSensors.find((s) => s.id === sensor.id)?.icon),
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
    const arrSensors: Array<UpdatedSensor> = [];

    for (let key in data) {
      sensors.forEach((sensor) => {
        if (sensor.name === key) {
          const visible = data.visible.includes(key);
          const icon = icons.find((ic) => ic.sensorId === sensor.id)?.icon;

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
      setTimeout(() => {
        setTimeout(() => {
          setSaveOkModal(false);
        }, 3000);
        setSaveOkModal(true);
      }, 500);
    }
    router.refresh();
    setIsOpenModal(false);
  };

  return (
    <div className="text-sm">
      <SuccessModal saveOkModal={saveOkModal} lang={lang} />

      <div className="" onClick={() => setIsOpenModal(true)}>
        <SettingsSvg
          title={
            lang === "RU"
              ? "Настройки отображения датчиков"
              : "Sensor display settings"
          }
          color={"#616161"}
          size={"25"}
        />
      </div>
      <Modal active={isOpenModal} setActive={setIsOpenModal}>
        <p className="pb-5">
          <span className="text-lime-600 font-medium">{email}</span>
          {lang === "RU"
            ? ", сдесь вы можете настроить параметры отображения датчиков"
            : ", here you can adjust the display parameters of the sensors"}
        </p>

        <form onSubmit={handleSubmit(onSubmit)}>
          <ul>
            {sensors.map((sensor) => {
              return (
                <li
                  key={sensor.id}
                  className="flex flex-col border-b border-gray-500 mb-4"
                >
                  <div className="flex pb-2 justify-between lg:flex-col">
                    <div className="font-medium text-sm text-gray-700">
                      {sensor.name}
                    </div>
                    <div className="flex text-end text-lime-700">
                      {sensor.value !== null ? sensor.value : 0}
                    </div>
                  </div>
                  <div className="bg-gray-100 p-2">
                    <div className="flex pb-4 lg:flex-col">
                      <span className="pr-3 leading-8">
                        {lang === "RU"
                          ? "Изменить имя датчика: "
                          : "Change name of the sensor: "}
                      </span>
                      <div className="flex border border-gray-500 rounded-md p-1 lg:justify-between lg:w-2/3 sm:w-full">
                        <input
                          {...register(`${sensor.name}`, {
                            required:
                              lang === "RU"
                                ? "Обязательно к заполнению"
                                : "Required to be filled in",
                            maxLength: {
                              value: 50,
                              message: "Не более 50 символов",
                            },
                            value: settingsSensors
                              ? settingsSensors.find((s) => s.id === sensor.id)
                                  ?.newName
                              : sensor.name,
                          })}
                          className="outline-none pl-2 bg-gray-100"
                          type="text"
                        />
                        <Image
                          className="w-5 h-5"
                          src={pencilIcon}
                          alt="pencil"
                        />
                      </div>
                      {errors[`${sensor.name}`] && (
                        <p className="text-red-400 pl-4">{`${
                          errors[`${sensor.name}`]?.message
                        }`}</p>
                      )}
                    </div>
                    <div className="flex lg:flex-col">
                      <div className="flex pr-5 lg:pb-3">
                        <IconsPopUp
                          lang={lang}
                          sensorId={sensor.id}
                          icons={icons}
                          setIcons={setIcons}
                        />

                        <Icons
                          icon={
                            icons.find((ic) => ic.sensorId === sensor.id)?.icon
                          }
                          color={"red"}
                          size={"25"}
                        />
                      </div>
                      <div className="flex">
                        <span className="px-3 leading-6 lg:pl-0">
                          {lang === "RU"
                            ? "Отображать датчик: "
                            : "display the sensor "}
                        </span>
                        <input
                          {...register("visible")}
                          type="checkbox"
                          value={`${sensor.name}`}
                          defaultChecked={
                            settingsSensors
                              ? settingsSensors.find((s) => s.id === sensor.id)
                                  ?.visible
                              : true
                          }
                        />
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
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
