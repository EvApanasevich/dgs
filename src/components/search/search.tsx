'use client';
import Image from 'next/image';
import searchIcon from '../../../public/search.png';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useDebounce } from 'use-debounce';
import { useTranslation } from 'next-i18next';
import { appWithTranslation } from 'next-i18next';

type SearchPropsType = {
  lang: string;
};

export function Search({ lang }: SearchPropsType) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchText, setSearchText] = useState('');
  const [query] = useDebounce(searchText, 500);

  useEffect(() => {
    if (!query) {
      router.push(`/review?page=1`);
    } else {
      router.push(`/review?search=${query.toLowerCase()}&page=1`);
    }
  }, [query, router]);

  return (
    <div className={`${searchText && 'shadow-3xl'} flex items-center justify-between h-8 border border-gray-500 rounded px-1 bg-white`}>
      <input
        id={'1'}
        className={'text-sm w-64 xl:w-48 lg:w-52 h-6 px-3 outline-none'}
        value={searchText}
        type="text"
        placeholder={lang === 'RU' ? 'поиск...' : 'search...'}
        onChange={e => setSearchText(e.target.value)}
        maxLength={30}
      />

      <Image className="inline-block h-6 w-6 rounded-full bg-white" src={searchIcon} alt="" />
    </div>
  );
}
