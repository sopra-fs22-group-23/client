import React from "react";
import EventItem from "../ui/EventItem";
import { SearchBar } from "../ui/SearchBar";
import FilterButton from "../ui/FilterButton";
import { VerticalLineDashboard } from "../ui/VerticalLineDashboard";
import ProfileOverview from "../ui/ProfileOverview";
import DashboardButtons from "../ui/DashboardButtons";
import EventItemSquare from "../ui/EventItemSquare";
import "../../styles/_theme.scss";

const Dashboard = (props) => {
  return (
    <div>
      <div class="row">
        <div class="col-5">
          <div class="container">
            <FilterButton />
            <SearchBar />
            <div>
              <ul class="list-group">
                <EventItem class="list-group-item"></EventItem>
                <EventItem class="list-group-item">Event 2</EventItem>
                <EventItem class="list-group-item">Event 3</EventItem>
                <EventItem class="list-group-item">Event 4</EventItem>
              </ul>
            </div>
          </div>
        </div>
        <VerticalLineDashboard />
        <div class="col-7">
          <ProfileOverview />
          <DashboardButtons />
          <EventItemSquare />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;