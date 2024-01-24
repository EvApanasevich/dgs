"use client";

import { useState } from "react";
import { Modal } from "../modal/Modal";
import { UpdatedSensor } from "../../../lib/actions/settings.actions";
import { useRouter } from "next/navigation";
import { SensorType } from "@/types/types";
import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";
import { SettingsSvg } from "../icons_svg/SettingsSvg";
import { setPowerSettings } from "../../../lib/actions/power_settings";

type SettingsPropsType = {
  lang: string;
  email: string | undefined;
  userId: number | undefined;
  deviceId: string;
  sensors: SensorType[];
  settingsSensors: UpdatedSensor[] | undefined;
};

export function SettingsPower({
  lang,
  email,
  userId,
  deviceId,
  sensors,
  settingsSensors,
}: SettingsPropsType) {
  const router = useRouter();
  const [isOpenModal, setIsOpenModal] = useState(false);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<any>();

  const onSubmit = () => {
    setPowerSettings({
      userId: userId,
      deviceId: deviceId,
      powerSettings: [
        { sensorId: 1, sensorName: "пробег", rate: "км", setValue: "125" },
        { sensorId: 7, sensorName: "пробегггг", rate: "км", setValue: "222" },
      ],
    });
    router.refresh();
    setIsOpenModal(false);
  };

  return (
    <div className="text-sm">
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
        <form onSubmit={handleSubmit(onSubmit)}>
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
