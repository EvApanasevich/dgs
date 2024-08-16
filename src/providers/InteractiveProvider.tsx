'use client';
import { createContext, useState, useMemo, Dispatch, SetStateAction } from 'react';

type TypeInteractiveContext = {
  isOpenProfMenu: boolean;
  setIsOpenProfMenu: Dispatch<SetStateAction<boolean>>;
  lang: string;
  setLang: Dispatch<SetStateAction<string>>;
  isLoadingDgsItems: boolean;
  setIsLoadingDgsItems: Dispatch<SetStateAction<boolean>>;
};

export const InteractiveContext = createContext<TypeInteractiveContext>({
  isOpenProfMenu: false,
  setIsOpenProfMenu: () => {},
  lang: 'RU',
  setLang: () => {},
  isLoadingDgsItems: false,
  setIsLoadingDgsItems: () => {},
});

export function InteractiveProvider({ children }: { children: React.ReactNode }) {
  const [isOpenProfMenu, setIsOpenProfMenu] = useState<boolean>(false);
  const [lang, setLang] = useState<string>('EN');
  const [isLoadingDgsItems, setIsLoadingDgsItems] = useState<boolean>(false);

  const InteractiveContextValue = useMemo(
    () => ({
      isOpenProfMenu,
      setIsOpenProfMenu,
      lang,
      setLang,
      isLoadingDgsItems,
      setIsLoadingDgsItems,
    }),
    [isOpenProfMenu, setIsOpenProfMenu, lang, setLang, isLoadingDgsItems, setIsLoadingDgsItems],
  );

  return <InteractiveContext.Provider value={InteractiveContextValue}>{children}</InteractiveContext.Provider>;
}
