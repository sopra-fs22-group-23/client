import { React } from "react";
import { useNavigate } from "react-router";
import EventList from "./EventList";
import NextEvents from "../ui/NextEvents";
import "../../styles/_theme.scss";
import Header from "../ui/StandardComponents/Header";
import "../../styles/views/Dashboard.scss";
import pic from "../pictures/pic.png";
import "../../styles/ui/DashboardButtons.scss";
import { useState, useEffect } from "react";
import { apiLoggedIn, handleError } from "../../helpers/api";
import {getDomain} from "../../helpers/getDomain";


const ProfileOverview = (props) => {
  const currentUsername = localStorage.getItem("username");
  const currentName = localStorage.getItem("name");

  const [bio, setBio] = useState("");
  const myId = localStorage.getItem("userId");

  useEffect(() => {
    async function loadBio() {
      try {
        const response = await apiLoggedIn().get(`/users/${myId}`);
        const myProfile = response.data;
        setBio(myProfile.biography);
      } catch (error) {
        console.error(
          `Something went wrong while loading the bio: \n${handleError(error)}`
        );
        console.error("Details:", error);
        alert(
          "Something went wrong while loading the bio! See the console for details."
        );
      }
    }
    loadBio();
  }, []);

  return (
    <div className="profile">
      <p className="hello">Hi {currentName}!</p>
      <div className="pic-description">

          <img src={getDomain() + "/users/" + localStorage.getItem("userId") + "/image"} className={"profilePic"}
               onError={({ currentTarget }) => {
                   currentTarget.onerror = null; // prevents looping
                   currentTarget.src = pic;
               }}/>
        <p className="profile-description">{bio}</p>

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
    navigate(`/profile`);
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
