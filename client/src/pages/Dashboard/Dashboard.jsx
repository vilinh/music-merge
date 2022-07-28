import React, { useEffect } from "react";
import { useState } from "react";
import { DashBrowse } from "../../components/dashBrowse/DashBrowse";
import { DashHome } from "../../components/dashhome/DashHome";
import { Nav } from "../../components/nav/Nav";
import "./dashboard.css";
import { accessToken } from "../../utils/spotifyAuth.js";
import { DashArtists } from "../../components/dashArtists/DashArtists";
import { Merge } from "../Merge/Merge";
import { MergeProvider } from "../../context/MergeContext";
import { Account } from "../Account/Account";

export const Dashboard = () => {
  const [activeView, setActiveView] = useState("home");
  const [token, setToken] = useState(null);
  const [spotifyResults, setSpotifyResults] = useState([]);

  useEffect(() => {
    setToken(accessToken);
    let navView = localStorage.getItem("navView" || "home");
    setActiveView(navView);
  }, []);

  useEffect(() => {
    localStorage.setItem("navView", activeView);
  }, [activeView]);

  return (
    <MergeProvider>
      <div className="dashboard">
        <div className="dashboard-main">
          <div className="dashboard-nav">
            <Nav activeView={activeView} setActiveView={setActiveView} />
          </div>
          <div className="dashboard-right">
            {activeView === "home" ? (
              <DashHome accessToken={accessToken} />
            ) : (
              <></>
            )}
            {activeView === "browse" ? (
              <DashBrowse
                accessToken={accessToken}
                spotifyResults={spotifyResults}
                setSpotifyResults={setSpotifyResults}
              />
            ) : (
              <></>
            )}
            {activeView === "artists" ? <DashArtists /> : <></>}
            {activeView === "merge" ? (
              <Merge
                spotifyResults={spotifyResults}
                setSpotifyResults={setSpotifyResults}
              />
            ) : (
              <></>
            )}
            {activeView === "account" ? <Account /> : <></>}
          </div>
        </div>
      </div>
    </MergeProvider>
  );
};
