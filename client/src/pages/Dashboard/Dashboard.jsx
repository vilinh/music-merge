import React from "react";
import { DashBrowse } from "../../components/dashBrowse/DashBrowse";
import { DashHome } from "../../components/dashhome/DashHome";
import { Nav } from "../../components/nav/Nav";
import { useAuth } from "../../hooks/useAuth";
import "./dashboard.css";

export const Dashboard = ({ code }) => {
  const accessToken = useAuth(code);
  return (
    <div className="dashboard">
      <div className="dashboard-main">
        <div className="dashboard-nav">
          <Nav />
        </div>
        <div className="dashboard-right">
          <DashHome accessToken={accessToken}/>
        </div>
      </div>
    </div>
  );
};
