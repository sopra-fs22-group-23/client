import React from "react";
import "../../styles/ui/SmallProfileOverview.scss";
import pic from "../pictures/profilePic.png";

const SmallProfileOverview = (props) => {
  return (
    <div className="container-profile">
      <div className="name-pic">
        <img src={pic} className="profilePic" />
        <p className="user-name">Maya</p>
      </div>
      <div className="description">
        My name is Maya and I’m a student at UZH. I love organizing lasagne
        parties and coding. Let’s meet!
      </div>
    </div>
  );
};

export default SmallProfileOverview;
