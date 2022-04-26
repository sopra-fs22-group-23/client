import { useState } from "react";
import { useNavigate } from "react-router";
import { apiLoggedIn, handleError } from "../../helpers/api";
import { FormField } from "../ui/FormField";
import { PasswordField } from "../ui/PasswordField";
import { MyButton } from "../ui/MyButton";
import "../../styles/ui/MyButton.scss";
import "../../styles/ui/FormField.scss";

const Register = (props) => {
  const [name, setName] = useState(null);
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [email, setEmail] = useState(null);
  const navigate = useNavigate();

  const doRegister = async () => {
    try {
      const requestBody = JSON.stringify({ name, username, email, password });
      const response = await apiLoggedIn().post("/users", requestBody);

      // Store the token into the local storage.
      localStorage.setItem("token", response.headers.token);
      localStorage.setItem("userId", response.data.id);
      navigate("/home");
    } catch (error) {
      alert(`Something went wrong during registering: \n${handleError(error)}`);
    }
  };

  //TODO: Style
  return (
    <div className={"w-40 mx-auto"}>
      <div className={"col-12 text-center login-text pt-3 pb-1 mb-3"}>
        Register with a few steps.
      </div>
      <div className={"col-12 text-center py-1"}>
        <FormField
          label="Name:"
          placeholder={"enter name"}
          onChange={(na) => setName(na)}
        />
      </div>
      <div className={"col-12 text-center py-1"}>
        <FormField
          label="Username:"
          placeholder={"enter username"}
          onChange={(un) => setUsername(un)}
        />
      </div>
      <div className={"col-12 text-center py-1"}>
        <FormField
          label="Email:"
          placeholder={"enter email"}
          onChange={(em) => setEmail(em)}
        />
      </div>
      <div className={"col-12 text-center py-1"}>
        <PasswordField label="Password:" onChange={(pw) => setPassword(pw)} />
      </div>
      <div className={"col-12 text-center py-1 mt-3"}>
        <MyButton className="w-25" onClick={() => doRegister()}>
          Register
        </MyButton>
      </div>
    </div>
  );
};
export default Register;
