'use client'
import {
   createContext,
   useState,
   useMemo,
   Dispatch,
   SetStateAction
} from 'react'

type TypeInteractiveContext = {
   isOpenProfMenu: boolean,
   setIsOpenProfMenu: Dispatch<SetStateAction<boolean>>,
}

export const InteractiveContext = createContext<TypeInteractiveContext>({
   isOpenProfMenu: false,
   setIsOpenProfMenu: () => { },
})

export function InteractiveProvider({ children }: { children: React.ReactNode }) {

   const [isOpenProfMenu, setIsOpenProfMenu] = useState<boolean>(false)
   
   const InteractiveContextValue = useMemo(() => ({
      isOpenProfMenu,
      setIsOpenProfMenu,
   }), [
      isOpenProfMenu, setIsOpenProfMenu,
   ]);

   return (
      <InteractiveContext.Provider value={InteractiveContextValue}>
         {children}
      </InteractiveContext.Provider>
   )
}