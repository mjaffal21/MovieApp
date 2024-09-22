import React, { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import axios from "axios";
import Aos from "aos";
import "aos/dist/aos.css";

const TopRatedMovies = () => {
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const apiUrl =
    process.env.NODE_ENV === "development"
      ? process.env.REACT_APP_API_URL_DEV
      : process.env.REACT_APP_API_URL_PROD;
  const fetchTopRated = async () => {
    const topRatedMovies = await axios
      .get(`${apiUrl}/api/Movies/top-rated`)
      .then((res) => {
        const { results } = res.data;
        setTopRatedMovies(results);
      });
  };

  useEffect(() => {
    Aos.init();
    fetchTopRated();
  }, []);
  return (
    <div className="max-w-6xl mx-auto py-5 px-2">
      <h1
        className="text-white text-3xl"
        data-aos="fade-up"
        data-aos-duration="2000"
        data-aos-delay="1000"
      >
        Top Rated Movies
      </h1>
      <div
        className="flex flex-wrap justify-center gap-5 mt-5"
        data-aos="fade-down-right"
        data-aos-duration="2000"
        data-aos-delay="1000"
      >
        {topRatedMovies.map((movie, index) => (
          <MovieCard movie={movie} key={index} />
        ))}
      </div>
    </div>
  );
};

export default TopRatedMovies;
