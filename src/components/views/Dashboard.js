import { React } from "react";
import { useNavigate } from "react-router";
import EventList from "./EventList";
import NextEvents from "../ui/NextEvents";
import "../../styles/_theme.scss";
import Header from "../ui/StandardComponents/Header";
import "../../styles/views/Dashboard.scss";
import pic from "../pictures/pic.png";
import "../../styles/ui/DashboardButtons.scss";

const ProfileOverview = (props) => {
  const currentUsername = localStorage.getItem("username");
  const currentName = localStorage.getItem("name");
  return (
    <div className="profile">
      <p className="hello">Hi {currentName}!</p>
      <div className="pic-description">
        <img src={pic} className="profilePic" />
        <p className="profile-description">
          Heyo! My name is {currentUsername} and I’m a student at UZH. I love
          organizing lasagne parties and coding. Let’s meet!
        </p>
      </div>
    </div>
  );
};

const DashboardButtons = () => {
  const navigate = useNavigate();

  function toCreate() {
    navigate(`/event/create`);
  }

  function toProfile() {
      navigate(`/profile`)
  }

  return (
    <div className="buttons">

        <button className="newEvent-button" onClick={() => toCreate()}>
            <label className="newEvent-label">New event!</label>
        </button>
        <button className="profile-button" onClick={() => toProfile()}>
            <label className="profile-label">My Profile</label>
        </button>
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
          <NextEvents />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
