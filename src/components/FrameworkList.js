import { Component } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { ThemeContext } from '../contexts/ThemeContext';

class FrameworkList extends Component {
    render() {
        return (
            <AuthContext.Consumer>
                {(authContext) => (
                    <ThemeContext.Consumer>
                        {(themeContext) => {
                            const { isAuthenticated, loggedInBgColor, loggedOutBgColor } = authContext;
                            const authBgColor = isAuthenticated ? loggedInBgColor : loggedOutBgColor;
                            const { isLightTheme, light, dark } = themeContext;
                            const theme = isLightTheme ? light : dark;

                            return (
                                <div className="framework-list" style={{ background: theme.bg }}>
                                    <ul className="frame-list-group">
                                        <li className="frame-list-item" style={{ background: theme.ui, color: theme.color }}>React</li>
                                        <li className="frame-list-item" style={{ background: theme.ui, color: theme.color }}>Vue</li>
                                        <li className="frame-list-item" style={{ background: theme.ui, color: theme.color }}>Angular</li>
                                    </ul>
                                    <p className="login-status" style={{ background: authBgColor }}>
                                        { isAuthenticated ? 'logged in' : 'logged out' }
                                    </p>
                                </div>
                            )
                        }}
                    </ThemeContext.Consumer>
                )}
            </AuthContext.Consumer>
        );
    }
}

export default FrameworkList;