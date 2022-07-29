import React from "react";
import "./editProfile.css";

export const EditProfile = () => {
  return (
    <div className="edit-profile">
      <h3>Edit Profile</h3>
      <div className="pic">
        <img src="https://i.scdn.co/image/ab6775700000ee850e227e40152a057cad6fdf16" />
      </div>
      <div className="form">
        <form action="" className="edit">
          <h4>email</h4>
          <input type="email" />
          <h4>birthday</h4>
          <input type="date" />
        </form>
      </div>
    </div>
  );
};
