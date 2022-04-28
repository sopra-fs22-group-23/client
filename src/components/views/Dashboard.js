import { React } from "react";
import { useNavigate } from "react-router";
import EventList from "./EventList";
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

  const navigate = useNavigate();

  return (
    <div className="buttons">
      <button className="newEvent-button" onClick={() => navigate("/event/create")}>
        <label className="newEvent-label">New event!</label>
      </button>
      <a href="user" className="edit">
        edit
      </a>
    </div>
  );
};

//TODO: fix NextEvents
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
