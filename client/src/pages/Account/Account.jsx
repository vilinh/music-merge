import React from "react";
import { MyAccount } from "../../components/accMyAccount/MyAccount";
import "./account.css";

export const Account = () => {
  return (
    <div className="account-page">
      <div className="account-sidebar">
        <span className="subheading">USER SETTINGS</span>
        <span className="link active">my account</span>
        <span className="link">profile</span>
        <span className="link">change password</span>
        <span className="link">connections</span>
        <span className="subheading">APP SETTINGS</span>
        <span className="link">appearance</span>
      </div>
      <div className="account-main">
        <MyAccount />
      </div>
    </div>
  );
};
