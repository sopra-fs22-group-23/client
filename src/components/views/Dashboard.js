import { React } from "react";
import { apiLoggedIn, handleError } from "../../helpers/api";
import { useNavigate } from "react-router";
import EventList from "./EventList";
import NextEvents from "../ui/NextEvents";
import "../../styles/_theme.scss";
import Header from "./Header";
import "../../styles/views/Dashboard.scss";
import pic from "../pictures/profilePic.png";
import "../../styles/ui/DashboardButtons.scss";

const ProfileOverview = (props) => {
  return (
    <div className="profile">
      <p className="hello">Hi Maya!</p>
      <div className="pic-description">
        <img src={pic} className="profilePic" />
        <p className="profile-description">
          Heyo! My name is Maya and I’m a student at UZH. I love organizing
          lasagne parties and coding. Let’s meet!
        </p>
      </div>
    </div>
  );
};

const DashboardButtons = () => {
  let eventId;
  const navigate = useNavigate();
  const title = "New Event";
  const type = "PUBLIC";
  const status = "IN_PLANNING";

  const newEvent = async () => {
    try {
      const requestBody = JSON.stringify({ title, type, status });
      const response = await apiLoggedIn().post("/events", requestBody);
      eventId = response.data.id;
      navigate(`/event/${eventId}`);
    } catch (error) {
      alert(
        `Something went wrong during event creation: \n${handleError(error)}`
      );
    }
  };

  return (
    <div className="buttons">
      <button className="newEvent-button" onClick={() => newEvent()}>
        <label className="newEvent-label">New event!</label>
      </button>
      <a href="user" className="edit">
        edit
      </a>
    </div>
  );
};

const Dashboard = (props) => {
  return (
    <>
      <Header />
      <div class="row">
        <div class="col-5">
          <div class="container">
            <EventList />
          </div>
        </div>
        <div class="col-7">
          <ProfileOverview />
          <DashboardButtons />
          {/* <NextEvents /> */}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
