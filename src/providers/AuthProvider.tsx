'use client'
import {
   createContext,
   useState,
   useMemo,
   Dispatch,
   SetStateAction
} from 'react'

type TypeAuthContext = {
   isOpen: boolean,
   setIsOpen: Dispatch<SetStateAction<boolean>>
}

export const AuthContext = createContext<TypeAuthContext>({
   isOpen: false,
   setIsOpen: () => { }
})

export function AuthProvider({ children }: { children: React.ReactNode }) {

   const [isOpen, setIsOpen] = useState<boolean>(false)

   const authContextValue = useMemo(() => ({
      isOpen,
      setIsOpen,
    }), [isOpen, setIsOpen]);

   return (
      <AuthContext.Provider value={authContextValue}>
         {children}
      </AuthContext.Provider>
   )
}