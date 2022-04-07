import { React } from "react";
import EventList from "./EventList";
import ProfileOverview from "../ui/ProfileOverview";
import DashboardButtons from "../ui/DashboardButtons";
import EventItemSquare from "../ui/EventItemSquare";
import "../../styles/_theme.scss";
import Header from "./Header";

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
    </>
  );
};

export default Dashboard;
