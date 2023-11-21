/* eslint-disable react/prop-types */
import { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import { addShowToFavorites, getUserFavourites } from "../utils/shows";
import { useQuery } from "react-query";
import { fetchShowDetails } from "../utils/show";

const Movie = ({ id }) => {
  const [isLiked, setIsLiked] = useState(false);
  const { user } = useAuth();

  const { data } = useQuery({
    queryKey: ["show-details", id],
    queryFn: () => fetchShowDetails(id),
  });

  /** experimenting with new things */
  useQuery({
    queryKey: ["favorites"],
    queryFn: getUserFavourites,
    onSuccess: (favorites) => {
      setIsLiked(favorites.map((item) => item.showId).includes(id));
    },
  });

  const saveShow = async () => {
    if (user?.email) {
      try {
        if (!isLiked) {
          await addShowToFavorites(user.email, id);
          setIsLiked(true);
        }
      } catch {
        alert("Something went wrong!");
      }
    } else {
      alert("Login to Save!");
    }
  };

  return (
    <div className="relative w-[160px] sm:w-[240px] lg:w-[280px] inline-block cursor-pointer mx-2">
      <img
        className="w-full h-auto block"
        src={`https://image.tmdb.org/t/p/w500/${data?.backdrop_path}`}
        alt={data?.title}
      />
      <div className="absolute top-0 left-0 w-full h-full hover:bg-black/80 opacity-0 hover:opacity-100 text-white">
        <p className="white-space-normal text-xs md:text-sm font-bold flex justify-center items-center h-full text-center">
          {data?.title}
        </p>
        <div onClick={saveShow}>
          {isLiked ? (
            <FaHeart className="absolute top-4 left-4 text-gray-300" />
          ) : (
            <FaRegHeart className="absolute top-4 left-4 text-gray-300" />
          )}
        </div>
      </div>
    </div>
  );
};

export default Movie;
