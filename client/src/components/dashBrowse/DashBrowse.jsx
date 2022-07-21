import React, { useState } from "react";
import { useEffect } from "react";
import { SearchResult } from "../searchResult/SearchResult";
import "./dashBrowse.css";
import SpotifyWebApi from "spotify-web-api-node";
import { accessToken } from "../../utils/spotifyAuth";
import { faCog, faFilePdf } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const DashBrowse = () => {
  const [token, setToken] = useState(null);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  let spotifyApi = new SpotifyWebApi({
    accessToken: token,
  });

  useEffect(() => {
    setToken(accessToken);
    spotifyApi.setAccessToken(token);
  }, []);

  useEffect(() => {
    if (!search) return setSearchResults([]);
    spotifyApi
      .searchTracks(search)
      .then((data) => {
        setSearchResults(data.body.tracks.items);
      })
      .catch((err) => {
        return err;
      });
  }, [search]);

  return (
    <div className="dashBrowse">
      {token ? (
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
        <FontAwesomeIcon className="fa-spin" icon={faCog} />
      )}
    </div>
  );
};
