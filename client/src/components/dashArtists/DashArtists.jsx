import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import SpotifyWebApi from "spotify-web-api-node";
import { accessToken } from "../../utils/spotifyAuth";
import { ArtistCard } from "../artistCard/ArtistCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
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
    spotifyApi.getFollowedArtists({ limit: 10 }).then(
      function (data) {
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
        {artists ? (
          artists.map((artist) => (
            <ArtistCard key={artist.id} artist={artist} />
          ))
        ) : (
          <div className="load">
            <FontAwesomeIcon className="loader fa-spin" icon={faSpinner} />
          </div>
        )}
      </div>
    </div>
  );
};
