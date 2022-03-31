import logo from './../../styles/logo.svg';
import "./../../styles/App.css"
import {FormField} from "../ui/FormField";
import {PasswordField} from "../ui/PasswordField";

function Logo() {
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                    Group 23
                </p>
                <FormField>
                    label="Username"
                </FormField>
                <PasswordField>
                    label="Password"
                </PasswordField>
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React
                </a>
            </header>
        </div>
    );
}

export default Logo;