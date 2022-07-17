import React from "react";
import "./songCard.css";

export const SongCard = ({song}) => {
  return <div className="songCard">
    <img src={song.album.images[1].url} alt=""></img>
    <span className="title">{song.name}</span>
    <span className="artist">{song.artists[0].name}</span>
  </div>;
};
