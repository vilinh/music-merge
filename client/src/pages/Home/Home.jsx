import React from "react";
import { useContext } from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { Dashboard } from "../Dashboard/Dashboard";
import { accessToken } from "../../utils/spotifyAuth";
import "./home.css";

export const Home = () => {
  const [code, setCode] = useState("");
  const [token, setToken] = useState(null);
  const { user } = useContext(AuthContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
    setToken(accessToken);
  }, []);

  useEffect(() => {
    const hash = new URLSearchParams(window.location.search).get("code");
    setCode(hash);
  }, []);

  return (
    <div className="home">
      <div className="home-container">
        {accessToken ? (
          <Dashboard/>
        ) : (
          <div className="spotify-login">
            <a href="http://localhost:3001/spotify/loginS">
              <button>Login with Spotify</button>
            </a>
          </div>
        )}
      </div>
    </div>
  );
};
