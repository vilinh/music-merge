import React, { useState } from "react";
import { useEffect } from "react";
import "./merge.css";
import axios from "axios";
import SpotifyWebApi from "spotify-web-api-node";
import { accessToken } from "../../utils/spotifyAuth";
import { TempSong } from "../../components/tempSong/TempSong";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const Merge = () => {
  const [playlistID, setPlaylistID] = useState("");
  const [playlist, setPlaylist] = useState();
  const [spotifyResults, setSpotifyResults] = useState([]);
  const [disable, setDisable] = useState(false);

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
    setDisable(true);
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
      <button disabled={disable} className={`search ${disable ? 'disabled' : ''}`} onClick={handleClick}>
        search
      </button>
      <div className="spotifyResults">
        {spotifyResults.length > 0 ? (
          spotifyResults.map((song, i) => <TempSong key={i} song={song} />)
        ) : (
          <p>Enter a link to your playlist to get started!</p>
        )}
      </div>
    </div>
  );
};
