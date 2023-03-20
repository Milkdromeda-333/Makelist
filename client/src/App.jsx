import { useState } from 'react'
import Home from './pages/Home';
import Auth from './pages/Auth';
import Navbar from './components/Navbar';
import './styles.css'

function App() {

  const [isDarkModeActive, setIsDarkModeActive] = useState(true);
  
  const toggleDarkMode = () => {
    setIsDarkModeActive(prev => !prev);
  }

  return (
    <div className={`font-font ${isDarkModeActive ? 'dark' : null}`}>
      <Navbar isThemeDark={isDarkModeActive} toggleFunc={toggleDarkMode} />
      <Auth isThemeDark={isDarkModeActive} />
    </div>
  )
}

export default App
