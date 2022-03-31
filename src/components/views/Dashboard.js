import React from "react";
import { MyButton } from "../ui/MyButton";

const Dashboard = (props) => {
  const openUser = () => {
    console.log("User Opened");
  };

  return (
    <div>
      <h1>DASHBOARD!</h1>
      <MyButton width="100%" onClick={() => openUser()}>
        Click on me
      </MyButton>
    </div>
  );
};

export default Dashboard;