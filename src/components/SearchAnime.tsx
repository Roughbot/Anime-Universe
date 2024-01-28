"use client";
import { searchAnimeData } from "@/app/searchAction";
import Image from "next/image";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";
import AnimeCard, { AnimeProp } from "./AnimeCard";

let page = 2;

const SearchAnime = () => {
  const [searchData, setSearchData] = useState("");
  const [searchedAnime, setSearchedAnime] = useState<AnimeProp[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const searchAnime = async () => {
    setLoading(true);
    const response = await searchAnimeData(searchData, 1);
    setSearchedAnime(response);
    setLoading(false);
    setSearchData("");
    setHasSearched(true);
  };

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) {
      searchAnimeData(searchData, page).then((res) => {
        setSearchedAnime([...searchedAnime, ...res]);
      });
      page++;
    }
  }, [inView, hasSearched]);

  return (
    <>
      <div className="flex flex-row gap-6 items-center">
        <input
          className="w-full bg-gray-800 rounded-md p-4 text-white"
          type="text"
          placeholder="Search Anime"
          value={searchData}
          onChange={(e) => {
            setSearchData(e.target.value);
          }}
        />
        <button
          onClick={searchAnime}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Search
        </button>
      </div>
      {loading && (
        <section className="flex justify-center items-center w-full">
          <div>
            <Image
              src="./spinner.svg"
              alt="spinner"
              width={56}
              height={56}
              className="object-contain"
            />
          </div>
        </section>
      )}
      {searchedAnime.length > 0 && (
        <section className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10">
          <h2 className="text-3xl text-white font-bold">Result</h2>
        </section>
      )}
      <section className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10">
        {searchedAnime.map((item: AnimeProp, index: number) => {
          return (
            <>
              <AnimeCard key={item.id} anime={item} index={index} />
            </>
          );
        })}
      </section>
      {hasSearched && (
        <section className="flex justify-center items-center w-full">
          <div>
            <Image
              ref={ref}
              src="./spinner.svg"
              alt="spinner"
              width={56}
              height={56}
              className="object-contain"
            />
          </div>
        </section>
      )}
    </>
  );
};

export default SearchAnime;
