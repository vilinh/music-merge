import React from "react";
import { Playlist } from "../playlist/Playlist";
import { SongsPreview } from "../songsPreview/SongsPreview";
import "./dashHome.css";
import { accessToken } from "../../utils/spotifyAuth";
import { useState, useEffect } from "react";

export const DashHome = () => {
  const [token, setToken] = useState(null);
  useEffect(() => {
    setToken(accessToken);
  }, []);

  return (
    <div className="dashHome">
      <div className="tabs">
        <span className="selectedTab">Music</span>
        <span>Podcast</span>
        <span>Live</span>
        <span>Radio</span>
      </div>
      <div className="body">
        <div className="left-panel">
          <SongsPreview
            className="songsPreview"
            accessToken={token}
            playlistID={"37i9dQZEVXbMDoHDwVN2tF"}
          ></SongsPreview>
          <SongsPreview
            className="songsPreview"
            accessToken={token}
            playlistID={"37i9dQZF1DWWvmOXYvR5a6"}
          ></SongsPreview>
          <Playlist accessToken={token} />
        </div>
        <div className="right-panel">placeholder </div>
      </div>
    </div>
  );
};
