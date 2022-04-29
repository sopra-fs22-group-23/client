import { React, useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { apiLoggedIn, handleError } from "../../helpers/api";
import PropTypes from "prop-types";
import "reactjs-popup/dist/index.css";
import "../../styles/ui/AddInvitees.scss";
import {useParams} from "react-router-dom";

const User = ({ user }) => {
  let [style, setStyle] = useState("user-item-unclicked");

  //changes style of button when button clicked
  const selectInvitee = (e) => {
    if (style === "user-item-unclicked") {
      setStyle("user-item-clicked");
    } else {
      setStyle("user-item-unclicked");
    }
  };

  return (
    <div className={style} onClick={(e) => selectInvitee(e)}>
      <div className="user-username">
        <p>{user.username}</p>
      </div>
    </div>
  );
};

User.propTypes = {
  user: PropTypes.object,
};

const Invitee = ({ invitee }) => {
  let [style, setStyle] = useState("user-item-unclicked");

  //changes style of button when button clicked
  const selectCollaborator = (e) => {
    if (style === "user-item-unclicked") {
      setStyle("user-item-clicked");
    } else {
      setStyle("user-item-unclicked");
    }
  };

  return (
    <div className={style} onClick={(e) => selectCollaborator(e)}>
      <div className="user-username">
        <p>{invitee.username}</p>
      </div>
    </div>
  );
};

Invitee.propTypes = {
  invitee: PropTypes.object,
};

const SelectGuestsCollaborators = (props) => {
  //const eventId = props.eventId;
  let {eventId} = useParams();
  const [phase, setPhase] = useState("invitees");

  //phase 1: select invitees
  const [users, setUsers] = useState(null);
  let [guests, setGuests] = useState([]);
  const [invitees, setInvitees] = useState([]);
  let allUsers = <div></div>;
  let inviteesToInvite = (
    <p className="inviteesToInvite-none">No one selected yet</p>
  );

  //Adds a user as collaborator to collaborators list and deletes them from guest list
  const postInviteesCollaborators = async (guests, collaborators) => {
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

  //add or remove user from invitees list by clicking on the name
  const addInvitee = (user) => {
    const newInvitees = [...invitees];
    if (invitees.includes(user) === false) {
      newInvitees.push(user);
    } else {
      for (var i = 0; i < newInvitees.length; i++) {
        if (newInvitees[i] === user) {
          newInvitees.splice(i, 1);
          break;
        }
      }
    }
    setInvitees(newInvitees);
  };

  const changePopUp = () => {
    setPhase("collaborators");
    setGuests([...invitees]);
  };

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

    //list of all users except for the creator
    allUsers = (
      <ul class="list-group">
        {newUsers.map((user) => {
          return (
            <div key={user.username} onClick={() => addInvitee(user)}>
              <User user={user} />
            </div>
          );
        })}
      </ul>
    );
  }

  if (invitees.length !== 0) {
    //list of selected users
    inviteesToInvite = invitees.map((invitee) => {
      return (
        <div className="inviteesToInvite-names" key={invitee.username}>
          {invitee.username}
        </div>
      );
    });
  }

  //phase 2: select collaborators
  let [collaborators, setCollaborators] = useState([]);
  let allCollaborators = (
    <p className="inviteesToInvite-none">No one selected yet</p>
  );

  //Adds a user as collaborator to collaborators list and deletes them from guest list
  //as result collaborators=users to invite as collaborators, guests=users to invite as guests
  const addCollaborator = (invitee) => {
    const newCollaborators = [...collaborators];
    if (collaborators.includes(invitee) === false) {
      newCollaborators.push(invitee);
    } else {
      for (var i = 0; i < newCollaborators.length; i++) {
        if (newCollaborators[i] === invitee) {
          newCollaborators.splice(i, 1);
          break;
        }
      }
    }
    const newGuests = [...guests];
    if (guests.includes(invitee) === false) {
      newGuests.push(invitee);
    } else {
      for (var i = 0; i < newGuests.length; i++) {
        if (newGuests[i] === invitee) {
          newGuests.splice(i, 1);
          break;
        }
      }
    }
    setCollaborators(newCollaborators);
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

  let allInvitees = (
    <ul class="list-group">
      {invitees.map((invitee) => {
        return (
          <div key={invitee.username} onClick={() => addCollaborator(invitee)}>
            <Invitee invitee={invitee} />
          </div>
        );
      })}
    </ul>
  );

  //return statements
  if (phase === "invitees") {
    return (
      <div>
        <div className="inviteesToInvite">
          <p className="inviteesToInvite-label">You are inviting:</p>
          {inviteesToInvite}
        </div>
        <p className="inviteesToInvite-title">Select the users to invite:</p>
        <div className="popup-inner">{allUsers}</div>
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
          {allCollaborators}
        </div>
        <p className="inviteesToInvite-title">Select your collaborators:</p>
        <div className="popup-inner">{allInvitees}</div>
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

export default SelectGuestsCollaborators;
