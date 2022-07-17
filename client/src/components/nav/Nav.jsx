import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket, faCirclePlay, faCirclePlus, faClock, faCodeMerge, faCompactDisc, faGear, faHeart, faHouse, faMagnifyingGlass, faUser, faUsers } from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';
import "./nav.css";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export const Nav = () => {

  const { loading, error, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post(
        "http://localhost:3001/api/auth/logout",
      );
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
        <div className="link selectedLink"><FontAwesomeIcon icon={faHouse} /> Home</div>
        <div className="link"><FontAwesomeIcon icon={faMagnifyingGlass} /> Browse</div>
        <div className="link"><FontAwesomeIcon icon={faCodeMerge} /> Merge</div>
        <div className="link"><FontAwesomeIcon icon={faUsers} /> Artists</div>

        <span className="subheading">Library</span>
        <div className="link"><FontAwesomeIcon icon={faClock} /> Recent</div>
        <div className="link"><FontAwesomeIcon icon={faHeart} /> Favourites</div>

        <span className="subheading">Playlists</span>

        <div className="link"><FontAwesomeIcon icon={faCirclePlus} /> Create New</div>
        <div className="link"><FontAwesomeIcon icon={faCompactDisc} /> Chill Beats</div>
        <div className="link"><FontAwesomeIcon icon={faCompactDisc} /> Mood swings</div>

        <span className="subheading">General</span>
        <div className="link"><FontAwesomeIcon icon={faUser} /> Account</div>
        <div className="link"><FontAwesomeIcon icon={faGear} /> Settings</div>
        <div className="link" onClick={handleLogout}><FontAwesomeIcon icon={faArrowRightFromBracket} /> Log Out</div>

      </div>
    </div>
  );
};
