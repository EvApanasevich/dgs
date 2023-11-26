"use client";
import Image from "next/image";
import searchIcon from "../../../public/search.png";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDebounce } from "use-debounce";

export function Search() {
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
    <div className="flex items-center justify-between h-10 border border-gray-500 rounded px-1">
      <input
        className="text-sm w-64 lg:w-52 h-8 p-4 outline-none"
        value={searchText}
        type="text"
        placeholder="поиск..."
        onChange={(e) => setSearchText(e.target.value)}
        maxLength={30}
        autoFocus={true}
      />

      <Image
        className="inline-block h-6 w-6 rounded-full bg-white"
        src={searchIcon}
        alt=""
      />
    </div>
  );
}
