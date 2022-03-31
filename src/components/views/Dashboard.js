import React from "react";
import { Button } from "../ui/Button";

const Dashboard = (props) => {
  const openUser = () => {
    console.log("User Opened");
  };

  return (
    <div>
      <h1>DASHBOARD!</h1>
      <Button width="100%" onClick={() => openUser()}>
        Click on me
      </Button>
    </div>
  );
};

export default Dashboard;