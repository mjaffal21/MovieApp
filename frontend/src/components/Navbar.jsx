import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { LoginButton } from "./LoginButton";
import { LogoutButton } from "./LogoutButton";
import { EditProfileButton } from "./EditProfileButton";
import { Squash as Hamburger } from "hamburger-react";
import Menu from "./Menu";
import Aos from "aos";
import "aos/dist/aos.css";

const Navbar = ({ user, setUser }) => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    Aos.init();
  }, []);
  return (
    <>
      <div className="max-w-6xl mx-auto py-5 px-2 flex justify-between text-white">
        <div className="flex items-center">
          <div>
            <Link to="/">
              <h1
                className="text-4xl font-bold font-lob"
                data-aos="fade-down"
                data-aos-duration="2000"
                data-aos-delay="1000"
              >
                Movies Hub
              </h1>
            </Link>
          </div>
          <div
            className="ml-8 hidden lg:block"
            data-aos="fade-down"
            data-aos-duration="2000"
            data-aos-delay="1000"
          >
            <ul className="flex gap-5">
              <li
                className={`${
                  location.pathname === "/popular-movies" ? "bg-purple-500" : ""
                } p-2 rounded-full hover:bg-purple-500`}
              >
                <Link to="/popular-movies">Popular Movies</Link>
              </li>
              <li
                className={`${
                  location.pathname === "/top-rated" ? "bg-purple-500" : ""
                } p-2 rounded-full hover:bg-purple-500`}
              >
                <Link to="/top-rated">Top Rated</Link>
              </li>
              <li
                className={`${
                  location.pathname === "/upcoming-movies"
                    ? "bg-purple-500"
                    : ""
                } p-2 rounded-full hover:bg-purple-500`}
              >
                <Link to="/upcoming-movies">Upcoming</Link>
              </li>
              {user && (
                <li
                  className={`${
                    location.pathname === "/offline-list" ? "bg-purple-500" : ""
                  } p-2 rounded-full hover:bg-purple-500`}
                >
                  <Link to="/offline-list">My Offline List</Link>
                </li>
              )}
            </ul>
          </div>
        </div>
        <div
          className="flex items-center gap-3"
          data-aos="fade-down"
          data-aos-duration="2000"
          data-aos-delay="1000"
        >
          {!user && (
            <div className="hover:bg-purple-500 p-2 rounded-full hidden lg:block">
              <LoginButton setUser={setUser} />
            </div>
          )}
          {user && (
            <>
              <div className="hover:bg-purple-500 p-2 rounded-full hidden lg:block">
                <EditProfileButton setUser={setUser} />
              </div>
              <div className="hover:bg-purple-500 p-2 rounded-full hidden lg:block">
                <LogoutButton setUser={setUser} />
              </div>
            </>
          )}
        </div>
        <div className="lg:hidden absolute z-20 top-3 right-3">
          <Hamburger color="white" toggled={isOpen} toggle={setIsOpen} />
        </div>
      </div>
      <div className="border border-b max-w-6xl mx-auto"></div>
      {isOpen && <Menu user={user} setUser={setUser} location={location} />}
    </>
  );
};

export default Navbar;
