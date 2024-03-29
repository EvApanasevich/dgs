"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";

function getGreeting(lang: string) {
  const hours = new Date().getHours();
  if (hours >= 0 && hours < 6) {
    return lang === "RU" ? "Доброй ночи!" : "Welcome!";
  } else if (hours >= 6 && hours < 12) {
    return lang === "RU" ? "Доброе утро!" : "Good morning!";
  } else if (hours >= 12 && hours < 18) {
    return lang === "RU" ? "Добрый день!" : "Good afternoon!";
  } else {
    return lang === "RU" ? "Добрый вечер!" : "Good evening!";
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
        <div className="text-gray-800 text-xs leading-8 sm:leading-3 sm:pt-3">
          {getGreeting(lang)}
        </div>
        <div className="text-gray-900 font-medium leading-8 text-sm pl-3 pr-10 xl:pr-3 lg820:pr-0">
          {session?.data ? session?.data?.user?.email : ""}
        </div>
      </div>

      {session?.data ? (
        <span className="h-8 w-16 text-center  border border-gray-500 rounded ">
          <Link
            href="#"
            onClick={() => signOut({ callbackUrl: "/" })}
            className="text-xs text-gray-700 leading-8"
          >
            {lang === "RU" ? "Выйти" : "LogOut"}
          </Link>
        </span>
      ) : (
        <span className="h-8 w-16 text-center  border border-gray-500 rounded px-4">
          <Link href="/signin" className="text-gray-700 leading-8">
            {lang === "RU" ? "Войти" : "LogIn"}
          </Link>
        </span>
      )}
    </div>
  );
}
