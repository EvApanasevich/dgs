"use client";

import { updateLanguage } from "../../../lib/actions/user_settings.actions";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

type LanguagePropsType = {
  lang: string;
};

export function Language({ lang }: LanguagePropsType) {
  //const { lang, setLang } = useContext(InteractiveContext);
  const session = useSession();
  const router = useRouter();

  const onClickHandler = (lang: string) => {
    updateLanguage({ userId: session.data?.user.id, language: lang });
    router.refresh();
    //setLang(lang);
  };

  return (
    <div className="flex h-5 border-2 border-gray-200 rounded-xl truncate text-red-500 lg820:mb-3">
      <button
        onClick={() => onClickHandler("RU")}
        className={`${
          lang !== "RU" && "bg-gray-200  text-gray-700"
        } pl-3 pr-1  text-xs`}
      >
        RU
      </button>
      <button
        onClick={() => onClickHandler("EN")}
        className={`${
          lang !== "EN" && "bg-gray-200  text-gray-700"
        } pl-1 pr-3 text-xs`}
      >
        EN
      </button>
    </div>
  );
}
