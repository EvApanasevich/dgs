"use client";
import {
  createContext,
  useState,
  useMemo,
  Dispatch,
  SetStateAction,
} from "react";

type TypeInteractiveContext = {
  isOpenProfMenu: boolean;
  setIsOpenProfMenu: Dispatch<SetStateAction<boolean>>;
  lang: string;
  setLang: Dispatch<SetStateAction<string>>;
};

export const InteractiveContext = createContext<TypeInteractiveContext>({
  isOpenProfMenu: false,
  setIsOpenProfMenu: () => {},
  lang: "RU",
  setLang: () => {},
});

export function InteractiveProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpenProfMenu, setIsOpenProfMenu] = useState<boolean>(false);
  const [lang, setLang] = useState<string>("EN");

  const InteractiveContextValue = useMemo(
    () => ({
      isOpenProfMenu,
      setIsOpenProfMenu,
      lang,
      setLang,
    }),
    [isOpenProfMenu, setIsOpenProfMenu, lang, setLang]
  );

  return (
    <InteractiveContext.Provider value={InteractiveContextValue}>
      {children}
    </InteractiveContext.Provider>
  );
}
