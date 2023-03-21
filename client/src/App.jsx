import { useState, useContext } from 'react'
import Home from './pages/Home';
import Auth from './pages/Auth';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { appContext } from "./context/App";

function App() {

  const { username, setUsername } = useContext(appContext);

  const [isDarkModeActive, setIsDarkModeActive] = useState(true);
  
  const toggleDarkMode = () => {
    setIsDarkModeActive(prev => !prev);
  }

  return (
    <div className={`font-font ${isDarkModeActive ? 'dark' : null}`}>

      <Navbar isThemeDark={isDarkModeActive} toggleFunc={toggleDarkMode} setUsername={setUsername} />

      {!username ? <Auth isThemeDark={isDarkModeActive} /> : <Home isThemeDark={isDarkModeActive} />}

      <Footer />
      
    </div>
  )
}

export default App
