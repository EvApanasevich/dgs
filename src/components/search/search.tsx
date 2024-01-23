"use client";
import Image from "next/image";
import searchIcon from "../../../public/search.png";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDebounce } from "use-debounce";

type SearchPropsType = {
  lang: string;
};

export function Search({ lang }: SearchPropsType) {
  const router = useRouter();
  const [searchText, setSearchText] = useState("");
  const [query] = useDebounce(searchText, 500);

  useEffect(() => {
    if (!query) {
      router.push("/review");
    } else {
      router.push(`/review?search=${query.toLowerCase()}`);
    }
  }, [query, router]);

  return (
    <div className="flex items-center justify-between h-8 border border-gray-500 rounded px-1">
      <input
        className="text-sm w-64 lg:w-52 h-6 px-3 outline-none"
        value={searchText}
        type="text"
        placeholder={lang === "RU" ? "поиск..." : "search..."}
        onChange={(e) => setSearchText(e.target.value)}
        maxLength={30}
      />

      <Image
        className="inline-block h-6 w-6 rounded-full bg-white"
        src={searchIcon}
        alt=""
      />
    </div>
  );
}
