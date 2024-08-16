'use client';

import { updateLanguage } from '../../../lib/actions/user_settings.actions';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

type LanguagePropsType = {
  language: string;
};

export function Language({ language }: LanguagePropsType) {
  const [isLoadingLang, setIsLoadingLang] = useState<boolean>(false);

  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    setIsLoadingLang(false);
  }, [language]);

  const onClickHandler = async (lang: string) => {
    setIsLoadingLang(true);
    const result = await updateLanguage({ userId: session.data?.user.id, language: lang });
    router.refresh();
  };

  return (
    <div className="flex truncate text-orange-600 lg820:mb-3">
      <button
        onClick={() => onClickHandler('RU')}
        disabled={isLoadingLang || language === 'RU'}
        className={`${language !== 'RU' && 'bg-gray-600 border border-gray-600 rounded-s text-stone-50 transition-all cursor-pointer'} ${
          isLoadingLang && 'opacity-25'
        } pl-2 pr-2 font-semibold`}
      >
        {'RU'}
      </button>
      <button
        onClick={() => onClickHandler('EN')}
        disabled={isLoadingLang || language === 'EN'}
        className={`${language !== 'EN' && 'bg-gray-600 border border-gray-600 rounded-e text-stone-50 transition-all cursor-pointer'} ${
          isLoadingLang && 'opacity-25'
        } pl-2 pr-2 font-semibold`}
      >
        {'EN'}
      </button>
    </div>
  );
}
