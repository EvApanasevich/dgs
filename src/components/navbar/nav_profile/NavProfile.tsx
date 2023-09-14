'use client'
import { useContext } from "react"
import { useSession, signIn, signOut } from "next-auth/react"
import Link from "next/link"
import { NavProfileMenu } from "./nav_profile_menu/NavProfileMenu"
import { InteractiveContext } from "@/providers/InteractiveProvider"
import userIcon from "../../../../public/user.png"
import Image from "next/image"

export function NavProfile() {

   const { isOpenProfMenu, setIsOpenProfMenu } = useContext(InteractiveContext)
   const session = useSession()

   return (
      <>
         <div className="flex">
            <span className="text-gray-300 leading-8">
               {session?.data ? session?.data?.user?.email : ''}
            </span>

            <button onClick={() => {
               setIsOpenProfMenu(!isOpenProfMenu)
            }} type="button" className="relative flex mx-5 rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800" id="user-menu-button" aria-expanded="false" aria-haspopup="true">
               {session?.data ? <Image className="h-8 w-8 rounded-full bg-white" src={userIcon} alt="" /> : null}
            </button>

            {session?.data ?
               <span><Link href="#" onClick={() => signOut({ callbackUrl: "/" })} className="text-gray-300 leading-8">Выйти</Link></span> :
               <span><Link href="/signin" className="text-gray-300 leading-8">Войти</Link></span>}
         </div>

         <NavProfileMenu isOpen={isOpenProfMenu} setIsOpen={setIsOpenProfMenu} />
      </>
   )
}