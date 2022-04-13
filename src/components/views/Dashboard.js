import { React } from "react";
import EventList from "./EventList";
import ProfileOverview from "../ui/ProfileOverview";
import DashboardButtons from "../ui/DashboardButtons";
import EventItemSquare from "../ui/EventItemSquare";
import "../../styles/_theme.scss";
import Header from "./Header";
import "../../styles/views/Dashboard.scss";
import { MyButton } from "../ui/MyButton";
import { apiLoggedIn, handleError } from "../../helpers/api";
import { useNavigate } from "react-router";

const Dashboard = (props) => {
  const navigate = useNavigate();
  let userId = localStorage.getItem("userId");

  const logout = async () => {
    try {
      await apiLoggedIn.put(`/logout/${userId}`);
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
          <div className="row">
            <div className="col-6">
              <EventItemSquare />
            </div>
            <div className="col-6">
              <EventItemSquare />
            </div>
          </div>
        </div>
      </div>
      <MyButton onClick={() => logout()}>Logout</MyButton>
    </>
  );
};

export default Dashboard;
