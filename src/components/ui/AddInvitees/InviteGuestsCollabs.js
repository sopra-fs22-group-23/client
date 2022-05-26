import { React, useEffect, useState, useRef } from "react";
import { Modal } from "react-bootstrap";
import { apiLoggedIn, handleError } from "../../../helpers/api";
import PropTypes from "prop-types";
import "reactjs-popup/dist/index.css";
import "../../../styles/ui/AddInvitees.scss";
import { SearchBar } from "../StandardComponents/SearchBar";

const User = (props) => {
  let [style, setStyle] = useState("user-item-unclicked");

  //changes style of button when button clicked
  const updateStyle = () => {
    if (style === "user-item-unclicked") {
      setStyle("user-item-clicked");
    } else {
      setStyle("user-item-unclicked");
    }
  };
  //changes style of button when button clicked
  useEffect(() => {
    if (props.invitees.includes(props.user)) {
      setStyle("user-item-clicked");
    } else {
      setStyle("user-item-unclicked");
    }
  }, [props.invitees]);

  return (
    <div className={style} onClick={() => updateStyle()}>
      <div className="user-username">
        <p>{props.user.username}</p>
      </div>
    </div>
  );
};

User.propTypes = {
  user: PropTypes.object,
};

const Guest = (props) => {
  let [style, setStyle] = useState("user-item-unclicked");

  //changes style of button when button clicked
  const updateStyle = () => {
    if (style === "user-item-unclicked") {
      setStyle("user-item-clicked");
    } else {
      setStyle("user-item-unclicked");
    }
  };

  useEffect(() => {
    if (props.collaborators.includes(props.guest)) {
      setStyle("user-item-clicked");
    } else {
      setStyle("user-item-unclicked");
    }
  }, [props.collaborators]);

  return (
    <div className={style} onClick={(e) => updateStyle()}>
      <div className="user-username">
        <p>{props.guest.username}</p>
      </div>
    </div>
  );
};

Guest.propTypes = {
  guest: PropTypes.object,
};

const InviteGuestsCollabs = (props) => {
  const eventId = props.eventId;
  const [phase, setPhase] = useState("invitees");

  //phase 1: select guests
  let [users, setUsers] = useState(null); //all registered users (lower part of popup)
  let [allUsers, setAllUsers] = useState(<div>No users yet</div>); //graphic rapresentation of users list (clickable boxes with username)
  let [invitees, setInvitees] = useState([]); //people I want invite (upper part of popup)
  // graphic rapresentation of invitees list (upper part of popup)
  let inviteesToInvite = (
    <p className="inviteesToInvite-none">No one selected yet</p>
  );
  let [guests, setGuests] = useState([]); //copy of the users selected to be invited, used in phase 2: collaborators

  //gets list of all registered users at the begnning
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await apiLoggedIn().get(`/users`);
        setUsers(response.data);
      } catch (error) {
        console.error(
          `Something went wrong while fetching the users: \n${handleError(
            error
          )}`
        );
        console.error("Details:", error);
        alert(
          "Something went wrong while fetching the users! See the console for detailss."
        );
      }
    }
    fetchData();
  }, []);

  //graphic rapresentation of all registered users at the beginning
  useEffect(() => {
    if (users) {
      let newUsers = [...users];
      const myId = localStorage.getItem("userId");

      //remove the creator of the event from the list of possible invitees (creator automatically invited)
      for (var i = 0; i < users.length; i++) {
        if (String(newUsers[i].id) === myId) {
          newUsers.splice(i, 1);
          break;
        }
      }
      //all registered users except for the creator
      setAllUsers(
        <>
          {newUsers.map((user) => {
            return (
              <div key={user.username} onClick={() => addInvitee(user)}>
                <User user={user} invitees={invitees} />
              </div>
            );
          })}
        </>
      );
    }
  }, [users]);

  //add or remove user from invitees list by clicking on the name
  const addInvitee = (user) => {
    if (invitees.includes(user) === false) {
      invitees.push(user);
    } else {
      for (let i in invitees) {
        if (invitees[i] === user) {
          invitees.splice(i, 1);
          break;
        }
      }
    }
    const newInvitees = [...invitees];
    setInvitees(newInvitees);
    console.log(invitees);
  };

  if (invitees.length !== 0) {
    inviteesToInvite = invitees.map((invitee) => {
      return (
        <div className="inviteesToInvite-names" key={invitee.username}>
          {invitee.username}
        </div>
      );
    });
  }

  const searchFunctionGuests = (returnList) => {
    let newUsers = [...returnList];
    const myId = localStorage.getItem("userId");

    //remove the creator of the event from the list of possible invitees (creator automatically invited)
    for (var i = 0; i < returnList.length; i++) {
      if (String(newUsers[i].id) === myId) {
        newUsers.splice(i, 1);
        break;
      }
    }

    //list of all users except for the creator
    setAllUsers(
      <>
        {newUsers.map((user) => {
          return (
            <div key={user.username} onClick={() => addInvitee(user)}>
              <User user={user} invitees={invitees} />
            </div>
          );
        })}
      </>
    );
  };

  //changes phase (from selecting guests to selecting collaborators)
  const changePopUp = () => {
    setPhase("collaborators");
    setGuests([...invitees]);
  };

  //phase 2: select collaborators
  let [collaborators, setCollaborators] = useState([]); //all selected collaborators
  //graphic rapresentation of all collaborators(upper part of popup)
  let allCollaborators = (
    <p className="inviteesToInvite-none">No one selected yet</p>
  );
  //graphic rapresentation of users selected to be invited (lower part of popup)

  let [allInvitees, setAllInvitees] = useState(<div></div>);

  useEffect(() => {
    setAllInvitees(
      <>
        {invitees.map((invitee) => {
          return (
            <div
              key={invitee.username}
              onClick={() => addCollaborator(invitee)}
            >
              <Guest guest={invitee} collaborators={collaborators} />
            </div>
          );
        })}
      </>
    );
  }, [guests]);

  //Adds a user as collaborator to collaborators list and deletes them from guest list
  //as result collaborators=users to invite as collaborators, guests=users to invite as guests
  const addCollaborator = (invitee) => {
    console.log(invitee);
    if (collaborators.includes(invitee) === false) {
      console.log(1);
      collaborators.push(invitee);
    } else {
      console.log(2);
      for (var i = 0; i < collaborators.length; i++) {
        if (collaborators[i] === invitee) {
          collaborators.splice(i, 1);
          break;
        }
      }
    }
    setCollaborators(collaborators);
    console.log(collaborators);

    const newGuests = [...guests];
    if (guests.includes(invitee) === false) {
      newGuests.push(invitee);
      console.log(3);
    } else {
      console.log(4);
      for (var i = 0; i < newGuests.length; i++) {
        if (newGuests[i] === invitee) {
          newGuests.splice(i, 1);
          break;
        }
      }
    }
    setGuests(newGuests);
  };

  if (collaborators.length !== 0) {
    //list of selected collaborators
    allCollaborators = collaborators.map((collaborator) => {
      return (
        <div className="inviteesToInvite-names" key={collaborator.username}>
          {collaborator.username}
        </div>
      );
    });
  }

  const searchFunctionCollaborators = (returnList) => {
    let newUsers = [...returnList];

    //list of all users except for the creator
    setAllInvitees(
      <>
        {newUsers.map((invitee) => {
          return (
            <div
              key={invitee.username}
              onClick={() => addCollaborator(invitee)}
            >
              <Guest guest={invitee} collaborators={collaborators} />
            </div>
          );
        })}
      </>
    );
  };

  //function called at the end, to actually invite the users
  const postInviteesCollaborators = async (guests, collaborators) => {
    console.log("guests");
    console.log(guests);
    console.log("collaborators");
    console.log(collaborators);
    guests.forEach((guest) => {
      try {
        const requestBody = JSON.stringify({
          id: guest.id,
          eventUserRole: "GUEST",
        });
        const response = apiLoggedIn().post(
          `/events/${eventId}/users`,
          requestBody
        );
      } catch (error) {
        alert(
          `Something went wrong during saving invitees: \n${handleError(error)}`
        );
      }
    });
    collaborators.forEach((user) => {
      try {
        const requestBody = JSON.stringify({
          id: user.id,
          eventUserRole: "COLLABORATOR",
        });
        const response = apiLoggedIn().post(
          `/events/${eventId}/users`,
          requestBody
        );
      } catch (error) {
        alert(
          `Something went wrong during saving collaborators: \n${handleError(
            error
          )}`
        );
      }
    });
    // TODO: deactivate button
  };

  //return statements
  if (phase === "invitees") {
    return (
      <div>
        <div className="inviteesToInvite">
          <p className="inviteesToInvite-label">You are inviting:</p>
          <div
            style={{
              height: "85px",
              "margin-bottom": "8px",
              "padding-top": "0px !important",
            }}
          >
            <div
              className="scrollable-list"
              style={{
                "padding-top": "0px !important",
                padding: "0px",
                "scroll-padding": "110px !important",
              }}
            >
              {inviteesToInvite}
            </div>
          </div>
        </div>
        <p className="inviteesToInvite-title">Select the users to invite:</p>
        <SearchBar
          list={users}
          searchFunction={searchFunctionGuests.bind(this)}
        />
        <div className="popup-inner">
          <div style={{ height: "250px", "margin-bottom": "60px" }}>
            <div
              className="scrollable-list"
              style={{
                "padding-top": "0px !important",
                "scroll-padding-top": "0px",
              }}
            >
              {allUsers}
            </div>
          </div>
        </div>
        <button className="invite-btn" onClick={() => changePopUp()}>
          <p className="invite-label">Next</p>
        </button>
      </div>
    );
  }

  if (phase === "collaborators") {
    return (
      <div>
        <div className="inviteesToInvite">
          <p className="inviteesToInvite-label">Your collaborators are:</p>
          <div
            style={{
              height: "85px",
              "margin-bottom": "8px",
              "padding-top": "0px !important",
            }}
          >
            <div
              className="scrollable-list"
              style={{
                padding: "0px",
                "scroll-padding": "110px !important",
                "padding-top": "0px !important",
              }}
            >
              {allCollaborators}
            </div>
          </div>
        </div>
        <p className="inviteesToInvite-title">Select your collaborators:</p>
        <SearchBar
          list={invitees}
          searchFunction={searchFunctionCollaborators.bind(this)}
        />
        <div className="popup-inner">
          <div style={{ height: "250px", "margin-bottom": "60px" }}>
            <div
              className="scrollable-list"
              style={{
                "padding-top": "0px !important",
                "scroll-padding-top": "0px",
              }}
            >
              {allInvitees}
            </div>
          </div>
        </div>
        <button
          className="invite-btn"
          onClick={() => [
            postInviteesCollaborators(guests, collaborators),
            props.setPhase3(),
          ]}
        >
          <p className="invite-label">Next</p>
        </button>
      </div>
    );
  }
};

export default InviteGuestsCollabs;
