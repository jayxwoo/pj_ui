import { Component, createContext } from "react";

export const AuthContext = createContext();

class AuthContextProvider extends Component {
    state = {
        isAuthenticated: false,
        loggedInBgColor: 'rgba(0, 191, 96, 0.5)',
        loggedOutBgColor: 'rgba(214, 46, 0, 0.5)'
    };
    toggleAuth = () => {
        this.setState({ isAuthenticated: !this.state.isAuthenticated });
    };

    render() {
        return (
            <AuthContext.Provider value={{ ...this.state, toggleAuth: this.toggleAuth }}>
                {this.props.children}
            </AuthContext.Provider>
        );
    }
}

export default AuthContextProvider;