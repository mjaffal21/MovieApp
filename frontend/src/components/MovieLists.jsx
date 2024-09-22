import React, { useState, useEffect } from "react";
import UpcomingMoviesSection from "../components/UpcomingMoviesSection";
import PopularMoviesSection from "../components/PopularMoviesSection";
import TopRatedMoviesSection from "../components/TopRatedMoviesSection";
import axios from "axios";

const MovieLists = () => {
  const [popMovies, setPopMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [upcMovies, setUpcMovies] = useState([]);
  const apiUrl =
    process.env.NODE_ENV === "development"
      ? process.env.REACT_APP_API_URL_DEV
      : process.env.REACT_APP_API_URL_PROD;
  const fetchPopular = async () => {
    const popMovies = await axios
      .get(`${apiUrl}/api/Movies/popular-movies`)
      .then((res) => {
        const { results } = res.data;
        setPopMovies(results);
      });
  };
  const fetchTopRated = async () => {
    const topRatedMovies = await axios
      .get(`${apiUrl}/api/Movies/top-rated`)
      .then((res) => {
        const { results } = res.data;
        setTopRatedMovies(results);
      });
  };
  const fetchUpcoming = async () => {
    const upcomingMovies = await axios
      .get(`${apiUrl}/api/Movies/upcoming-movies`)
      .then((res) => {
        const { results } = res.data;
        setUpcMovies(results);
      });
  };

  useEffect(() => {
    fetchPopular();
    fetchTopRated();
    fetchUpcoming();
  }, []);
  return (
    <div className="py-5 px-2">
      <PopularMoviesSection popMovies={popMovies} />
      <UpcomingMoviesSection upcMovies={upcMovies} />
      <TopRatedMoviesSection topRatedMovies={topRatedMovies} />
    </div>
  );
};

export default MovieLists;
