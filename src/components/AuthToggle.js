import { Component } from "react";
import { AuthContext } from "../contexts/AuthContext";


class AuthToggle extends Component {
    render() {
        return (
            <AuthContext.Consumer>
                {(context) => {
                    const { isAuthenticated, toggleAuth } = context;

                    return (
                        <button className="auth-toggle toggle-btn" onClick={ toggleAuth }>
                            { isAuthenticated ? 'Log out' : 'Log in' }
                        </button>
                    )
                }}
            </AuthContext.Consumer>
        );
    }
}

export default AuthToggle;