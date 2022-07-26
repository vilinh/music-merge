import React, { useContext, useEffect } from "react";
import "./searchResult.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { MergeContext } from "../../context/MergeContext";

export const SearchResult = ({
  song,
  idx,
  spotifyResults,
  setSpotifyResults,
}) => {
  const [hoverSearchResult, setHoverSearchResult] = useState(false);
  const [added, setAdded] = useState(false);

  const { addSongtoMerge, removeSongFromMerge, mergeList } =
    useContext(MergeContext);
  const handleMouseOver = () => {
    setHoverSearchResult(true);
  };
  const handleMouseOut = () => {
    setHoverSearchResult(false);
  };

  const padTo2Digits = (num) => {
    return num.toString().padStart(2, "0");
  };

  const convertMsToTime = (milliseconds) => {
    let seconds = Math.floor(milliseconds / 1000);
    let minutes = Math.floor(seconds / 60);
    seconds = seconds % 60;
    minutes = minutes % 60;
    return `${minutes}:${padTo2Digits(seconds)}`;
  };

  useState(() => {
    mergeList.map((element) => element.id).includes(song.id) && setAdded(true);
  }, []);

  return (
    <div
      className="searchResult"
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
    >
      <span className="num">{idx + 1}</span>
      <div className="song">
        <img src={song.album.images[1].url} />
        <div className="song-info">
          <span className="title">{song.name}</span>
          <span className="artist">{song.artists[0].name}</span>
        </div>
      </div>
      <span className="album">{song.album.name}</span>
      <div className="time">
        <span>{convertMsToTime(song.duration_ms)}</span>
        <FontAwesomeIcon
          className={`options ${added ? "added" : ""}`}
          icon={added ? faCheck : faCirclePlus}
          onClick={() => {
            added ? removeSongFromMerge(song.id) : addSongtoMerge(song);
            setAdded(!added);
          }}
        />
      </div>
    </div>
  );
};
// mergeList.forEach(element => {
//   console.log(element.id)
// });
