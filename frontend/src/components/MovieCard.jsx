import React from "react";
import { Link } from "react-router-dom";

const MovieCard = ({ movie }) => {
  return (
    <section className="text-white group flex justify-center">
      <Link to={`/movies/${movie?.id}`}>
        <div className="relative">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie?.poster_path}`}
            alt="poster"
            className="w-60 rounded-xl"
          />
          <div className="absolute top-0 bottom-0 right-0 left-0 bg-gradient-to-b from-transparent to-gray-900 opacity-0 group-hover:opacity-70 transition-opacity duration-300"></div>
          <div className="absolute bottom-5 text-center p-7 w-60 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <h1 className="text-2xl font-bold">{movie?.title}</h1>
            <ul>
              <li className="text-sm line-clamp-3">{movie?.overview}</li>
              <li className="text-sm mt-1">
                Release Date: {movie?.release_date}
              </li>
            </ul>
          </div>
        </div>
      </Link>
    </section>
  );
};

export default MovieCard;
