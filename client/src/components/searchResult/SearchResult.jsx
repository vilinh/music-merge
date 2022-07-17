import React from "react";
import "./searchResult.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlay, faCirclePlus } from "@fortawesome/free-solid-svg-icons";

export const SearchResult = () => {
  return (
    <div className="searchResult">
      <span className="num">1</span>
      <img src="https://via.placeholder.com/40" />
      <span className="title">Title</span>
      <span className="album">Album</span>
      <span className="time">Time</span>
    </div>
  );
};
