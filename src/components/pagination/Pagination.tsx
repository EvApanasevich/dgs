'use client';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Loading } from '../loading/Loading';

type PaginationPropsType = {
  countDevices: number | undefined;
  countObjectsInPage: number;
  countPagesInBlock: number;
  isNotFoundDevices: boolean;
};

export function Pagination({ countDevices, countObjectsInPage, countPagesInBlock, isNotFoundDevices }: PaginationPropsType) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pageParam = searchParams.get('page');
  const [isPandingPage, setIsPandingPage] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [currentPageBlock, setCurrentPageBlock] = useState<number>(1);
  const [pageBlocks, setPageBlocks] = useState<number>(Math.ceil(countDevices ? countDevices / (countPagesInBlock * countObjectsInPage) : 0));

  if (currentPage === Number(pageParam)) {
    if (isPandingPage) {
      setIsPandingPage(false);
    }
  } else {
    if (!isPandingPage) {
      setIsPandingPage(true);
    }
  }

  useEffect(() => {
    setPageBlocks(Math.ceil(countDevices ? countDevices / (countPagesInBlock * countObjectsInPage) : 0));
    setCurrentPageBlock(1);
    setCurrentPage(1);
  }, [countDevices]);

  const countPages = countDevices ? Math.ceil(countDevices / countObjectsInPage) : 0;
  const arrNumPages = [];
  for (let i = 0; i < countPages; i++) {
    arrNumPages.push(i + 1);
  }
  const pages = arrNumPages.filter((p, i) => {
    return i < currentPageBlock * countPagesInBlock && i >= (currentPageBlock - 1) * countPagesInBlock;
  });

  const onClickPageHandler = (currentPage: number) => {
    setIsPandingPage(true);
    setCurrentPage(currentPage);
    if (searchParams.get('search')) {
      router.push(`/review?search=${searchParams.get('search')}&page=${currentPage}`);
    } else {
      router.push(`/review?page=${currentPage}`);
    }
  };
  const onClickNextHandler = () => {
    setCurrentPageBlock(prev => prev + 1);
    onClickPageHandler(pages[pages.length - 1] + 1);
  };
  const onClickPrevHandler = () => {
    setCurrentPageBlock(prev => prev - 1);
    onClickPageHandler(pages[0] - countPagesInBlock);
  };

  if (isNotFoundDevices) {
    return <></>;
  }

  return (
    <div className={'relative flex justify-center mt-5 text-gray-600'}>
      {isPandingPage && (
        <div className="absolute top-0.5">
          <Loading width={'w-5'} height={'h-5'} />
        </div>
      )}

      <div className={`flex h-6 ${isPandingPage && 'pointer-events-none opacity-10'}`}>
        <div className={'w-12 text-right'}>
          <button
            onClick={onClickPrevHandler}
            disabled={pageBlocks >= 1 && currentPageBlock === 1}
            className={`${
              pageBlocks >= 1 && currentPageBlock === 1 ? 'opacity-25 cursor-default' : ''
            } block cursor-pointer pr-3 text-xl font-semibold align-middle`}
          >
            {'<...'}
          </button>
        </div>
        <div>
          {pages.map(p => (
            <span
              key={p}
              onClick={e => onClickPageHandler(p)}
              className={`${
                currentPage === p ? 'text-gray-700 bg-gray-300 leading-[1.5rem] rounded-full font-bold' : ''
              } inline-block min-w-[1.5rem] h-6 px-1 text-lg text-center leading-[1.5rem] font-semibold cursor-pointer`}
            >
              {p}
            </span>
          ))}
        </div>
        <div className={'w-12'}>
          <button
            onClick={onClickNextHandler}
            disabled={pageBlocks >= 1 && currentPageBlock === pageBlocks}
            className={`${
              pageBlocks >= 1 && currentPageBlock === pageBlocks ? 'opacity-25 cursor-default' : ''
            } block cursor-pointer pl-3 text-xl font-semibold align-middle`}
          >
            {'...>'}
          </button>
        </div>
      </div>
    </div>
  );
}
