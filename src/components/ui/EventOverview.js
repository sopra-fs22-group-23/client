import { React, useEffect, useState } from "react";
import "../../styles/ui/EventOverview.scss";
import pic from "../pictures/profilePic.png";
import { apiLoggedIn, handleError } from "../../helpers/api";
import { useParams } from "react-router-dom";
import moment from "moment";

const EventOverview = (props) => {
  const [event, setEvent] = useState(null);
  let { id } = useParams();
  let content = <div></div>;

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await apiLoggedIn().get(`/events/${id}`);

        setEvent(response.data);
      } catch (error) {
        console.error(
          `Something went wrong while fetching the users: \n${handleError(
            error
          )}`
        );
        console.error("Details:", error);
        alert(
          "Something went wrong while fetching the users! See the console for detailss."
        );
      }
    }

    fetchData();
  }, []);

  if (event) {
    content = (
      <div className="event">
        <div className="event-title">{event.title}</div>
        <div className="event-description">{event.description}</div>
        <div className="event-organizer">
          <img src={pic} className="small-profile-pic" />
          <div className="organizer-name"> Maya </div>
          <div className="creation-time">
            happening {moment(event.eventDate).fromNow()}
          </div>
        </div>
        <div className="event-information">
          <div className="event-information-title"> This event includes </div>
          <div class="row">
            <div className="col event-information-element">
              👍🏻 Collaborators: Luka, Vinz, Leo
            </div>
            <div className="col event-information-element">
              🖥 {event.locationName}
            </div>
            <div class="w-100"></div>
            <div className="col event-information-element">
              🎥 3 friends invited
            </div>
            <div className="col event-information-element">
              ⌛️ {event.eventDate}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <>{content}</>;
};

export default EventOverview;
