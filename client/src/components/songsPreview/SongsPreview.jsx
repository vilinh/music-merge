import React from "react";
import { SongCard } from "../songCard/SongCard";
import "./songsPreview.css";
import SpotifyWebApi from "spotify-web-api-node";
import { useEffect } from "react";
import { useState } from "react";

export const SongsPreview = ({ accessToken, playlistID }) => {
  let spotifyApi = new SpotifyWebApi({
    accessToken: accessToken,
  });

  const [playlist1, setPlaylist1] = useState();

  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
  }, [accessToken]);

  useEffect(() => {
    if (!accessToken) return;
    spotifyApi
      .getPlaylist(playlistID)
      .then((data) => {
        setPlaylist1(data.body);
      })
      .catch((err) => console.log("Something went wrong", err));
  }, [accessToken]);

  return (
    <div className="songsPreview">
      <div className="header">
        <h3>{(playlist1 && playlist1.name) || "loading"}</h3>
        <span>See All</span>
      </div>
      <div className="songs">
        {playlist1 &&
          playlist1.tracks.items
            .slice(0, 5)
            .map((item) => (
              <SongCard key={item.track.name} song={item.track} />
            ))}
      </div>
    </div>
  );
};
