import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightFromBracket,
  faCirclePlay,
  faCirclePlus,
  faClock,
  faCodeMerge,
  faCompactDisc,
  faGear,
  faHeart,
  faHouse,
  faMagnifyingGlass,
  faUser,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import "./nav.css";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export const Nav = ({ activeView, setActiveView }) => {
  const { loading, error, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("http://localhost:3001/api/auth/logout");
      dispatch({ type: "LOGOUT", payload: res.data.details });
      navigate("/login");
    } catch (e) {
      dispatch({ type: "LOGIN_FAIL", payload: e.response });
    }
  };

  return (
    <div className="nav">
      <div className="nav-list">
        <h3>
          <FontAwesomeIcon icon={faCirclePlay} /> Music Merge
        </h3>
        <span className="subheading">Menu</span>
        <div
          id="home"
          onClick={(e) => setActiveView("home")}
          className={`link ${activeView === "home" ? "selectedLink" : ""}`}
        >
          <FontAwesomeIcon icon={faHouse} /> Home
        </div>
        <div
          id="browse"
          onClick={(e) => setActiveView(e.currentTarget.id)}
          className={`link ${activeView === "browse" ? "selectedLink" : ""}`}
        >
          <FontAwesomeIcon icon={faMagnifyingGlass} /> Browse
        </div>
        <div
          id="merge"
          onClick={(e) => setActiveView("merge")}
          className={`link ${activeView === "merge" ? "selectedLink" : ""}`}
        >
          <FontAwesomeIcon icon={faCodeMerge} />
          Merge
        </div>
        <div
          id="artists"
          onClick={(e) => setActiveView("artists")}
          className={`link ${activeView === "artists" ? "selectedLink" : ""}`}
        >
          <FontAwesomeIcon icon={faUsers} /> Artists
        </div>

        <span className="subheading">Library</span>
        <div
          id="recent"
          onClick={(e) => setActiveView("recent")}
          className={`link ${activeView === "recent" ? "selectedLink" : ""}`}
        >
          <FontAwesomeIcon icon={faClock} /> Recent
        </div>
        <div
          id="favorites"
          onClick={(e) => setActiveView("favorites")}
          className={`link ${activeView === "favorites" ? "selectedLink" : ""}`}
        >
          <FontAwesomeIcon icon={faHeart} /> Favorites
        </div>

        <span className="subheading">Playlists</span>

        <div
          id="create"
          onClick={(e) => setActiveView("create")}
          className={`link ${activeView === "create" ? "selectedLink" : ""}`}
        >
          <FontAwesomeIcon icon={faCirclePlus} /> Create New
        </div>
        <div
          id="pl1"
          onClick={(e) => setActiveView("pl1")}
          className={`link ${activeView === "pl1" ? "selectedLink" : ""}`}
        >
          <FontAwesomeIcon icon={faCompactDisc} /> Chill Beats
        </div>
        <div
          id="pl2"
          onClick={(e) => setActiveView("pl2")}
          className={`link ${activeView === "pl2" ? "selectedLink" : ""}`}
        >
          <FontAwesomeIcon icon={faCompactDisc} /> Mood swings
        </div>

        <span className="subheading">General</span>
        <div
          id="acct"
          onClick={(e) => setActiveView("acct")}
          className={`link ${activeView === "acct" ? "selectedLink" : ""}`}
        >
          <FontAwesomeIcon icon={faUser} /> Account
        </div>
        <div
          id="settings"
          onClick={(e) => setActiveView("settings")}
          className={`link ${activeView === "settings" ? "selectedLink" : ""}`}
        >
          <FontAwesomeIcon icon={faGear} /> Settings
        </div>
        <div className="link" onClick={handleLogout}>
          <FontAwesomeIcon icon={faArrowRightFromBracket} /> Log Out
        </div>
      </div>
    </div>
  );
};
