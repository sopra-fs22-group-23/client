import React from "react";
import Footer from "../ui/Footer";
import EventOverview from "../ui/EventOverview";
import Header from "./Header";
import "../../styles/views/Event.scss";
import pic from "../pictures/profilePic.png";

const SmallProfileOverview = (props) => {
  return (
    <div className="profile-container">
      <div className="profile-info">
        <img src={pic} className="profile-pic" />
        <p className="profile-name">Maya</p>
      </div>
      <div className="profile-description">
        My name is Maya and I’m a student at UZH. I love organizing lasagne
        parties and coding. Let’s meet!
      </div>
    </div>
  );
};

const Event = (props) => {
  return (
    <>
      <Header />
      <div className="row">
        <div className="col-7">
          <EventOverview />
        </div>
        <div className="col-4">
          <SmallProfileOverview />
          <div className="event-buttons">
            <button className="event-button-left">
              <p className="event-label">Add Invitees</p>
            </button>
            <button className="event-button">
              <p className="event-label"> Tasks</p>
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Event;
