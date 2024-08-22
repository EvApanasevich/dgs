type SuccessModalPropsType = {
  isOpenSuccessModal: boolean;
  error: boolean;
  lang: string;
};

export function SuccessModal({ error, lang, isOpenSuccessModal }: SuccessModalPropsType) {
  return (
    <div
      className={`${
        isOpenSuccessModal ? 'w-auto h-auto opacity-100 transition-all' : 'w-0 h-0 opacity-0 transition-all scale-50'
      } z-50 fixed top-5 left-2/4 border border-2 rounded-md ${
        error ? 'border-red-600' : 'border-lime-600'
      } shadow-lg sm:left-4 sm:right-4 md:left-48`}
    >
      {!error ? (
        lang === 'RU' ? (
          <p className="m-4 text-lime-600">{'Настройки успешно сохранены'}</p>
        ) : (
          <p className="m-4 text-lime-600">{'The settings have been saved successfully'}</p>
        )
      ) : lang === 'RU' ? (
        <p className="m-4 text-red-600">{'Произошла ошибка, попробуйте ещё раз!'}</p>
      ) : (
        <p className="m-4 text-red-600">{'An error occurred, please try again!'}</p>
      )}
    </div>
  );
}
