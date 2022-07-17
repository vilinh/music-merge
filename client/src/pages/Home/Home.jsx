import React from "react";
import { useContext } from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { Dashboard } from "../Dashboard/Dashboard";
import "./home.css";

export const Home = () => {
  const [code, setCode] = useState("");
  const { user } = useContext(AuthContext);
  console.log(user);

  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    const hash = new URLSearchParams(window.location.search).get("code");
    setCode(hash);
  }, []);

  return (
    <div className="home">
      <div className="home-container">
        {code ? (
          <Dashboard code={code} />
        ) : (
          <div className="spotify-login">
            <a
              href={`https://accounts.spotify.com/authorize?client_id=1d6e8182725944e5af98a370d86af91c&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state%20user-read-recently-played`}
            >
              <button>Login with Spotify</button>
            </a>
          </div>
        )}
      </div>
    </div>
  );
};
