import { useState } from "react";
import "../../styles/views/Login.scss";
import "../../styles/ui/MyButton.scss";
import { useNavigate } from "react-router";
import { apiLoggedIn, handleError } from "../../helpers/api";
import { LoginInput } from "../ui/StandardComponents/LoginInput";

const Login = () => {
  const [name, setName] = useState(null);
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [email, setEmail] = useState(null);
  const [biography, setBiography] = useState(
    "Hi all! I am new user on WeVent. Let's connect :)"
  );

  const [phase, setPhase] = useState("login");
  let content;
  const navigate = useNavigate();



  const doLogin = async () => {
      try {
          const requestBody = JSON.stringify({username , password});
          const response = await apiLoggedIn().post("/login", requestBody);
          //response is user returned from server

          // Store the token into the local storage.
          localStorage.setItem("token", response.headers.token);
          localStorage.setItem("userId", response.data.id);
          localStorage.setItem("username", response.data.username);
          localStorage.setItem("name", response.data.name);
          navigate("/home");
      } catch (error) {
          if(error.response.status === 400){
              alert(`Your username or password is wrong`)
          }
          else{
              alert(`Something went wrong during the login: \n${handleError(error)}`);
          }
      }
  };


    const loginPhase = () => {
        return (
            <div>
                <div className={"login-field"}>
                    <h1 className={"login-title"}>Login</h1>
                    <div className={"login-group"}>
                        <label className={"login-label"}>Username: </label>
                        <LoginInput
                            className={"login-input-field"}
                            type={"text"}
                            value={username}
                            onChange={(e) => setUsername(e)}
                        />
                    </div>
                    <div className={"login-group"}>
                        <label className={"login-label"}>Password: </label>
                        <LoginInput
                            className={"login-input-field pw"}
                            type={"password"}
                            value={password}
                            onChange={(p) => setPassword(p)}
                        />
                    </div>
                    <button
                        className={"button-register button-btn"}
                        onClick={() => setPhase("register")}
                    >Register
                    </button>
                    <button
                        className={"button-login button-btn"}
                        onClick={() => doLogin()}
                    >Login
                    </button>
                </div>
            </div>
        );
    }
  };

  const doRegister = async () => {
    try {
      const requestBody = JSON.stringify({
        name,
        username,
        email,
        password,
        biography,
      });
      const response = await apiLoggedIn().post("/users", requestBody);

      // Store the token into the local storage.
      localStorage.setItem("token", response.headers.token);
      localStorage.setItem("userId", response.data.id);
      localStorage.setItem("username", response.data.username);
      localStorage.setItem("name", response.data.name);
      navigate("/home");
    } catch (error) {
      alert(`Something went wrong during registering: \n${handleError(error)}`);
    }
  };

  

  function registerPhase() {
    return (
      <div>
        <div className={"login-field"}>
          <h1 className={"login-title"}>Register</h1>
          <div className={"login-group"}>
            <label className={"login-label"}>Username: </label>
            <LoginInput
              className={"login-input-field"}
              type={"text"}
              onChange={(un) => setUsername(un)}
            />
          </div>
          <div className={"login-group"}>
            <label className={"login-label"}>Password: </label>
            <LoginInput
              className={"login-input-field"}
              type={"password"}
              onChange={(pw) => setPassword(pw)}
            />
          </div>
          <div className={"login-group"}>
            <label className={"login-label"}>Name: </label>
            <LoginInput
              className={"login-input-field"}
              type={"text"}
              onChange={(na) => setName(na)}
            />
          </div>
          <div className={"login-group"}>
            <label className={"login-label"}>Email: </label>
            <LoginInput
              className={"login-input-field"}
              type={"text"}
              onChange={(ma) => setEmail(ma)}
            />
          </div>
          <button
            className={"button-register-reg button-btn"}
            onClick={() => doRegister()}
          >
            Register
          </button>
          <button
            className={"button-login-reg button-btn"}
            onClick={() => setPhase("login")}
          >
            Login
          </button>
        </div>
      </div>
    );
  }

  if (phase === "register") {
    content = registerPhase();
  } else {
    content = loginPhase();
  }

  return <>{content}</>;
};

export default Login;
