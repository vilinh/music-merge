import React from "react";
import { useState } from "react";
import { DashBrowse } from "../../components/dashBrowse/DashBrowse";
import { DashHome } from "../../components/dashhome/DashHome";
import { Nav } from "../../components/nav/Nav";
import { useAuth } from "../../hooks/useAuth";
import "./dashboard.css";

export const Dashboard = ({ code }) => {
  const accessToken = useAuth(code);
  const [activeView, setActiveView] = useState("home");

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
