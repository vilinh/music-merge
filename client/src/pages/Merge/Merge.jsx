import React, { useState } from "react";
import { useEffect } from "react";
import "./merge.css";
import axios from "axios";
import SpotifyWebApi from "spotify-web-api-node";
import { accessToken } from "../../utils/spotifyAuth";
import { TempSong } from "../../components/tempSong/TempSong";

export const Merge = () => {
  const [playlistID, setPlaylistID] = useState("");
  const [playlist, setPlaylist] = useState();
  const [spotifyResults, setSpotifyResults] = useState([]);

  let spotifyApi = new SpotifyWebApi({
    accessToken: accessToken,
  });

  useEffect(() => {
    searchSpotify();
  }, [playlist]);

  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
  }, [accessToken]);

  const handleClick = () => {
    if (!playlistID) return;
    let parsedID = playlistID.split("/").at(-1);
    console.log(parsedID);
    const fetchPlaylist = async () => {
      await axios
        .get(`/deezer/search/${parsedID}`)
        .then((res) => {
          console.log(res.data.data);
          setPlaylist(res.data.data);
        })
        .catch((err) => console.log(err));
    };
    fetchPlaylist();
  };

  const searchSpotify = () => {
    if (!playlist || !accessToken) return;
    {
      playlist.map((track) => {
        spotifyApi
          .searchTracks(track.title)
          .then((data) => {
            setSpotifyResults((spotifyResults) => [
              ...spotifyResults,
              data.body.tracks.items[0],
            ]);
          })
          .catch((err) => {
            return err;
          });
      });
    }
  };

  return (
    <div className="merge">
      <h3>Merge</h3>
      <input
        type="text"
        value={playlistID}
        onChange={(e) => {
          setPlaylistID(e.target.value);
        }}
        placeholder="Deezer Playlist Link"
      />
      <button className="search" onClick={handleClick}>search</button>
      <div className="spotifyResults">
        {spotifyResults.length > 0 ? (
          spotifyResults.map((song, i) => <TempSong key={i} song={song} />)
        ) : (
          <p></p>
        )}
      </div>
    </div>
  );
};
