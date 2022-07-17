import React from "react";
import { PlaylistSong } from "../playlistSong/PlaylistSong";
import "./playlist.css";
import SpotifyWebApi from "spotify-web-api-node";
import { useEffect } from "react";
import { useState } from "react";

export const Playlist = ({ accessToken }) => {
  const [playlist, setPlayList] = useState();

  const spotifyApi = new SpotifyWebApi({
    clientId: process.env.REACT_APP_CLIENT_ID,
  });

  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
  }, [accessToken]);

  useEffect(() => {
    if (!accessToken) return;
    spotifyApi
      .getMyRecentlyPlayedTracks({
        limit: 3,
      })
      .then(
        function (data) {
          // Output items
          console.log("Your 3 most recently played tracks are:");
          data.body.items.forEach((item) => console.log(item.track));
          setPlayList(data.body.items);
        },
        function (err) {
          console.log("Something went wrong!", err);
        }
      );
  }, [accessToken]);

  return (
    <div className="playlist">
      <div className="header">
        <h3>Recently Played</h3>
        <span>See All</span>
      </div>
      <div className="songs">
        {playlist && playlist.map((song, i) => <PlaylistSong key={i} idx={i} song={song.track} />)}
      </div>
    </div>
  );
};
