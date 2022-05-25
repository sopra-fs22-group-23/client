import Header from "../ui/StandardComponents/Header";
import React, { useEffect, useRef, useState } from "react";
import { FormField } from "../ui/StandardComponents/FormField";
import { apiLoggedIn, handleError } from "../../helpers/api";
import { MyButton } from "../ui/StandardComponents/MyButton";
import { useNavigate } from "react-router";
import { useParams } from "react-router-dom";
import "../../styles/views/EditEvent.scss";
import "../../styles/views/NewEvent.scss";
import InvitePopup from "../ui/PopUps/InvitePopup";
import TaskPopup from "../ui/PopUps/TaskPopup";
import PlacesInput from "./PlacesInput";

const UserEdit = (props) => {
  const userId = localStorage.getItem("userId");
  const user = props.user;
  const navigate = useNavigate();
  let [phase, setPhase] = useState("edit");

  console.log(userId);
  const [file, setFile] = useState(null);

  function handleChange(e) {
    setFile(e.target.files[0]);
    console.log(e.target.files[0]);
  }

  const [username, setUsername] = useState(user.username);
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState(null);
  const [birthday, setBirthday] = useState(user.birthday);
  const [biography, setBiography] = useState(user.biography);


  /*
  function handleUpload(){
    const formData = new FormData();
    formData.append('file', file);
    formData.append('test', "message");
    for (var pair of formData.entries()) {
      console.log(pair[0]+ ', ' + pair[1]);
    }
    const response = apiLoggedIn().post(`/events/${eventId}/image`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  }*/

  const updateEvent = async () => {
    try {
      //--- Put Event Params ---//
      const requestBody = JSON.stringify({
        username,
        name,
        password,
        birthday,
        biography,
        email,
      });
      const response = await apiLoggedIn().put(
        `/users/${userId}`,
        requestBody
      );
      //handleUpload();

      window.location.reload();
    } catch (error) {
        if(error.response.status === 500 ){
            alert("Hey, your username or email in not unique. If you want to be someone else, sadly for you, the other person was faster:/")
        }
        else if(error.response.status === 400  && birthday !== user.birthday){
            alert("Oh, are you from the future? Nice to know it. Do you know, whether we were invited to sopra apero?")
        }
        else if(error.response.status === 400  ){
            alert("Hmm, can you receive messages on that email?")
        }
        else{
            alert(
                `Something went wrong during user update: \n${handleError(error)}`
            );
        }
    }
  };


  if (phase === "edit") {
    return (
      <div className="edit-container">
        <p className="edit-title">Edit your profile:</p>
        <FormField
          label={"Username"}
          placeholder={"..."}
          onChange={(ti) => setUsername(ti)}
        />

        <FormField
          label={"Name"}
          placeholder={"..."}
          onChange={(dis) => setName(dis)}
        />


        <FormField
          type={"date"}
          label={"Birthday"}
          onChange={(date) => setBirthday(date)}
        />

        <FormField
            label={"Email"}
            placeholder={"..."}
            onChange={(dis) => setEmail(dis)}
        />

        <FormField
            label={"Biography"}
            placeholder={"..."}
            onChange={(dis) => setBiography(dis)}
        />

        {/*<div className="image-field">
          <div>Add Image:</div>
          <input type="file" onChange={handleChange}/>
          <img className={"img"} src={file}/>
        </div>*/}
        <div style={{ float: "right" }}>
          <MyButton
            onClick={() => updateEvent()}
            className={"SaveEvent"}
            style={{ width: "145px" }}
          >
            Save
          </MyButton>
        </div>
      </div>
    );
  }
};
export default UserEdit;
