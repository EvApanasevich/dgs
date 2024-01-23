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
    <div className="flex md:pb-2 sm:flex-col-reverse sm:items-end">
      <div>
        <span className="text-gray-800 text-xs leading-8">
          {getGreeting(lang)}
        </span>
        <span className="text-gray-900 font-medium leading-8 text-sm pl-3 pr-10 lg:pr-3">
          {session?.data ? session?.data?.user?.email : ""}
        </span>
      </div>

      {session?.data ? (
        <span className="h-8 border border-gray-500 rounded px-4">
          <Link
            href="#"
            onClick={() => signOut({ callbackUrl: "/" })}
            className="text-xs text-gray-700 leading-8"
          >
            {lang === "RU" ? "Выйти" : "LogOut"}
          </Link>
        </span>
      ) : (
        <span className="h-8 border border-gray-500 rounded px-4">
          <Link href="/signin" className="text-gray-700 leading-8">
            {lang === "RU" ? "Войти" : "LogIn"}
          </Link>
        </span>
      )}
    </div>
  );
}
