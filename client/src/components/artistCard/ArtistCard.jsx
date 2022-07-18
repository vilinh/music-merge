import React from "react";
import "./artistCard.css";
export const ArtistCard = ({ artist }) => {
  return (
    <div className="artistCard">
      {artist.images.length != 0 && <img src={artist.images[0].url} />}
      <span>{artist.name}</span>
    </div>
  );
};
