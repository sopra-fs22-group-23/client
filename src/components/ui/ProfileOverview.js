import "../../styles/ui/ProfileOverview.scss";
import React from "react";
import pic from "../pictures/profilePic.png";

const ProfileOverview = () => {
  return (
    <div className="profile">
      <p className="hello">Hi Maya!</p>
      <div className="pic-description">
        <img src={pic} className="profilePic" />
        <p className="description">
          Heyo! My name is Maya and I’m a student at UZH. I love organizing
          lasagne parties and coding. Let’s meet!
        </p>
      </div>
    </div>
  );
};

export default ProfileOverview;
