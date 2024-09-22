import React, { useEffect } from "react";
import Aos from "aos";
import "aos/dist/aos.css";

const MovieVideo = ({ movieVideo }) => {
  useEffect(() => {
    Aos.init();
  }, []);
  const mvideo = movieVideo?.find(
    (video) => video?.type === "Trailer" && video?.site === "YouTube"
  );

  const videoKey = mvideo ? mvideo?.key : null;

  return (
    <div className="flex justify-center" data-aos="fade-right">
      {videoKey ? (
        <iframe
          width="1440"
          height="450"
          src={`https://www.youtube.com/embed/${videoKey}`}
          title="Movie Trailer"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          style={{ borderRadius: "10px" }}
        ></iframe>
      ) : (
        <p>No trailer available</p>
      )}
    </div>
  );
};

export default MovieVideo;
