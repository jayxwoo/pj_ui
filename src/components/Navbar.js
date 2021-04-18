import { Component } from "react";
import { ThemeContext } from '../contexts/ThemeContext';

class Navbar extends Component {
    static contextType = ThemeContext;

    render() { 
        const { isLightTheme, light, dark } = this.context;
        const theme = isLightTheme ? light : dark;

        return (
            <nav className="navbar" style={{ background: theme.ui, color: theme.color }}>
                <h1 className="app-title">Dark / Light</h1>
                <ul className="menu-group">
                    <li className="menu-item">Home</li>
                    <li className="menu-item">About</li>
                    <li className="menu-item">Contact</li>
                </ul>
            </nav>
        );
    }
}
 
export default Navbar;