import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import PopularMovies from "./pages/PopularMovies";
import TopRatedMovies from "./pages/TopRatedMovies";
import UpcomingMovies from "./pages/UpcomingMovies";
import MoviePage from "./pages/MoviePage";
import Footer from "./components/Footer";
import { MsalProvider, AuthenticatedTemplate } from "@azure/msal-react";
import { msalInstance } from "./config/msalConfig";
import OfflinePage from "./pages/OfflinePage";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [user, setUser] = useState({});
  return (
    <>
      <MsalProvider instance={msalInstance}>
        <Router>
          <Navbar user={user} setUser={setUser} />
          <Routes>
            <Route exact path="/" element={<HomePage />} />
            <Route exact path="/popular-movies" element={<PopularMovies />} />
            <Route exact path="/top-rated" element={<TopRatedMovies />} />
            <Route exact path="/upcoming-movies" element={<UpcomingMovies />} />
            <Route
              exact
              path="/movies/:id"
              element={<MoviePage user={user} />}
            />

            <Route
              exact
              path="/offline-list"
              element={
                <AuthenticatedTemplate>
                  <OfflinePage user={user} />
                </AuthenticatedTemplate>
              }
            />
          </Routes>
          <Footer />
        </Router>
      </MsalProvider>
      <ToastContainer />
    </>
  );
}

export default App;
