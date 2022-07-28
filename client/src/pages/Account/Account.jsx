import React from "react";
import "./account.css";

export const Account = () => {
  return (
    <div className="account">
      <div className="account-sidebar">
        <span>USER SETTINGS</span>
        <span>my account</span>
        <span>profile</span>
        <span>change password</span>
        <span>connections</span>
        <span>APP SETTINGS</span>
        <span>appearance</span>
      </div>
      <div className="account-main">
        <h3>My Account</h3>
        <div className="account-panel">
          <span>USERNAME</span>
          <span>vilinhvu</span>
          <span>EMAIL</span>
          <span>vvkatt@gmail.com</span>
        </div>
        <button className="edit">edit profile</button>
        <hr></hr>
        <h4>Password</h4>
        <button className="change-password">change password</button>
      </div>
    </div>
  );
};
