import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="max-w-6xl mx-auto py-5 px-2  text-white">
      <div className="border border-b max-w-6xl mx-auto"></div>
      <div className="flex flex-col justify-center items-center md:flex-row md:justify-between">
        <div className="my-5">
          <Link to="/">
            <h1 className="text-4xl font-bold font-lob">Movies Hub</h1>
          </Link>
        </div>
        <div className="flex flex-col md:flex-row justify-center items-center gap-2">
          <div className="font-bold hover:bg-purple-500 rounded-full px-3 py-2">
            <Link to="/popular-movies">Popular Movies</Link>
          </div>
          <div className="font-bold hover:bg-purple-500 rounded-full px-3 py-2">
            <Link to="/top-rated">Top Rated Movies</Link>
          </div>
          <div className="font-bold hover:bg-purple-500 rounded-full px-3 py-2">
            <Link to="/upcoming-movies">Upcoming Movies</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
