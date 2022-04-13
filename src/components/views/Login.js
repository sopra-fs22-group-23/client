import { FormField } from "../ui/FormField";
import { PasswordField } from "../ui/PasswordField";
import { useState } from "react";
import "./../../styles/views/Login.scss";
import { MyButton } from "../ui/MyButton";
import { useNavigate } from "react-router";
import { api, apiLoggedIn, handleError } from "../../helpers/api";

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
      navigate("/home");
    } catch (error) {
      alert(`Something went wrong during the login: \n${handleError(error)}`);
    }
  };

  return (
    <div className={"marginClass mx-auto w-25"}>
      <div className={"col-12 text-center login-text py-1 mb-3"}>
        Login to access your Account.
      </div>
      <div className={"col-12 text-center py-1"}>
        <FormField onChange={(un) => setUsername(un)} />
      </div>
      <div className={"col-12 text-center py-1"}>
        <PasswordField onChange={(pw) => setPassword(pw)} />
      </div>
      <div className={"col-12 text-center pt-1 pb-3 mt-3"}>
        <MyButton onClick={() => doLogin()}>Login</MyButton>
      </div>
      <hr className={"mx-5"} />
    </div>
  );
};

export default Login;
