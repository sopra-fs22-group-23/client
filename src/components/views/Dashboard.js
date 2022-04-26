import { React } from "react";
import EventList from "./EventList";
import DashboardButtons from "../ui/DashboardButtons";
import NextEvents from "../ui/NextEvents";
import "../../styles/_theme.scss";
import Header from "./Header";
import "../../styles/views/Dashboard.scss";
import { MyButton } from "../ui/MyButton";
import { apiLoggedIn, handleError } from "../../helpers/api";
import { useNavigate } from "react-router";
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

const Dashboard = (props) => {
  const navigate = useNavigate();
  let userId = localStorage.getItem("userId");

  const logout = async () => {
    try {
      await apiLoggedIn().put(`/logout/${userId}`);
      // Remove the token from the local storage.
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      navigate("/");
    } catch (error) {
      alert(`Something went wrong during logout: \n${handleError(error)}`);
    }
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
      <MyButton onClick={() => logout()}>Logout</MyButton>
    </>
  );
};

export default Dashboard;
