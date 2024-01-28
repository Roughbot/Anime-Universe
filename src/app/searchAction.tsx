"use server";

export const searchAnimeData = async (search: string, page = 1) => {
  try {
    const response = await fetch(
      `https://shikimori.one/api/animes?search=${search}&page=${page}&limit=8&order=popularity`
    );

    const data = await response.json();

    return data;
  } catch (error) {
    console.log(error);
  }
};
