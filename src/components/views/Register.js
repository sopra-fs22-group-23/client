import {useState} from "react";
import {useNavigate} from "react-router";
import {api, apiLoggedIn, handleError} from "../../helpers/api";
import {FormField} from "../ui/FormField";
import {PasswordField} from "../ui/PasswordField";
import {MyButton} from "../ui/MyButton";

const Register = (props) => {
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const navigate = useNavigate();

    const doRegister = async () => {
        try {
            const requestBody = JSON.stringify({username, password});
            const response = await apiLoggedIn().post('/users', requestBody);

            // Store the token into the local storage.
            localStorage.setItem('token', response.headers.token);
            localStorage.setItem('userId', response.data.id);
            navigate('/home')

        } catch (error) {
            alert(`Something went wrong during registering: \n${handleError(error)}`);
        }
    };

    return (
        <div className={"w-25 mx-auto"}>
            <div className={"col-12 text-center login-text pt-3 pb-1 mb-3"}>
                Register with a few steps.
            </div>
            <div className={"col-12 text-center py-1"}>
                <FormField onChange={(un) => setUsername(un)} />
            </div>
            <div className={"col-12 text-center py-1"}>
                <PasswordField onChange={(pw) => setPassword(pw)} />
            </div>
            <div className={"col-12 text-center py-1 mt-3"}>
                <MyButton onClick={() => doRegister()}>Register</MyButton>
            </div>
        </div>
    );

}
export default Register;