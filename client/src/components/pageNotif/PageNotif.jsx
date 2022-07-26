import React from "react";
import "./pageNotif.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-regular-svg-icons";

export const PageNotif = ({ styles }) => {
  return (
    <div className={`page-notif ` + styles}>
      <FontAwesomeIcon icon={faCircleCheck} /> Added to playlist!
    </div>
  );
};
