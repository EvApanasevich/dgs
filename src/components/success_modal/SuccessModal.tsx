type SuccessModalPropsType = {
  saveOkModal: boolean;
  lang: string;
};

export function SuccessModal({ saveOkModal, lang }: SuccessModalPropsType) {
  return (
    <div
      className={`${
        saveOkModal
          ? "opacity-100 transition-all"
          : "opacity-0 transition-all scale-50"
      } z-50 fixed top-5 left-2/4 bg-white border border-2 rounded-md border-lime-500 shadow-lg p-4 sm:left-4 sm:right-4 md:left-48`}
    >
      {lang === "RU"
        ? "Настройки успешно сохранены"
        : "The settings have been saved successfully"}
    </div>
  );
}
