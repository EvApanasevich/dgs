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
    <div className="container mx-auto flex justify-end pt-5">
      <input
        className="w-80 h-8 border border-gray-500 rounded px-4 mr-2"
        value={searchText}
        type="text"
        placeholder="search object..."
        onChange={(e) => setSearchText(e.target.value)}
      />
      <button>
        <Image
          className="h-8 w-8 rounded-full bg-white"
          src={searchIcon}
          alt=""
        />
      </button>
    </div>
  );
}
