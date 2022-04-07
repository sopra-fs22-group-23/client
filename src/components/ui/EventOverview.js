import React from "react";
import "../../styles/ui/EventOverview.scss";
import pic from "../pictures/profilePic.png";

const EventOverview = (props) => {
  return (
    <div className="event">
      <div className="event-title">Pizza night</div>
      <div className="event-description">
        Let’s just cook some pizza together, it’s gonna be fun!
      </div>
      <div className="event-organizer">
        <img src={pic} className="small-profile-pic" />
        <div className="organizer-name"> Maya </div>
        <div className="creation-time"> created 30 seconds ago </div>
      </div>
      <div className="event-information">
        <div className="event-information-title"> This event includes </div>
        <div class="row">
          <div className="col event-information-element">
            👍🏻 Collaborators: Luka, Vinz, Leo
          </div>
          <div className="col event-information-element">
            🖥 Binzmühlestrasse 14, Zürich
          </div>
          <div class="w-100"></div>
          <div className="col event-information-element">
            🎥 3 friends invited{" "}
          </div>
          <div className="col event-information-element">
            ⌛️ 30 Mar 2022, 20:15
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventOverview;
