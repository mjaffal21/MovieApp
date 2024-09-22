import axios from "axios";
import React, { useEffect, useState } from "react";
import { msalInstance } from "../config/msalConfig";
import { toast } from "react-toastify";
import Aos from "aos";
import "aos/dist/aos.css";

const MovieDetails = ({ movieDetails, user }) => {
  const [added, setAdded] = useState(false);
  const [moviesIds, setMoviesIds] = useState([]);
  const apiUrl =
    process.env.NODE_ENV === "development"
      ? process.env.REACT_APP_API_URL_DEV
      : process.env.REACT_APP_API_URL_PROD;

  const fetchAccessToken = async () => {
    if (!user) {
      toast.error("You must be logged in.");
      throw new Error("User is not logged in");
    }
    const { accessToken } = await msalInstance.acquireTokenSilent({
      scopes: [
        "https://jaffalcompany.onmicrosoft.com/184a2eb3-952b-4101-86b4-57a94d46aa0f/tasks.read",
      ],
      account: user,
    });
    return accessToken;
  };

  const fetchOfflineList = async () => {
    try {
      const accessToken = await fetchAccessToken();
      const res = await axios.get(`${apiUrl}/api/Movies/offline-list`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const movieIds = res.data.map((item) => item.movieId);
      setMoviesIds(movieIds);
    } catch (error) {
      console.log("Failed to fetch offline list.");
    }
  };

  const handleAddToOfflineList = async () => {
    if (moviesIds.includes(movieDetails.id)) {
      return toast.error("Movie is already in your offline list.");
    }
    try {
      const accessToken = await fetchAccessToken();
      await axios.post(
        `${apiUrl}/api/Movies/add-to-offline`,
        { movieId: movieDetails.id },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setMoviesIds([...moviesIds, movieDetails.id]);
      setAdded(true);
      toast.success("Movie added to your offline list.");
    } catch (error) {
      toast.error("Failed to add movie to offline list.");
    }
  };

  const handleRemoveFromOfflineList = async () => {
    if (!moviesIds.includes(movieDetails.id)) {
      return toast.error("Movie is not in your offline list.");
    }
    try {
      const accessToken = await fetchAccessToken();
      await axios.delete(`${apiUrl}/api/Movies/remove-from-offline`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        data: {
          movieId: movieDetails.id,
        },
      });
      setMoviesIds(moviesIds.filter((id) => id !== movieDetails.id));
      setAdded(false);
      toast.success("Movie removed from offline list.");
    } catch (error) {
      toast.error("Failed to remove movie from offline list.");
    }
  };

  useEffect(() => {
    Aos.init();
    if (user) {
      fetchOfflineList();
    }
  }, [user]);

  return (
    <>
      <div className="flex md:flex-row flex-col items-center gap-5 mt-7">
        <div
          className="flex flex-wrap items-center gap-5 w-full md:w-[60%]"
          data-aos="fade-down"
          data-aos-duration="2000"
          data-aos-delay="1000"
        >
          {movieDetails.genres?.map((genre, index) => (
            <h1 key={index} className="bg-purple-500 p-2 rounded-full">
              {genre.name}
            </h1>
          ))}
        </div>
        <div
          className="w-full md:w-[40%] md:flex md:justify-end"
          data-aos="fade-down"
          data-aos-duration="2000"
          data-aos-delay="1000"
        >
          {!added && !moviesIds.includes(movieDetails.id) ? (
            <button
              className="bg-purple-500 rounded-full py-2 px-3 w-full md:w-fit"
              onClick={() => {
                handleAddToOfflineList();
              }}
            >
              Add to Offline List
            </button>
          ) : (
            <button
              className="bg-purple-500 rounded-full py-2 px-3 w-full md:w-fit"
              onClick={() => {
                handleRemoveFromOfflineList();
              }}
            >
              Remove From Offline List
            </button>
          )}
        </div>
      </div>

      <div className="mt-5">
        <h1
          className="text-xl font-bold mb-2"
          data-aos="fade-up"
          data-aos-duration="2000"
          data-aos-delay="1000"
        >
          Overview:
        </h1>
        <h1
          className="my-4 text-justify"
          data-aos="fade-down"
          data-aos-duration="2000"
          data-aos-delay="1000"
        >
          {movieDetails?.overview}
        </h1>
      </div>
      <div className="flex flex-col md:flex-row items-center gap-5">
        <div className="md:w-[68%] w-full">
          <div>
            <h1
              className="text-xl font-bold mb-2"
              data-aos="fade-down"
              data-aos-duration="2000"
              data-aos-delay="1000"
            >
              Production Companies:
            </h1>
            <div
              className="flex flex-wrap gap-5"
              data-aos="fade-down"
              data-aos-duration="2000"
              data-aos-delay="1000"
            >
              {movieDetails.production_companies?.map((prod_comp, index) => (
                <p key={index} className="bg-purple-500 rounded-xl p-2 text-sm">
                  {prod_comp.name}
                </p>
              ))}
            </div>
          </div>
          <div className="mt-5">
            <div>
              <h1
                className="text-xl font-bold mb-2"
                data-aos="fade-down"
                data-aos-duration="2000"
                data-aos-delay="1000"
              >
                Production Countries:
              </h1>
              <div
                className="flex flex-wrap gap-5"
                data-aos="fade-down"
                data-aos-duration="2000"
                data-aos-delay="1000"
              >
                {movieDetails.production_countries?.map(
                  (prod_country, index) => (
                    <p
                      key={index}
                      className="bg-purple-500 rounded-xl p-2 text-sm"
                    >
                      {prod_country.name}
                    </p>
                  )
                )}
              </div>
            </div>
          </div>
          <div className="mt-5">
            <div>
              <h1
                className="text-xl font-bold mb-2"
                data-aos="fade-down"
                data-aos-duration="2000"
                data-aos-delay="1000"
              >
                Spoken Languages:
              </h1>
              <div
                className="flex flex-wrap gap-5"
                data-aos="fade-up"
                data-aos-duration="2000"
                data-aos-delay="1000"
              >
                {movieDetails.spoken_languages?.map((spoken_lang, index) => (
                  <p
                    key={index}
                    className="bg-purple-500 rounded-xl p-2 text-sm"
                  >
                    {spoken_lang.name}
                  </p>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-5">
            <div>
              <h1
                className="text-xl font-bold mb-2"
                data-aos="fade-down"
                data-aos-duration="2000"
                data-aos-delay="1000"
              >
                Origin Countries:
              </h1>
              <div
                className="flex flex-wrap gap-5"
                data-aos="fade-down"
                data-aos-duration="2000"
                data-aos-delay="1000"
              >
                {movieDetails.origin_country?.map((or_country, index) => (
                  <p
                    key={index}
                    className="bg-purple-500 rounded-xl p-2 text-sm"
                  >
                    {or_country}
                  </p>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-5">
            <h1
              className="text-xl font-bold mb-2"
              data-aos="fade-down"
              data-aos-duration="2000"
              data-aos-delay="1000"
            >
              Status:
            </h1>
            <p
              className=" bg-purple-500 rounded-xl p-2 text-sm w-fit"
              data-aos="fade-up"
              data-aos-duration="2000"
              data-aos-delay="1000"
            >
              {movieDetails.status}
            </p>
          </div>
          <div className="my-5">
            <h1
              className="text-xl font-bold mb-2"
              data-aos="fade-down"
              data-aos-duration="2000"
              data-aos-delay="1000"
            >
              Release Date:
            </h1>
            <p
              className=" bg-purple-500 rounded-xl p-2 text-sm w-fit"
              data-aos="fade-down"
              data-aos-duration="2000"
              data-aos-delay="1000"
            >
              {movieDetails.release_date}
            </p>
          </div>
        </div>
        <div className="md:w-[30%] w-full">
          <div>
            <h1
              className="text-xl font-bold mb-2"
              data-aos="fade-down"
              data-aos-duration="2000"
              data-aos-delay="1000"
            >
              Original Language:
            </h1>
            <p
              className=" bg-purple-500 rounded-xl p-2 text-sm w-fit"
              data-aos="fade-down"
              data-aos-duration="2000"
              data-aos-delay="1000"
            >
              {movieDetails.original_language}
            </p>
          </div>
          <div className="mt-5">
            <h1
              className="text-xl font-bold mb-2"
              data-aos="fade-down"
              data-aos-duration="2000"
              data-aos-delay="1000"
            >
              Budget:
            </h1>
            <p
              className=" bg-purple-500 rounded-xl p-2 text-sm w-fit"
              data-aos="fade-down"
              data-aos-duration="2000"
              data-aos-delay="1000"
            >
              ${movieDetails.budget?.toLocaleString()}
            </p>
          </div>
          <div className="mt-5">
            <h1
              className="text-xl font-bold mb-2"
              data-aos="fade-down"
              data-aos-duration="2000"
              data-aos-delay="1000"
            >
              Revenue:
            </h1>
            <p
              className=" bg-purple-500 rounded-xl p-2 text-sm w-fit"
              data-aos="fade-down"
              data-aos-duration="2000"
              data-aos-delay="1000"
            >
              ${movieDetails.revenue?.toLocaleString()}
            </p>
          </div>
          <div className="mt-5">
            <h1
              className="text-xl font-bold mb-2"
              data-aos="fade-down"
              data-aos-duration="2000"
              data-aos-delay="1000"
            >
              Popularity:
            </h1>
            <p
              className=" bg-purple-500 rounded-xl p-2 text-sm w-fit"
              data-aos="fade-up"
              data-aos-duration="2000"
              data-aos-delay="1000"
            >
              {movieDetails.popularity?.toLocaleString()}
            </p>
          </div>
          <div className="mt-5">
            <h1
              className="text-xl font-bold mb-2"
              data-aos="fade-down"
              data-aos-duration="2000"
              data-aos-delay="1000"
            >
              Vote Average:
            </h1>
            <p
              className=" bg-purple-500 rounded-xl p-2 text-sm w-fit"
              data-aos="fade-down"
              data-aos-duration="2000"
              data-aos-delay="1000"
            >
              {movieDetails.vote_average?.toLocaleString()}
            </p>
          </div>
          <div className="my-5">
            <h1
              className="text-xl font-bold mb-2"
              data-aos="fade-down"
              data-aos-duration="2000"
              data-aos-delay="1000"
            >
              Vote Count:
            </h1>
            <p
              className=" bg-purple-500 rounded-xl p-2 text-sm w-fit"
              data-aos="fade-up"
              data-aos-duration="2000"
              data-aos-delay="1000"
            >
              {movieDetails.vote_count?.toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default MovieDetails;
