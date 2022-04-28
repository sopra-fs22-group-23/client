import { React, useEffect, useState } from "react";
import "../../styles/ui/EventOverview.scss";
import pic from "../pictures/profilePic.png";
import { apiLoggedIn } from "../../helpers/api";
import PropTypes from "prop-types";
import moment from "moment";

const GuestList = ({ user }) => <div>{user.username}</div>;

GuestList.propTypes = {
  user: PropTypes.object,
};

const EventOverview = (props) => {
  const [eventUsers, setEventUsers] = useState(null);
  useEffect(() => {
    async function loadEventUsers() {
      const response = await apiLoggedIn().get(
        `/events/${props.event.id}/users`
      );
      setEventUsers(response.data);
    }
    loadEventUsers();
  }, []);

  let content = "";

  if (eventUsers) {
    content = (
      <div className="event">
        <div className="event-title">{props.event.title}</div>
        <div className="event-description">{props.event.description}</div>
        <div className="event-organizer">
          <img src={pic} className="small-profile-pic" />
          <div className="organizer-name"> Maya</div>
          <div className="creation-time">
            happening {moment(props.event.eventDate).fromNow()}
          </div>
        </div>
        <div className="event-information">
          <div className="event-information-title"> This event includes</div>
          <div className="row">
            <div className="col event-information-element">
              👍🏻 Collaborators:&nbsp;
              {eventUsers.map((user) => (
                <GuestList user={user} key={user.id} />
              ))}
            </div>
            <div className="col event-information-element">
              🖥 {String(props.event)}
            </div>
            <div className="w-100"></div>
            <div className="col event-information-element">
              🎥 {String(props.event.eventUsers)}
            </div>
            <div className="col event-information-element">
              ⌛️ {String(props.event.eventDate)}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <div>{content}</div>;
};

export default EventOverview;
