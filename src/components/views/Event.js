import React from "react";
import Footer from "../ui/Footer";
import EventOverview from "../ui/EventOverview";
import Header from "./Header";
import SmallProfileOverview from "../ui/SmallProfileOverview";
import "../../styles/views/Event.scss";

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
              <label className="event-label">Edit</label>
            </button>
            <button className="event-button">
              <label className="event-label"> Tasks</label>
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Event;
