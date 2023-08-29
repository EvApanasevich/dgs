'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"

type NavLinkType = {
   label: string,
   href: string,
}

type NavbarLinkProps = {
   navLinks: NavLinkType[]
}

export function Navigation({ navLinks }: NavbarLinkProps) {

   const pathName = usePathname()

   return (
      <>
         {navLinks.map(link => {
            const isActive = pathName === link.href

            return (
                     <Link onClick={() => {console.log('hhh')}}
                        key={link.label}
                        href={link.href}
                        className={isActive ? "bg-white text-gray-900 rounded-lg px-3 py-2 text-sm font-medium" :
                           "text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"}
                     >
                        {link.label}
                     </Link >
            )
         })}
      </>
   )
}