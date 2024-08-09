type SuccessModalPropsType = {
  saveOkModal: boolean;
  lang: string;
};

export function SuccessModal({ saveOkModal, lang }: SuccessModalPropsType) {
  return (
    <div
      className={`${
        saveOkModal ? 'w-auto h-auto opacity-100 transition-all' : 'w-0 h-0 opacity-0 transition-all scale-50'
      } z-50 fixed top-5 left-2/4 bg-white border border-2 rounded-md border-lime-500 shadow-lg sm:left-4 sm:right-4 md:left-48`}
    >
      {saveOkModal ? (
        lang === 'RU' ? (
          <p className="m-4">{'Настройки успешно сохранены'}</p>
        ) : (
          <p className="m-4">{'The settings have been saved successfully'}</p>
        )
      ) : (
        ''
      )}
    </div>
  );
}
