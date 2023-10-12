'use client'
import {
   createContext,
   useState,
   useMemo,
   Dispatch,
   SetStateAction
} from 'react'

type TypeStateContext = {
   period: {},
   setPeriod: Dispatch<SetStateAction<{}>>
}

export const StateContext = createContext<TypeStateContext>({
   period: {},
   setPeriod: () => { }
})

export function StateProvider({ children }: { children: React.ReactNode }) {

   const [period, setPeriod] = useState<{}>({ from: '2023-09-11 03:00:00', to: '2023-09-14 03:00:00' })

   const stateContextValue = useMemo(() => ({
      period,
      setPeriod,
   }), [period, setPeriod]);

   return (
      <StateContext.Provider value={stateContextValue}>
         {children}
      </StateContext.Provider>
   )
}