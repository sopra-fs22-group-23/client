import {FormField} from "../ui/FormField";
import {PasswordField} from "../ui/PasswordField";
import {useState} from "react";
import "./../../styles/views/Login.scss"
import {MyButton} from "../ui/MyButton";
import {useNavigate} from "react-router";

const Login = props => {
    const [password, setPassword] = useState(null);
    const [username, setUsername] = useState(null);
    const navigate = useNavigate();

    const doLogin = async () => {
        console.log("Loggin in!")
        navigate("/home");
    };
    const doRegister = async () => {
        console.log("Registering!")
    };

    return (
        <div className={"BackgroundImage align-content-center min-vh-100 pt-5"}>
            <div className={"LoginField col-4 offset-4"}>
                <div className={"bg-light rounded-3 my-3 py-5 mx-3"}>
                    <div className={"row justify-content-center"}>
                        <div className={"col-12 text-center login-text py-1 mb-3"}>
                            Login to access your Account.
                        </div>
                        <div className={"col-12 text-center py-1"}>
                            <FormField
                                onChange={un => setUsername(un)}
                            />
                        </div>
                        <div className={"col-12 text-center py-1"}>
                            <PasswordField
                                onChange={pw => setPassword(pw)}
                            />
                        </div>
                        <div className={"col-12 text-center pt-1 pb-3 mt-3"}>
                            <MyButton
                                onClick={() => doLogin()}>
                                Login
                            </MyButton>
                        </div>
                    </div>

                    <hr className={"mx-5"}/>

                    <div className={"row"}>
                        <div className={"col-12 text-center login-text pt-3 pb-1 mb-3"}>
                            Register with a few steps.
                        </div>
                        <div className={"col-12 text-center py-1"}>
                            <FormField
                                onChange={un => setUsername(un)}
                            />
                        </div>
                        <div className={"col-12 text-center py-1"}>
                            <PasswordField
                                onChange={pw => setPassword(pw)}
                            />
                        </div>
                        <div className={"col-12 text-center py-1 mt-3"}>
                            <MyButton
                                onClick={() => doRegister()}>
                                Register
                            </MyButton>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Login;