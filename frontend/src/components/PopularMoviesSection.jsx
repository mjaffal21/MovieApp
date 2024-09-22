import React, { useEffect } from "react";
import MovieCard from "./MovieCard";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";
import Aos from "aos";
import "aos/dist/aos.css";

const PopularMoviesSection = ({ popMovies }) => {
  useEffect(() => {
    Aos.init();
  }, []);
  let settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="max-w-6xl mx-auto">
      <h1
        className="text-white text-2xl font-bold mb-4 font-lob"
        data-aos="fade-up"
        data-aos-duration="2000"
        data-aos-delay="1000"
      >
        Trending Now!
      </h1>
      <div
        className="px-7"
        data-aos="fade-right"
        data-aos-duration="2000"
        data-aos-delay="1000"
      >
        <Slider {...settings}>
          {popMovies.slice(0, 5).map((movie, index) => (
            <div key={index} className="p-2">
              <MovieCard movie={movie} />
            </div>
          ))}
        </Slider>
      </div>
      <div
        className="text-white flex justify-end mt-4 px-5"
        data-aos="fade-up"
        data-aos-duration="2000"
        data-aos-delay="1000"
      >
        <Link
          to="/popular-movies"
          className=" bg-purple-500 rounded-full px-5 py-2"
        >
          See more
        </Link>
      </div>
    </div>
  );
};

export default PopularMoviesSection;
