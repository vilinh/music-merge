import React, { useState } from "react";
import { useEffect } from "react";
import { SearchResult } from "../searchResult/SearchResult";
import "./dashBrowse.css";
import SpotifyWebApi from "spotify-web-api-node";

export const DashBrowse = () => {
  const [spotifyToken, setSpotifyToken] = useState(null);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const spotifyApi = new SpotifyWebApi({
    clientId: process.env.REACT_APP_CLIENT_ID,
  });

  useEffect(() => {
    let accessToken = localStorage.getItem("spotAccessToken");
    if (accessToken) {
      setSpotifyToken(accessToken);
      spotifyApi.setAccessToken(spotifyToken);
    }
  }, []);

  useEffect(() => {
    if (!search) return setSearchResults([]);
    if (spotifyToken) {
      spotifyApi
        .searchTracks(search)
        .then((data) => {
          setSearchResults(data.body.tracks.items);
        })
        .catch((err) => console.log("Something went wrong", err));
    }
  }, [search]);

  return (
    <div className="dashBrowse">
      {spotifyToken ? (
        <>
          <input
            type="text"
            placeholder="search"
            className="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <div className="filters">
            <button>all</button>
            <button>artists</button>
            <button>songs</button>
            <button>playlists</button>
          </div>
          <div className="header">
            <span className="num">#</span>
            <span className="title">Title</span>
            <span className="album">Album</span>
            <span className="time">Time</span>
          </div>
          <hr></hr>
          <div className="songs">
            {searchResults &&
              searchResults.map((track, i) => (
                <SearchResult song={track} idx={i} key={track.id} />
              ))}
          </div>
        </>
      ) : (
        <>loading...</>
      )}
    </div>
  );
};
