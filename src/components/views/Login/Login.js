import { FormField } from "../../ui/StandardComponents/FormField";
import { PasswordField } from "../../ui/StandardComponents/PasswordField";
import { useState } from "react";
import "../../../styles/views/Login.scss";
import { MyButton } from "../../ui/StandardComponents/MyButton";
import "../../../styles/ui/MyButton.scss";
import { useNavigate } from "react-router";
import { apiLoggedIn, handleError } from "../../../helpers/api";

const Login = (props) => {
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);

  const navigate = useNavigate();

  const doLogin = async () => {
    try {
      const requestBody = JSON.stringify({ username, password });
      const response = await apiLoggedIn().post("/login", requestBody);
      //response is user returned from server

      // Store the token into the local storage.
      localStorage.setItem("token", response.headers.token);
      localStorage.setItem("userId", response.data.id);
      localStorage.setItem("username", response.data.username);
      localStorage.setItem("name", response.data.name);
      navigate("/home");
    } catch (error) {
      alert(`Something went wrong during the login: \n${handleError(error)}`);
    }
  };

  //TODO: Style
  return (
    <div className={"marginClass mx-auto w-50"}>
      <div className={"col-12 text-center login-text py-1 mb-3"}>
        Login to access your Account.
      </div>
      <div className={"col-12 text-center py-1"}>
        <FormField
          label="Username:"
          placeholder={"enter username"}
          onChange={(un) => setUsername(un)}
        />
      </div>
      <div className={"col-12 text-center py-1"}>
        <PasswordField label="Password:" onChange={(pw) => setPassword(pw)} />
      </div>
      <div className={"col-12 text-center pt-1 pb-3 mt-3"}>
        <MyButton className="w-50" onClick={() => doLogin()}>
          Login
        </MyButton>
      </div>
      <hr className={"mx-5"} />
    </div>
  );
};

export default Login;