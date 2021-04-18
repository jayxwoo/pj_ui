import { Component } from "react";
import { ThemeContext } from '../contexts/ThemeContext';


class ThemeToggle extends Component {
    render() {
        return (
            <ThemeContext.Consumer>
                {(context) => {
                    const { toggleTheme } = context;

                    return (
                        <button className="theme-toggle" onClick={ toggleTheme }>Toggle the theme</button>
                    )
                }}
            </ThemeContext.Consumer>
        );
    }
}

export default ThemeToggle;