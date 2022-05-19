import { React, useEffect, useState, useRef } from "react";
import { Modal } from "react-bootstrap";
import { apiLoggedIn, handleError } from "../../../helpers/api";
import PropTypes from "prop-types";
import "reactjs-popup/dist/index.css";
import "../../../styles/ui/AddInvitees.scss";
import { SearchBar } from "../StandardComponents/SearchBar";

const User = (props) => {
  const chooseStyle = () => {
    for (let i in props.newCollabs) {
      if (props.newCollabs[i].username === props.user.username) {
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
  }, [props.newCollabs]);

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

const AddCollaborators = (props) => {
  const eventId = props.eventId;

  let [existingCollabs, setExistingCollabs] = useState([]); //all existing Collab
  let [existingInvitees, setExistingInvitees] = useState([]); //ll existing invitees (guests and collabs) for the event

  let [allGuests, setAllGuests] = useState(<div>No users yet</div>); //graphic rapresentation of users list (clickable boxes with username)
  let [invitees, setInvitees] = useState([]); //people I want invite (upper part of popup)

  let [newCollabs, setNewCollabs] = useState([]);
  // graphic rapresentation of invitees list (upper part of popup)
  let inviteesToInvite = (
    <p className="inviteesToInvite-none">No one selected yet</p>
  );

  useEffect(() => {
    async function fetchData() {
      try {
        let inviteesInvited = await apiLoggedIn().get(
          `/events/${eventId}/users?eventUserStatus=INVITED`
        ); //gets all existing invitees (guests and collabs) for the event

        let inviteesConfirmed = await apiLoggedIn().get(
          `/events/${eventId}/users?eventUserStatus=CONFIRMED`
        ); //gets all existing invitees (guests and collabs) for the event

        const allInvitee = inviteesInvited.data.concat(
          inviteesConfirmed.data.filter((r) => r.eventUserRole !== "ADMIN")
        );

        setExistingInvitees(allInvitee);
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

  useEffect(() => {
    setExistingCollabs(
      existingInvitees.filter((r) => r.eventUserRole === "COLLABORATOR")
    );
  }, [existingInvitees]);

  useEffect(() => {
    if (existingInvitees) {
      let newUsers = [...existingInvitees];

      for (let m in newUsers) {
        for (let s in existingCollabs) {
          if (newUsers[m].username === existingCollabs[s].username) {
            newUsers.splice(m, 1);
          }
        }
      }
      //all registered users except for the creator
      setAllGuests(
        <>
          {existingCollabs.map((user) => {
            return (
              <div key={user.username}>
                <User
                  user={user}
                  invitees={invitees}
                  existingCollab={existingCollabs}
                />
              </div>
            );
          })}
          {newUsers.map((user) => {
            return (
              <div key={user.username} onClick={() => manageInvitee(user)}>
                <User
                  user={user}
                  newCollabs={newCollabs}
                  existingCollab={existingCollabs}
                />
              </div>
            );
          })}
        </>
      );
    }
  }, [existingCollabs]);

  if (newCollabs.length !== 0 || existingCollabs.length !== 0) {
    let concs = existingCollabs.concat(newCollabs);
    inviteesToInvite = concs.map((invitee) => {
      return (
        <div className="inviteesToInvite-names" key={invitee.username}>
          {invitee.username}
        </div>
      );
    });
  }

  //add or remove user from invitees list by clicking on the name
  const manageInvitee = (user) => {
    if (newCollabs.includes(user) === false) {
      console.log(user);
      newCollabs.push(user);
    } else {
      for (let i in newCollabs) {
        if (newCollabs[i] === user) {
          newCollabs.splice(i, 1);
        }
      }
    }
    const superNewCollabs = [...newCollabs];
    setNewCollabs(superNewCollabs);
  };

  const searchFunctionCollabs = (returnList) => {
    let newUsers = [...returnList];

    //list of all users except for the creator
    setAllGuests(
      <>
        {newUsers.map((user) => {
          return (
            <div key={user.username} onClick={() => manageInvitee(user)}>
              <User
                user={user}
                newCollabs={newCollabs}
                existingCollab={existingCollabs}
              />
            </div>
          );
        })}
      </>
    );
  };

  const putCollab = (newCollabs) => {
    newCollabs.forEach((collab) => {
      try {
        const requestBody = JSON.stringify({
          id: collab.id,
          eventUserRole: "COLLABORATOR",
        });
        const response = apiLoggedIn().put(
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
  };

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
            {inviteesToInvite}
          </div>
        </div>
      </div>
      <p className="inviteesToInvite-title">Select your collaborators:</p>
      <SearchBar
        list={existingInvitees}
        searchFunction={searchFunctionCollabs.bind(this)}
      />
      <div className="popup-inner">
        <div style={{ height: "250px", "margin-bottom": "60px" }}>
          <div
            className="scrollable-list"
            style={{
              "padding-top": "0px",
              "scroll-padding-top": "0px",
              "padding-top": "0px !important",
            }}
          >
            {allGuests}
          </div>
        </div>
      </div>
      <button
        className="invite-btn"
        onClick={() => [putCollab(newCollabs), window.location.reload()]}
      >
        <p className="invite-label">Save</p>
      </button>
    </div>
  );
};

export default AddCollaborators;
