"use server";

import AnimeCard, { AnimeProp } from "@/components/AnimeCard";

export const searchAnimeData = async (search: string, page: number) => {
  try {
    const response = await fetch(
      `https://shikimori.one/api/animes?search=${search}&page=${page}&limit=8&order=popularity`
    );

    const data = await response.json();

    return data.map((item: AnimeProp, index: number) => {
      return (
        <>
          <AnimeCard key={item.id} anime={item} index={index} />
        </>
      );
    });
  } catch (error) {
    console.log(error);
  }
};
