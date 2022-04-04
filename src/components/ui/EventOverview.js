import React from "react";
import "../../styles/ui/EventOverview.scss";
import pic from "../pictures/profilePic.png";

const EventOverview = () => {
  return (
    <div className="event">
      <div className="event-title">Pizza night</div>
      <div className="event-description">
        Let’s just cook some pizza together, it’s gonna be fun!
      </div>
      <div className="event-organizer">
        <img classname="event-picture" src={pic} />
        <div classname="event-name"> Maya </div>
        <div classname="event-time"> created 30 seconds ago </div>
      </div>
      <div className="event-information">
        <div className="event-information-title"> This event includes </div>

        <div className="event-information-element">
          👍🏻 Collaborators: Luka, Vinz, Leo
        </div>
        <div className="event-information-element">
          🖥 Binzmühlestrasse 14, Zürich
        </div>
        <div className="event-information-element">🎥 3 friends invited </div>
        <div className="event-information-element">⌛️ 30 Mar 2022, 20:15 </div>
      </div>
    </div>
  );
};

export default EventOverview;
