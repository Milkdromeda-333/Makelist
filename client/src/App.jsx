import { useState } from 'react'
import Home from './pages/Home';
import Auth from './pages/Auth';
import Navbar from './components/Navbar';
import './styles.css'

function App() {

  const [isDarkModeActive, setIsDarkModeActive] = useState(localStorage.getItem('theme') || true);

  const toggleDarkMode = () => {
    // if (isDarkModeActive) {
    //   setIsDarkModeActive(prev => !prev);
    //   localStorage.setItem('theme', isDarkModeActive);
    // } else {
    // }
    setIsDarkModeActive(prev => !prev);
    localStorage.setItem('theme', isDarkModeActive);
    console.log(localStorage.getItem('theme'))
  } 

  return (
    <div className={`font-font ${isDarkModeActive ? 'dark' : null}`}>
      <Navbar isThemeDark={isDarkModeActive} toggleFunc={toggleDarkMode} />
      <Auth isThemeDark={isDarkModeActive} />
    </div>
  )
}

export default App
