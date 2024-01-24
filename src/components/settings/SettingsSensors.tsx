"use client";

import { useEffect, useState } from "react";
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
import { useSession } from "next-auth/react";
import { Icons } from "../icons_svg/Icons";
import { IconsPopUp } from "../icons_popup/IconsPopUp";
import { SettingsSvg } from "../icons_svg/SettingsSvg";

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

  const onSubmit = (data: any) => {
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
    updateSettings({ userId, deviceId, arrSensors });
    router.refresh();
    setIsOpenModal(false);
  };

  return (
    <div className="text-sm">
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
                <li key={sensor.id} className="flex items-center pb-2">
                  <div className="flex-1 leading-[2.85rem]">
                    <div>{sensor.name}</div>
                  </div>

                  <IconsPopUp
                    lang={lang}
                    sensorId={sensor.id}
                    icons={icons}
                    setIcons={setIcons}
                  />

                  <Icons
                    icon={icons.find((ic) => ic.sensorId === sensor.id)?.icon}
                    color={"red"}
                    size={"25"}
                  />

                  <label className="px-3" htmlFor={`${sensor.id}`}>
                    {lang === "RU"
                      ? "отображать датчик: "
                      : "display the sensor "}
                  </label>
                  <input
                    {...register("visible")}
                    id={`${sensor.id}`}
                    type="checkbox"
                    value={`${sensor.name}`}
                    defaultChecked={
                      settingsSensors
                        ? settingsSensors.find((s) => s.id === sensor.id)
                            ?.visible
                        : true
                    }
                  />

                  <div>
                    <div className="flex border border-gray-500 rounded-md p-1 mx-3">
                      <input
                        {...register(`${sensor.name}`, {
                          required:
                            lang === "RU"
                              ? "Обязательно к заполнению"
                              : "Required to be filled in",
                          maxLength: {
                            value: 40,
                            message: "Не более 40 символов",
                          },
                          value: settingsSensors
                            ? settingsSensors.find((s) => s.id === sensor.id)
                                ?.newName
                            : sensor.name,
                        })}
                        className="outline-none pl-2"
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

                  <div className="flex-1 leading-[2.85rem]">{sensor.value}</div>
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
