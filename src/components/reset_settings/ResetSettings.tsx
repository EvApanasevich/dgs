import { Loading } from '../loading/Loading';

type ResetSettingsPropsType = {
  resetSettingsHandler: () => Promise<void>;
  lang: string;
  isResetingSettings: boolean;
  isSavingSettings: boolean;
};

export function ResetSettings({ lang, isSavingSettings, isResetingSettings, resetSettingsHandler }: ResetSettingsPropsType) {
  return (
    <div>
      <button
        onClick={resetSettingsHandler}
        className={`relative p-2 mt-5 text-base text-stone-50 font-semibold border border-gray-700 bg-orange-700 rounded hover:bg-stone-50 hover:text-gray-700 sm:text-xs transition-all`}
        disabled={isResetingSettings && isSavingSettings}
        type="button"
      >
        {lang === 'RU' ? 'Сбросить настройки' : 'Reset settings'}
        {isResetingSettings && (
          <div className="absolute top-1 right-1">
            <Loading width={'w-3.5'} height={'h-3.5'} />
          </div>
        )}
      </button>
    </div>
  );
}
