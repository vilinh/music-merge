import React, { useState } from "react";
import { useEffect } from "react";
import "./merge.css";
import axios from "axios";
import SpotifyWebApi from "spotify-web-api-node";
import { accessToken } from "../../utils/spotifyAuth";
import { TempSong } from "../../components/tempSong/TempSong";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpotify } from "@fortawesome/free-brands-svg-icons";

export const Merge = () => {
  const [playlistID, setPlaylistID] = useState("");
  const [playlist, setPlaylist] = useState();
  const [spotifyResults, setSpotifyResults] = useState([]);
  const [disable, setDisable] = useState(false);
  const [remove, setRemove] = useState(false);
  const [removeID, setRemoveID] = useState(null);

  let spotifyApi = new SpotifyWebApi({
    accessToken: accessToken,
  });

  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
  }, [accessToken]);

  useEffect(() => {
    searchSpotify();
  }, [playlist]);

  useEffect(() => {
    if (remove) {
      console.log("remove clicked");
      console.log(removeID);
      setSpotifyResults(spotifyResults.filter(song => song.id != removeID));
      setRemove(false);
    }
  }, [remove]);

  const handleSearch = () => {
    if (!playlistID) return;
    let parsedID = playlistID.split("/").at(-1);
    console.log(parsedID);
    fetchPlaylist(parsedID);
    setDisable(true);
  };

  const fetchPlaylist = async (parsedID) => {
    await axios
      .get(`/deezer/search/${parsedID}`)
      .then((res) => {
        console.log(res.data.data);
        setPlaylist(res.data.data);
      })
      .catch((err) => console.log(err));
    return true;
  };

  const searchSpotify = () => {
    if (!playlist || !accessToken) return;
    playlist.map((track) => {
      spotifyApi
        .searchTracks(track.title)
        .then((data) => {
          console.log(data.body.tracks.items[0]);
          setSpotifyResults((spotifyResults) => [
            ...spotifyResults,
            data.body.tracks.items[0],
          ]);
        })
        .catch((err) => {
          return err;
        });
    });
  };

  const addToSpotify = () => {
    let trackIDs = spotifyResults.map((song) => `spotify:track:${song.id}`);
    console.log(trackIDs);
    spotifyApi.addTracksToPlaylist("0huZCKNXSGyvGffx6PVPfI", trackIDs).then(
      function (data) {
        console.log("Added tracks to playlist!");
      },
      function (err) {
        console.log("Something went wrong!", err);
      }
    );
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
      <button
        disabled={disable}
        className={`search ${disable ? "disabled" : ""}`}
        onClick={handleSearch}
      >
        search
      </button>
      <div className="spotifyResults">
        {spotifyResults.length > 0 ? (
          spotifyResults.map((song, i) => (
            <TempSong key={i} song={song} setRemove={setRemove} setRemoveID={setRemoveID}/>
          ))
        ) : (
          <p>Enter a link to your playlist to get started!</p>
        )}
      </div>
      <div className="add"></div>
      {spotifyResults.length > 0 ? (
        <button className="addToSpotify" onClick={addToSpotify}>
          add to <FontAwesomeIcon icon={faSpotify} />
        </button>
      ) : (
        <></>
      )}
    </div>
  );
};
