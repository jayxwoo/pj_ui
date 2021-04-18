import FrameworkList from './components/FrameworkList';
import Navbar from './components/Navbar';
import ThemeToggle from './components/ThemeToggle';
import AuthToggle from './components/AuthToggle'
import ThemeContextProvider from './contexts/ThemeContext';
import AuthContextProvider from './contexts/AuthContext';

function App() {
  return (
    <div className="App">
      <ThemeContextProvider>
        <AuthContextProvider>
          <Navbar />
          <FrameworkList />
          <div className="toggle-cont">
            <ThemeToggle />
            <AuthToggle />
          </div>
        </AuthContextProvider>
      </ThemeContextProvider>
    </div>
  );
}

export default App;
