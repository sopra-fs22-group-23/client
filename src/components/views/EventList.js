import "../../styles/views/EventList.scss";
import React, { Component } from "react";
import AdminList from "../ui/EventLists/AdminList";
import CollaboratorList from "../ui/EventLists/CollaboratorList";
import GuestList from "../ui/EventLists/GuestList";

class EventList extends Component {
  constructor() {
    super();
    this.state = {
      checkedList: "a25",
    };
    this.onChangeValue = this.onChangeValue.bind(this);
  }

  onChangeValue(e) {
    this.setState({ checkedList: e.target.id });
  }

  decideList = () => {
    if (this.state.checkedList === "a25") {
      return <AdminList />;
    }
    if (this.state.checkedList === "a50") {
      return <CollaboratorList />;
    } else {
      return <GuestList />;
    }
  };

  render() {
    return (
      <div class="container">
        <div onChange={(e) => this.onChangeValue(e)}>
          <div class="filterButton">
            <input
              type="radio"
              defaultChecked
              id="a25"
              name="check-substitution-2"
            />
            <label class="btn btn-default" for="a25">
              Admin
            </label>
          </div>
          <div class="filterButton">
            <input
              type="radio"
              id="a50"
              name="check-substitution-2"
              eventList={"collaborator"}
            />
            <label class="btn btn-default" for="a50">
              Collaborator
            </label>
          </div>
          <div class="filterButton">
            <input
              type="radio"
              id="a75"
              name="check-substitution-2"
              eventList={"guest"}
            />
            <label class="btn btn-default" for="a75">
              Guest
            </label>
          </div>
        </div>
        <div class="container-list">
          <div class="scrollable-list" style={{ width: "fit-content" }}>
            <div style={{ width: "450px" }} />
            {this.decideList()}
          </div>
        </div>
      </div>
    );
  }
}

export default EventList;
