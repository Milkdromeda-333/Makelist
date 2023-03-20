import { useState, useContext } from 'react'
import Home from './pages/Home';
import Auth from './pages/Auth';
import Navbar from './components/Navbar';
import { appContext } from "./context/App";

function App() {

  const { username } = useContext(appContext);
  console.log(username)

  const [isDarkModeActive, setIsDarkModeActive] = useState(true);
  
  const toggleDarkMode = () => {
    setIsDarkModeActive(prev => !prev);
  }

  return (
    <div className={`font-font ${isDarkModeActive ? 'dark' : null}`}>

      <Navbar isThemeDark={isDarkModeActive} toggleFunc={toggleDarkMode} />

      {!username ? <Auth isThemeDark={isDarkModeActive} /> : <Home isThemeDark={isDarkModeActive} />}
      
    </div>
  )
}

export default App
