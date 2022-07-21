import React from "react";
import "./tempSong.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

export const TempSong = ({ song }) => {
  return (
    <div className="tempSong">
      <div className="tempSong-r">
        <img src={song.album.images[1].url} />
        <div className="info">
          <p>{song.name}</p>
          <span className="artist">{song.artists[0].name}</span>
        </div>
      </div>
      <div className="tempSong-l">
        <FontAwesomeIcon className="delete" icon={faXmark} />
      </div>
    </div>
  );
};
