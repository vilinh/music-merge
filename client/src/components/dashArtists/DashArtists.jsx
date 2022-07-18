import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import SpotifyWebApi from "spotify-web-api-node";
import { accessToken } from "../../utils/spotifyAuth";
import { ArtistCard } from "../artistCard/ArtistCard";
import "./dashArtists.css";

export const DashArtists = () => {
  const [token, setToken] = useState(null);
  const [artists, setArtists] = useState(null);

  let spotifyApi = new SpotifyWebApi({
    accessToken: token,
  });

  useEffect(() => {
    setToken(accessToken);
    spotifyApi.setAccessToken(token);
  }, []);

  useEffect(() => {
    if (!token) return;
    console.log(token);
    spotifyApi.getFollowedArtists({ limit: 10 }).then(
      function (data) {
        console.log(data.body);
        setArtists(data.body.artists.items);
      },
      function (err) {
        console.log("Something went wrong!", err);
      }
    );
  }, [token]);

  return (
    <div className="dashArtists">
      <h3>Artists</h3>
      <div className="artists">
        {artists &&
          artists.map((artist) => (
            <div>
              <ArtistCard artist={artist}/>
            </div>
          ))}
      </div>
    </div>
  );
};
