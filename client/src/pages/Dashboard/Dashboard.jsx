import React, { useEffect } from "react";
import { useState } from "react";
import { DashBrowse } from "../../components/dashBrowse/DashBrowse";
import { DashHome } from "../../components/dashhome/DashHome";
import { Nav } from "../../components/nav/Nav";
import "./dashboard.css";
import { accessToken } from "../../utils/spotifyAuth.js";

export const Dashboard = ({ code }) => {
  const [activeView, setActiveView] = useState("home");
  const [token, setToken] = useState(null);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    setToken(accessToken);
  }, []);

  return (
    <div className="dashboard">
      <div className="dashboard-main">
        <div className="dashboard-nav">
          <Nav activeView={activeView} setActiveView={setActiveView} />
        </div>
        <div className="dashboard-right">
          {activeView === "home" ? (
            <DashHome accessToken={accessToken} />
          ) : (
            <></>
          )}
          {activeView === "browse" ? (
            <DashBrowse accessToken={accessToken} />
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};
