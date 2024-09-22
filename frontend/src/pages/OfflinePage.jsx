import React, { useEffect, useState } from "react";
import { msalInstance } from "../config/msalConfig";
import axios from "axios";
import MovieCard from "../components/MovieCard";
import { toast } from "react-toastify";
import Aos from "aos";
import "aos/dist/aos.css";

const OfflinePage = ({ user }) => {
  const [offlineList, setOfflineList] = useState([]);
  const apiUrl =
    process.env.NODE_ENV === "development"
      ? process.env.REACT_APP_API_URL_DEV
      : process.env.REACT_APP_API_URL_PROD;

  const fetchOfflineList = async () => {
    const accessToken = await msalInstance.acquireTokenSilent({
      scopes: [
        "https://jaffalcompany.onmicrosoft.com/184a2eb3-952b-4101-86b4-57a94d46aa0f/tasks.read",
      ],
      account: user,
    });
    try {
      const res = await axios.get(`${apiUrl}/api/Movies/offline-list`, {
        headers: {
          Authorization: `Bearer ${accessToken.accessToken}`,
          "Content-Type": "application/json",
        },
      });
      const movieIds = res.data;
      const movieDetails = movieIds.map(async (id) => {
        const response = await axios
          .get(`${apiUrl}/api/Movies/${id.movieId}`)
          .then((res) => {
            setOfflineList((prevList) => [...prevList, res.data]);
          })
          .catch((err) => {
            toast.error(`Error: ${err}`);
          });
      });
    } catch (error) {
      toast.error("Error removing movie from offline list");
    }
  };

  useEffect(() => {
    Aos.init();
    if (user) {
      fetchOfflineList();
    }
  }, [user]);

  return (
    <div className="max-w-6xl mx-auto py-5 px-2">
      <h1 className="text-white text-3xl" data-aos="fade-up">
        My Offline List
      </h1>
      <div
        className="flex flex-wrap justify-center gap-5 mt-5"
        data-aos="fade-down-right"
      >
        {offlineList && offlineList.length > 0 ? (
          offlineList?.map((movie, index) => (
            <MovieCard movie={movie} key={index} />
          ))
        ) : (
          <div className="h-[53vh]">
            <p className="text-white">Nothing in your Offline List</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OfflinePage;
