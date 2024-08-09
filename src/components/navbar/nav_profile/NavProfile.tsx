'use client';
import { useSession, signIn, signOut } from 'next-auth/react';
import Link from 'next/link';

function getGreeting(lang: string) {
  const hours = new Date().getHours();
  if (hours >= 0 && hours < 6) {
    return lang === 'RU' ? 'Доброй ночи!' : 'Welcome!';
  } else if (hours >= 6 && hours < 12) {
    return lang === 'RU' ? 'Доброе утро!' : 'Good morning!';
  } else if (hours >= 12 && hours < 18) {
    return lang === 'RU' ? 'Добрый день!' : 'Good afternoon!';
  } else {
    return lang === 'RU' ? 'Добрый вечер!' : 'Good evening!';
  }
}

type NavProfilePropsType = {
  lang: string;
};

export function NavProfile({ lang }: NavProfilePropsType) {
  const session = useSession();

  return (
    <div className="flex md:pb-2 sm:flex-col-reverse sm:items-end lg820:items-end lg820:flex-col-reverse">
      <div className="flex sm:flex-col sm:items-end">
        <div className="text-gray-800 text-xs leading-8 sm:leading-3 sm:pt-3">{getGreeting(lang)}</div>
        <div className="text-gray-900 font-medium leading-8 text-sm pl-3 pr-10 xl:pr-3 lg820:pr-0">
          {session?.data ? session?.data?.user?.email : ''}
        </div>
      </div>

      {session?.data ? (
        <span className="h-8 w-16 text-center border rounded border-gray-600 text-stone-50 hover:bg-stone-50 hover:text-orange-600 bg-gray-600 transition-all">
          <Link href="#" onClick={() => signOut({ callbackUrl: '/' })} className="font-semibold leading-7">
            {lang === 'RU' ? 'Выйти' : 'LogOut'}
          </Link>
        </span>
      ) : (
        <span className="h-8 w-16 text-center border rounded border-gray-600 text-stone-50 hover:bg-stone-50 hover:text-orange-600 bg-gray-600 rounded transition-all">
          <Link href="/signin" className="font-semibold leading-7">
            {lang === 'RU' ? 'Войти' : 'LogIn'}
          </Link>
        </span>
      )}
    </div>
  );
}
