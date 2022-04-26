import React, {useEffect, useState} from "react";
import Footer from "../ui/Footer";
import EventOverview from "../ui/EventOverview";
import Header from "./Header";
import "../../styles/views/Event.scss";
import {useParams} from "react-router-dom";
import {apiLoggedIn} from "../../helpers/api";
import pic from "../pictures/profilePic.png";
import {useNavigate} from "react-router";

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

const Event = () => {

  let {eventId} = useParams();
  const [event, setEvent] = useState(null);
  const navigate = useNavigate();

  function toEdit(){
    if(event){
      navigate(`/event/${eventId}/edit`)
    }
  }

  useEffect(() => {
    async function loadEvent(){
      const response = await apiLoggedIn().get(`/events/${eventId}`);
      setEvent(response.data);
    } loadEvent();
  }, []);

  let content = "";

  if(event){
    content = (
        <div>
          <Header></Header>
          <div className="row">
            <div className="col-7">
              <EventOverview event={event}></EventOverview>
            </div>
            <div className="col-4">
              <SmallProfileOverview />
              <div className="event-buttons">
                <button className="event-button-left"
                  onClick={() => toEdit()}>
                  <label className="event-label">Edit</label>
                </button>
                <button className="event-button">
                  <label className="event-label"> Tasks</label>
                </button>
              </div>
            </div>
          </div>
          <Footer />
        </div>
    );
  }

  return (
      <div>
        {content}
      </div>
  );

};

export default Event;

