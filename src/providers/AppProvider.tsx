'use client'
import { DefaultSession } from "next-auth"
import { InteractiveProvider } from "./InteractiveProvider"
import { SessionProvider } from "next-auth/react"

export function AppProvider({ children}: { children: React.ReactNode}) {

   return (
      <SessionProvider>
         <InteractiveProvider>
            {children}
         </InteractiveProvider>
      </SessionProvider>
   )
}