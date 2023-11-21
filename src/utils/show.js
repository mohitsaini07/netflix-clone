import axios from "axios";

export async function fetchShowDetails(id) {
  const { data } = await axios.get(`https://api.themoviedb.org/3/movie/${id}`, {
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_TMDB_ACCESS_TOKEN}`,
      Accept: "application/json",
    },
  });

  return data;
}
