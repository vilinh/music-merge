import React from "react";
import "./account.css";

export const Account = () => {
  return (
    <div className="account">
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
        <h3>My Account</h3>
        <div className="profile-pic">
          <img src="https://i.scdn.co/image/ab6775700000ee850e227e40152a057cad6fdf16" />
        </div>
        <div className="account-panel">
          <div className="account-info">
            <div className="account-field username">
              <span className="label">USERNAME</span>
              <span className="field">vilinhvu</span>
            </div>
            <div className="account-field email">
              <span className="label">EMAIL</span>
              <span className="field">vvkatt@gmail.com</span>
            </div>
            <div className="account-field birthday">
              <span className="label">BIRTHDAY</span>
              <span className="field">june 6, 2003</span>
            </div>
          </div>
        </div>
        <button className="edit">edit profile</button>

        <hr></hr>
        <h4>Password</h4>
        <button className="change-password">change password</button>
      </div>
    </div>
  );
};
