import { React } from "react";
import EventList from "./EventList";
import DashboardButtons from "../ui/DashboardButtons";
import NextEvents from "../ui/NextEvents";
import "../../styles/_theme.scss";
import Header from "./Header";
import "../../styles/views/Dashboard.scss";
import pic from "../pictures/profilePic.png";

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
