import { React, useEffect, useState } from "react";
import { apiLoggedIn, handleError } from "../../../helpers/api";
import PropTypes from "prop-types";
// import "reactjs-popup/dist/index.css";
import "../../../styles/ui/AddInvitees.scss";
import { useParams } from "react-router-dom";

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

const AddInvitees = (props) => {
  let { eventId } = useParams();

  const [phase, setPhase] = useState("invitees");
  const [users, setUsers] = useState(null);
  const [invitees, setInvitees] = useState([]);
  let allUsers = <div></div>;
  let inviteesToInvite = (
    <p className="inviteesToInvite-none">No one selected yet</p>
  );

  //TODO: Send userList as in Post Request
  const postInvitees = async () => {
    try {
      for (let i = 0; i < invitees.length; i++) {
        let username = invitees[i];
        const requestBody = JSON.stringify(username);
        await apiLoggedIn().post(`/events/${eventId}/users`, requestBody);
      }
    } catch (error) {
      alert(
        `Something went wrong during saving invitees: \n${handleError(error)}`
      );
    }
  };

  //add or remove user from invitees list by clicking on the name
  const addInvitee = (user) => {
    const newInvitees = [...invitees];
    if (invitees.includes(user.username) === false) {
      newInvitees.push(user.username);
    } else {
      for (var i = 0; i < newInvitees.length; i++) {
        if (newInvitees[i] === user.username) {
          newInvitees.splice(i, 1);
          break;
        }
      }
    }
    setInvitees(newInvitees);
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
        <div className="inviteesToInvite-names" key={invitee}>
          {invitee}
        </div>
      );
    });
  }

  return (
    <div>
      <div className="inviteesToInvite">
        <p className="inviteesToInvite-label">You are inviting:</p>
        {inviteesToInvite}
      </div>
      <p className="inviteesToInvite-title">Select the users to invite:</p>
      <div className="popup-inner">{allUsers}</div>
      <button className="invite-btn" onClick={() => postInvitees()}>
        <p className="invite-label">Invite!</p>
      </button>
    </div>
  );
};

export default AddInvitees;
