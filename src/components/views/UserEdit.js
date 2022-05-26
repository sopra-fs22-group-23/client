import React, { useEffect, useRef, useState } from "react";
import { FormField } from "../ui/StandardComponents/FormField";
import { apiLoggedIn, handleError } from "../../helpers/api";
import { MyButton } from "../ui/StandardComponents/MyButton";
import { useNavigate } from "react-router";
import "../../styles/views/EditEvent.scss";
import "../../styles/views/NewEvent.scss";

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

  function handleUpload(){
    const formData = new FormData();
    formData.append('file', file);
    formData.append('test', "message");
    for (var pair of formData.entries()) {
      console.log(pair[0]+ ', ' + pair[1]);
    }
    const response = apiLoggedIn().post(`/users/${userId}/image`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  }

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
      handleUpload();
      window.location.reload();
    } catch (error) {
      alert(
        `Something went wrong during user update: \n${handleError(error)}`
      );
    }
  };

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
          label={"Date"}
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

        <div className="image-field">
          <div className={""}>Add Image:</div>
          <input type="file" onChange={handleChange}/>
          <img className={"img"} src={file}/>
        </div>

        <div>
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
};
export default UserEdit;
