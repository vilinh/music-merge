import React, { useState } from "react";
import { useEffect } from "react";
import "./merge.css";
import axios from "axios";

export const Merge = () => {
  const [playlistID, setPlaylistID] = useState("");

  useEffect(() => {
    console.log(playlistID);
    let parsedID = playlistID.split("/").at(-1);
    console.log(parsedID);
    const fetchPlaylist = async () => {
      await axios
        .get(`/deezer/search/${parsedID}`)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => console.log(err));
    };
    if (parsedID) {
      fetchPlaylist();
    }
  }, [playlistID]);

  const handleClick = () => {
    if (!playlistID) return;
    let parsedID = playlistID.split("/").at(-1);
    console.log(parsedID);
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
    </div>
  );
};
