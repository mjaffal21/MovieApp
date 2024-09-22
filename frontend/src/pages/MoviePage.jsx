import React, { useEffect, useState } from "react";
import MovieVideo from "../components/MovieVideo";
import MovieDetails from "../components/MovieDetails";
import { useParams } from "react-router-dom";
import axios from "axios";

const MoviePage = ({ user }) => {
  const { id } = useParams();
  const [movieDetails, setMovieDetails] = useState({});
  const [movieVideo, setMovieVideo] = useState([]);

  const fetchMovieDetails = async () => {
    const apiUrl =
      process.env.NODE_ENV === "development"
        ? process.env.REACT_APP_API_URL_DEV
        : process.env.REACT_APP_API_URL_PROD;
        
    const movieDetails = await axios
      .get(`${apiUrl}/api/Movies/${id}`)
      .then((res) => {
        setMovieDetails(res.data);
        setMovieVideo(res.data.videos.results);
      });
  };
  useEffect(() => {
    fetchMovieDetails();
  }, [id]);

  return (
    <div className="max-w-6xl mx-auto py-5 px-2 text-white">
      <MovieVideo movieVideo={movieVideo} />
      <MovieDetails movieDetails={movieDetails} user={user} />
    </div>
  );
};

export default MoviePage;
