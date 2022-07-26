import React, { useState } from "react";
import { useEffect } from "react";
import "./merge.css";
import axios from "axios";
import SpotifyWebApi from "spotify-web-api-node";
import { accessToken } from "../../utils/spotifyAuth";
import { TempSong } from "../../components/tempSong/TempSong";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpotify } from "@fortawesome/free-brands-svg-icons";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { PageNotif } from "../../components/pageNotif/PageNotif";

export const Merge = () => {
  const [user, setUser] = useState("");
  const [playlistID, setPlaylistID] = useState("");
  const [spotifyPlaylistID, setSpotifyPlaylistID] = useState("");
  const [playlist, setPlaylist] = useState();
  const [spotifyResults, setSpotifyResults] = useState([]);
  const [spotifyPlaylists, setSpotifyPlaylists] = useState([]);
  const [disable, setDisable] = useState(true);
  const [remove, setRemove] = useState(false);
  const [removeID, setRemoveID] = useState(null);
  const [spotifyPlaylist, setSpotifyPlaylist] = useState("");
  const [added, setAdded] = useState(false);
  const [addNotif, setAddNotif] = useState(false);

  // find some way to get user without using state,, save to localstorage?

  let spotifyApi = new SpotifyWebApi({
    accessToken: accessToken,
  });

  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
  }, [accessToken]);

  useEffect(() => {
    getSpotifyPlaylists();
  }, [user]);

  useEffect(() => {
    if (!accessToken) return;
    spotifyApi
      .getMe()
      .then((data) => {
        console.log(data.body);
        setUser(data.body);
      })
      .catch((err) => console.log(err));
  }, [accessToken]);

  useEffect(() => {
    searchSpotify();
  }, [playlist]);

  useEffect(() => {
    if (remove) {
      console.log("remove clicked");
      console.log(removeID);
      setSpotifyResults(spotifyResults.filter((song) => song.id != removeID));
      setRemove(false);
    }
  }, [remove]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAddNotif(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, [addNotif]);

  useEffect(() => {
    if (!playlistID || !spotifyPlaylistID) {
      setDisable(true);
    } else {
      setDisable(false);
    }
  }, [playlistID, spotifyPlaylistID]);

  const handleSearch = () => {
    if (!playlistID) return;
    let parsedID = playlistID.split("/").at(-1);
    fetchPlaylist(parsedID);
    setPlaylistID("");
  };

  const fetchPlaylist = async (parsedID) => {
    await axios
      .get(`/deezer/search/${parsedID}`)
      .then((res) => {
        setPlaylist(res.data.data);
      })
      .catch((err) => console.log(err));
    return true;
  };

  const handleSelect = (event: SelectChangeEvent) => {
    setSpotifyPlaylistID(event.target.value);
  };

  const getSpotifyPlaylists = () => {
    spotifyApi
      .getUserPlaylists(user.id)
      .then((data) => {
        setSpotifyPlaylists(
          data.body.items.filter((playlist) => playlist.owner.id === user.id)
        );
      })
      .catch((err) => console.log(err));
  };

  const searchSpotify = () => {
    if (!playlist || !accessToken) return;
    playlist.map((track) => {
      spotifyApi
        .searchTracks(track.title)
        .then((data) => {
          console.log("need to check if actually song or not");
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
    spotifyApi
      .addTracksToPlaylist(spotifyPlaylistID, trackIDs)
      .then((data) => {
        console.log("Added tracks to playlist!");
        setAdded(true);
        setAddNotif(true);
      })
      .then(() => setSpotifyResults([]))
      .catch((err) => console.log("Something went wrong!", err));
  };

  return (
    <div className="merge">
      <h3>Merge</h3>
      <div className="merge-info">
        <input
          type="text"
          value={playlistID}
          onChange={(e) => {
            setPlaylistID(e.target.value);
          }}
          placeholder="Deezer Playlist Link"
        />
        {spotifyPlaylists && (
          <FormControl sx={{ m: 1, minWidth: 200 }} size="small">
            <InputLabel id="demo-select-small">Spotify Playlist</InputLabel>
            <Select
              labelId="demo-select-small"
              id="demo-select-small"
              value={spotifyPlaylistID}
              label="Spotify Playlist"
              onChange={handleSelect}
            >
              {spotifyPlaylists.map((playlist) => (
                <MenuItem id={playlist.id} value={playlist.id}>
                  {playlist.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
        <button
          disabled={disable}
          className={`search ${disable ? "disabled" : ""}`}
          onClick={handleSearch}
        >
          search
        </button>
      </div>

      <div className="spotifyResults">
        {spotifyResults.length > 0 ? (
          spotifyResults.map((song, i) => (
            <TempSong
              key={i}
              song={song}
              setRemove={setRemove}
              setRemoveID={setRemoveID}
            />
          ))
        ) : (
          <p>Enter a link to a deezer playlist to get started!</p>
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
      <PageNotif styles={addNotif ? "fadeIn" : "fadeOut"} />
    </div>
  );
};
