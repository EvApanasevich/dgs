"use client";

import { useState } from "react";
import { Modal } from "../modal/Modal";
import { UpdatedSensor } from "../../../lib/actions/settings.actions";
import { useRouter } from "next/navigation";
import { SensorType } from "@/types/types";
import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";
import { SettingsSvg } from "../icons_svg/SettingsSvg";

type SettingsPropsType = {
  lang: string;
  email: string | undefined;
  deviceId: string;
  sensors: SensorType[];
  settingsSensors: UpdatedSensor[] | undefined;
};

export function SettingsBackupPower({
  lang,
  email,
  deviceId,
  sensors,
  settingsSensors,
}: SettingsPropsType) {
  const session = useSession();
  const router = useRouter();
  const [isOpenModal, setIsOpenModal] = useState(false);

  const userId = session.data?.user.id;

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<any>();

  const onSubmit = () => {
    router.refresh();
    setIsOpenModal(false);
  };

  return (
    <div className="text-sm">
      <div className="" onClick={() => setIsOpenModal(true)}>
        <SettingsSvg
          title={
            lang === "RU"
              ? "Настройка параметров резервного источника питания"
              : "Setting the parameters of the backup power supply"
          }
          color={"#616161"}
          size={"25"}
        />
      </div>
      <Modal active={isOpenModal} setActive={setIsOpenModal}>
        <p className="pb-5">
          <span className="text-lime-600 font-medium">{email}</span>
          {lang === "RU"
            ? ", сдесь вы можете настроить параметры состояния резервного источника питания"
            : ", here you can configure the status settings of the backup power supply"}
        </p>
      </Modal>
    </div>
  );
}
