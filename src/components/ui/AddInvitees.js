import { React, useEffect, useState, useRef } from "react";
import { Modal } from "react-bootstrap";
import { apiLoggedIn, handleError } from "../../helpers/api";
import PropTypes from "prop-types";
import "reactjs-popup/dist/index.css";
import "../../styles/ui/AddInvitees.scss";
import { SearchBar } from "./StandardComponents/SearchBar";

const User = (props) => {
  const chooseStyle = () => {
    for (let i in props.invitees) {
      if (props.invitees[i].username === props.user.username) {
        return "user-item-clicked";
      }
    }
    return "user-item-unclicked";
  };

  let [style, setStyle] = useState(() => chooseStyle());

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
    setStyle(chooseStyle());
  }, [props.invitees]);

  for (let i in props.existingCollab) {
    if (
      String(props.existingCollab[i].username) === String(props.user.username)
    ) {
      return (
        <div className="user-item-collab">
          <div className="user-username">
            <p>{props.user.username}</p>
          </div>
        </div>
      );
    }
  }
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

const AddInvitees = (props) => {
  const eventId = props.eventId;
  const [phase, setPhase] = useState("invitees");
  const myId = localStorage.getItem("userId");

  //phase 1: select guests
  let [registeredUsers, setRegisteredUsers] = useState([]); //all registered users in the app (lower part of popup)
  let [existingInvitees, setExistingInvitees] = useState([]); //ll existing invitees (guests and collabs) for the event
  let [existingGuests, setExistingGuests] = useState([]); //all existing Guests
  let [existingCollab, setExistingCollab] = useState([]); //all existing Collab
  let [alreadyCancelledUsers, setAlreadyCancelledUsers] = useState([]); //already cancelled users

  let [invitees, setInvitees] = useState([]); //people I want invite (upper part of popup)

  let [cancelledGuests, setCancelledGuests] = useState([]); ////Users to cancel

  let [allUsers, setAllUsers] = useState(<div>No users yet</div>); //graphic rapresentation of users list (clickable boxes with username)

  // graphic rapresentation of invitees list (upper part of popup)
  let inviteesToInvite = (
    <p className="inviteesToInvite-none">No one selected yet</p>
  );

  //gets list of all registered users in the app and all already existing invitees for the event
  useEffect(() => {
    async function fetchData() {
      try {
        let response1 = await apiLoggedIn().get(
          `/events/${eventId}/users?eventUserStatus=INVITED`
        ); //gets all existing invitees (guests and collabs) for the event
        setExistingInvitees(response1.data);

        const response2 = await apiLoggedIn().get(`/users`); //gets all registered users in the app
        setRegisteredUsers(response2.data);

        let response3 = await apiLoggedIn().get(
          `/events/${eventId}/users?eventUserStatus=CANCELLED`
        );
        setAlreadyCancelledUsers(response3.data);
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

  //list of all existing guests and collabs
  useEffect(() => {
    let existingInviteesFilter = [...existingInvitees];
    setExistingGuests(
      existingInviteesFilter.filter((r) => r.eventUserRole === "GUEST")
    );
    setExistingCollab(
      existingInviteesFilter.filter((r) => r.eventUserRole === "COLLABORATOR")
    );

    let inviteesToSet = [];
    console.log();
    for (let i in existingInvitees) {
      for (let n in registeredUsers) {
        if (existingInvitees[i].username === registeredUsers[n].username) {
          if (String(registeredUsers[n].id) !== myId)
            inviteesToSet.push(registeredUsers[n]);
        }
      }
    }
    setInvitees(inviteesToSet);
  }, [registeredUsers]);

  //graphic rapresentation of all registered users at the beginning
  useEffect(() => {
    if (registeredUsers) {
      let newUsers = [...registeredUsers];

      //remove the creator of the event from the list of possible invitees (creator automatically invited)
      for (let i in registeredUsers) {
        if (String(newUsers[i].id) === myId) {
          newUsers.splice(i, 1);
          break;
        }
      }
      for (let m in newUsers) {
        for (let s in existingCollab) {
          if (newUsers[m].username === existingCollab[s].username) {
            newUsers.splice(m, 1);
          }
        }
      }
      //all registered users except for the creator
      setAllUsers(
        <>
          {existingCollab.map((user) => {
            return (
              <div key={user.username}>
                <User
                  user={user}
                  invitees={invitees}
                  existingGuests={existingGuests}
                  existingCollab={existingCollab}
                />
              </div>
            );
          })}
          {newUsers.map((user) => {
            return (
              <div key={user.username} onClick={() => manageInvitee(user)}>
                <User
                  user={user}
                  invitees={invitees}
                  existingGuests={existingGuests}
                  existingCollab={existingCollab}
                />
              </div>
            );
          })}
        </>
      );
    }
  }, [invitees]);

  if (invitees.length !== 0) {
    inviteesToInvite = invitees.map((invitee) => {
      return (
        <div className="inviteesToInvite-names" key={invitee.username}>
          {invitee.username}
        </div>
      );
    });
  }

  //add or remove user from invitees list by clicking on the name
  const manageInvitee = (user) => {
    if (invitees.includes(user) === false) {
      for (let i in cancelledGuests) {
        if (existingGuests[i].username === user.username) {
          cancelledGuests.splice(i, 1);
        }
      }
      invitees.push(user);
    } else {
      for (let i in invitees) {
        if (invitees[i] === user) {
          for (let n in existingGuests) {
            if (existingGuests[n].username === invitees[i].username) {
              cancelledGuests.push(existingGuests[n]);
            }
          }
          invitees.splice(i, 1);
        }
      }
    }
    const newInvitees = [...invitees];
    setInvitees(newInvitees);
    setCancelledGuests(cancelledGuests);
  };

  const searchFunctionGuests = (returnList) => {
    let newUsers = [...returnList];

    //remove the creator of the event from the list of possible invitees (creator automatically invited)
    for (let i in returnList) {
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
            <div key={user.username} onClick={() => manageInvitee(user)}>
              <User
                user={user}
                invitees={invitees}
                existingCollab={existingCollab}
              />
            </div>
          );
        })}
      </>
    );
  };

  //changes phase (from selecting guests to selecting collaborators)
  const changePopUp = () => {
    setPhase("collaborators");
  };

  //function called at the end, to actually invite the users
  const postInviteesCollaborators = async (invitees, cancelledGuests) => {
    cancelledGuests.forEach((cancelledGuest) => {
      try {
        const requestBody = JSON.stringify({
          id: cancelledGuest.id,
          eventUserStatus: "CANCELLED",
        });
        const response = apiLoggedIn().put(
          `/events/${eventId}/users`,
          requestBody
        );
      } catch (error) {
        alert(
          `Something went wrong while cancelling a guest: \n${handleError(
            error
          )}`
        );
      }
    });
    let newinvitees = [...invitees];
    for (let i in newinvitees) {
      for (let n in existingGuests) {
        if (newinvitees[i].username === existingGuests[n].username) {
          newinvitees.splice(i, 1);
        }
      }
    }
    let newinviteesC = [...newinvitees];
    for (let m in newinviteesC) {
      for (let s in existingCollab) {
        if (newinviteesC[m].username === existingCollab[s].username) {
          newinviteesC.splice(m, 1);
        }
      }
    }

    for (let i in alreadyCancelledUsers) {
      for (let s in newinviteesC) {
        if (alreadyCancelledUsers[i].username === newinviteesC[s].username) {
          try {
            const requestBody = JSON.stringify({
              id: newinviteesC[s].id,
              eventUserStatus: "INVITED",
            });
            const response = apiLoggedIn().put(
              `/events/${eventId}/users`,
              requestBody
            );

            newinviteesC.splice(i, 1);
          } catch (error) {
            alert(
              `Something went wrong during saving invitees: \n${handleError(
                error
              )}`
            );
          }
        }
      }
    }

    newinviteesC.forEach((guest) => {
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
    window.location.reload();
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
          list={registeredUsers}
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
        {/* <button className="invite-btn" onClick={() => changePopUp()}> */}
        <button
          className="invite-btn"
          onClick={() => postInviteesCollaborators(invitees, cancelledGuests)}
        >
          <p className="invite-label">Next</p>
        </button>
      </div>
    );
  }
};

export default AddInvitees;
