import React from "react";
import { SearchResult } from "../searchResult/SearchResult";
import "./dashBrowse.css";

export const DashBrowse = ({ accessToken }) => {
  return (
    <div className="dashBrowse">
      <input type="text" placeholder="search" className="search" />
      <div className="filters">
        <button>all</button>
        <button>artists</button>
        <button>songs</button>
        <button>playlists</button>
      </div>
      <div className="header">
        <span className="num">#</span>
        <span className="title">Title</span>
        <span className="album">Album</span>
        <span className="time">Time</span>
      </div>
      <hr></hr>
      <div className="songs">
        <SearchResult />
      </div>
    </div>
  );
};
