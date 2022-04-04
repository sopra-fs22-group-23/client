import React from "react";
import "../../styles/ui/DashboardButtons.scss";

const DashboardButtons = () => {
  return (
    <div className="buttons">
      <button className="newEvent-button">
        <label className="newEvent-label">New event!</label>
      </button>
      <a href="user" className="edit">
        edit
      </a>
    </div>
  );
};

export default DashboardButtons;
