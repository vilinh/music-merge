import React from "react";
import "./playlistSong.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlay, faCirclePlus } from "@fortawesome/free-solid-svg-icons";

export const PlaylistSong = ({song, idx}) => {
  return (
    <div className="playlistSong">
      {console.log(song)}
      <div className="left">
        <span id="num">{idx+1}</span>
        <img src={song.album.images[2].url} />
        <div className="info">
          <span className="title">{song.name}</span>
          <span className="artist">{song.artists[0].name}</span>
        </div>
      </div>
      <div className="right">
        <span id="time">3:00</span>
        <FontAwesomeIcon id="play" icon={faCirclePlay} />
        <FontAwesomeIcon id="add" icon={faCirclePlus} />
      </div>
    </div>
  );
};
