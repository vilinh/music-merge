import React, { useState } from "react";
import { useEffect } from "react";
import { SearchResult } from "../searchResult/SearchResult";
import "./dashBrowse.css";
import SpotifyWebApi from "spotify-web-api-node";

export const DashBrowse = ({ accessToken }) => {
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const spotifyApi = new SpotifyWebApi({
    clientId: process.env.REACT_APP_CLIENT_ID,
  });

  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
  }, [accessToken]);

  useEffect(() => {
    if (!accessToken) return;
    if (!search) return setSearchResults([]);
    spotifyApi.searchTracks(search).then(
      function (data) {
        setSearchResults(data.body.tracks.items);
        console.log(data.body.tracks.items);
      },
      function (err) {
        console.error(err);
      }
    );
  }, [search]);

  return (
    <div className="dashBrowse">
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
    </div>
  );
};
