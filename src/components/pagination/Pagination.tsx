'use client';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Loading } from '../loading/Loading';

type PaginationPropsType = {
  countDevices: number | undefined;
  countObjectsInPage: number;
};

const COUNT_PAGES_IN_BLOCK = 5;

export function Pagination({ countDevices, countObjectsInPage }: PaginationPropsType) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = searchParams.get('page');
  const [isPandingPage, setIsPandingPage] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [currentPageBlock, setCurrentPageBlock] = useState<number>(1);
  const [pageBlocks, setPageBlocks] = useState<number>(Math.ceil(countDevices ? countDevices / (COUNT_PAGES_IN_BLOCK * countObjectsInPage) : 0));

  if (currentPage === Number(searchParams.get('page'))) {
    if (isPandingPage) {
      setIsPandingPage(false);
    }
  } else {
    if (!isPandingPage) {
      setIsPandingPage(true);
    }
  }

  useEffect(() => {
    setPageBlocks(Math.ceil(countDevices ? countDevices / (COUNT_PAGES_IN_BLOCK * countObjectsInPage) : 0));
    setCurrentPageBlock(1);
    setCurrentPage(1);
  }, [countDevices]);

  const countPages = countDevices ? Math.ceil(countDevices / countObjectsInPage) : 0;
  const arrNumPages = [];
  for (let i = 0; i < countPages; i++) {
    arrNumPages.push(i + 1);
  }
  const pages = arrNumPages.filter((p, i) => {
    return i < currentPageBlock * COUNT_PAGES_IN_BLOCK && i >= (currentPageBlock - 1) * COUNT_PAGES_IN_BLOCK;
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
    onClickPageHandler(pages[0] - COUNT_PAGES_IN_BLOCK);
  };

  return (
    <div className={'flex justify-center pt-3 text-gray-600'}>
      <div className={'flex h-6'}>
        <div className={'w-16'}>
          {pageBlocks > 1 && currentPageBlock !== 1 ? (
            <span onClick={onClickPrevHandler} className="cursor-pointer pr-5">
              {'< ...'}
            </span>
          ) : null}
        </div>
        {isPandingPage ? (
          <Loading width={'w-5'} height={'h-5'} />
        ) : (
          pages.map(p => (
            <span
              key={p}
              aria-disabled={isPandingPage}
              onClick={e => onClickPageHandler(p)}
              className={`${currentPage === p ? 'text-red-500 border-b-2 border-red-500 font-semibold' : ''} px-1 cursor-pointer`}
            >
              {p}
            </span>
          ))
        )}
        <div className={'w-16'}>
          {pageBlocks > 1 && currentPageBlock !== pageBlocks ? (
            <span onClick={onClickNextHandler} className="cursor-pointer pl-5">
              {'... >'}
            </span>
          ) : null}
        </div>
      </div>
    </div>
  );
}
