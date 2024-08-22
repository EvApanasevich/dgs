'use client';
import Image from 'next/image';
import searchIcon from '../../../public/search.png';
import { ChangeEvent, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useDebounce } from 'use-debounce';
import { useTranslation } from 'next-i18next';
import { appWithTranslation } from 'next-i18next';
import { Loading } from '../loading/Loading';

type SearchPropsType = {
  lang: string;
};

export function Search({ lang }: SearchPropsType) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const search = searchParams.get('search');
  const [searchText, setSearchText] = useState('');
  const [query] = useDebounce(searchText, 500);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    if (search) {
      setIsSearching(false);
    }

    if (!query) {
      router.push(`/review?page=1`);
    } else {
      router.push(`/review?search=${query.toLowerCase()}&page=1`);
    }
  }, [query, router, search]);

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setIsSearching(true);
    setSearchText(e.target.value);
  };

  return (
    <div className={`${searchText && 'shadow-3xl'} flex items-center justify-between h-8 border border-gray-500 rounded px-1 bg-white`}>
      <input
        id={'1'}
        className={'text-sm w-64 xl:w-48 lg:w-52 h-6 px-3 outline-none'}
        value={searchText}
        type="text"
        placeholder={lang === 'RU' ? 'поиск...' : 'search...'}
        onChange={e => onChangeHandler(e)}
        maxLength={30}
      />

      {isSearching ? (
        <div className="flex justify-center items-center w-6 h-6">
          <Loading width={'w-4'} height={'h-4'} />
        </div>
      ) : (
        <Image className="inline-block h-6 w-6 rounded-full bg-white" src={searchIcon} alt="" />
      )}
    </div>
  );
}
