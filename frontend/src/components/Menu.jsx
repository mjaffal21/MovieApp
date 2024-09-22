import React from "react";
import { Link } from "react-router-dom";
import { LoginButton } from "./LoginButton";
import { EditProfileButton } from "./EditProfileButton";
import { LogoutButton } from "./LogoutButton";

const Menu = ({ user, location, setUser }) => {
  return (
    <>
      <ul className="text-white absolute z-10 top-0 right-0 bottom-0 w-full min-h-screen bg-black text-2xl flex flex-col gap-5 justify-center items-center">
        {!user && (
          <div className="hover:bg-purple-500 p-2 rounded-full">
            <LoginButton setUser={setUser} />
          </div>
        )}
        {user && (
          <>
            <div className="hover:bg-purple-500 p-2 rounded-full">
              <EditProfileButton setUser={setUser} />
            </div>
            <div className="hover:bg-purple-500 p-2 rounded-full">
              <LogoutButton setUser={setUser} />
            </div>
          </>
        )}
        {user && (
          <li
            className={`${
              location.pathname === "/offline-list" ? "bg-purple-500" : ""
            } p-2 rounded-full hover:bg-purple-500`}
          >
            <Link to="/offline-list">My Offline List</Link>
          </li>
        )}
        <li
          className={`${
            location.pathname === "/popular-movies" ? "bg-purple-500" : ""
          } p-2 rounded-full hover:bg-purple-500`}
        >
          <Link to="/popular-movies">Popular Movies</Link>
        </li>
        <li
          className={`${
            location.pathname === "/upcoming-movies" ? "bg-purple-500" : ""
          } p-2 rounded-full hover:bg-purple-500`}
        >
          <Link to="/upcoming-movies">Upcoming</Link>
        </li>
        <li
          className={`${
            location.pathname === "/top-rated" ? "bg-purple-500" : ""
          } p-2 rounded-full hover:bg-purple-500`}
        >
          <Link to="/top-rated">Top Rated</Link>
        </li>
      </ul>
    </>
  );
};

export default Menu;
