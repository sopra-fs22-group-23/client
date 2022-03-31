import {FormField} from "../ui/FormField";
import {PasswordField} from "../ui/PasswordField";

const Login = props => {
    return (
        <div>
            <div>
                <div>
                    <h2>
                        Login
                    </h2>
                </div>
                <FormField
                    label="Username"
                />
                <PasswordField
                    label="Password"/>
                <div>
                    <button>
                        Login
                    </button>
                </div>
            </div>

            <div>
                <div>
                    <div>
                        <h2>
                            Register
                        </h2>
                    </div>
                    <FormField
                        label="Username"
                    />
                    <PasswordField
                        label="Password"
                    />
                    <div>
                        <button>
                            Register
                        </button>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Login;