import { createContext, Component } from "react";

export const ThemeContext = createContext();

class ThemeContextProvider extends Component {
    state = {
        isLightTheme: true,
        light: { color: 'rgba(20, 20, 20, 1)', ui: 'rgba(235, 235, 235, 1)', bg: 'white' },
        dark: { color: 'white', ui: 'rgba(70, 70, 70, 1)', bg: 'rgba(20, 20, 20, 1)' }
    };
    toggleTheme = () => {
        this.setState({ isLightTheme: !this.state.isLightTheme });
    };

    render() {
        return (
            <ThemeContext.Provider value={{ ...this.state, toggleTheme: this.toggleTheme }}>
                {this.props.children}
            </ThemeContext.Provider>
        );
    }
}

export default ThemeContextProvider;