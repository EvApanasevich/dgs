"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";

function getGreeting() {
   const hours = new Date().getHours();
   if (hours >= 0 && hours < 6) {
      return "Доброй ночи!";
   } else if (hours >= 6 && hours < 12) {
      return "Доброе утро!";
   } else if (hours >= 12 && hours < 18) {
      return "Добрый день!";
   } else {
      return "Добрый вечер!";
   }
}

export function NavProfile() {
   const session = useSession();

   return (
      <div className="flex md:pb-2 sm:flex-col-reverse sm:items-end">
         <div>
            <span className="text-gray-800 text-xs leading-8">{getGreeting()}</span>
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
                  Выйти
               </Link>
            </span>
         ) : (
            <span className="h-8 border border-gray-500 rounded px-4">
               <Link href="/signin" className="text-gray-700 leading-8">
                  Войти
               </Link>
            </span>
         )}
      </div>
   );
}
