import { React, useEffect, useState } from "react";
import "../../../styles/ui/EventOverview.scss";
import pic from "../../pictures/pic.png";
import { apiLoggedIn } from "../../../helpers/api";
import PropTypes from "prop-types";
import moment from "moment";

const GuestList = ({ user }) => <div>{user.username},&nbsp; </div>;

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
          <div className="organizer-name">Host: {props.admin.username}</div>
          <div className="creation-time">
            happening {moment(props.event.eventDate).fromNow()}
          </div>
        </div>
        <div className="event-information">
          <div className="event-information-title"> This event includes</div>
          <div className="row">
            <div className="col event-information-element">
              💪🏼 &nbsp;Collaborators:&nbsp;
              {props.collaborators.map((user) => (
                  <GuestList user={user} key={user.id} />
              ))}
            </div>
            <div className="col event-information-element">
              &nbsp;📍 &nbsp;&nbsp;
              {props.event.locationName}
            </div>
            <div className="w-100"></div>
            <div className="col event-information-element">
              👥 &nbsp;{eventUsers.length} person(s) are taking part!
            </div>
            <div className="col event-information-element">
              🕓️ &nbsp;{moment.utc(props.event.eventDate).format("Do MMMM YYYY, H:mm")}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <div>{content}</div>;
};

export default EventOverview;
