import { useState, useContext, useEffect } from 'react'
import Home from './pages/Home';
import Auth from './pages/Auth';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { appContext } from "./context/App";

function App() {

  const { setUser } = useContext(appContext);

  const [isDarkModeActive, setIsDarkModeActive] = useState(true);
  
  const toggleDarkMode = () => {
    setIsDarkModeActive(prev => !prev);
  }


  return (
    <div className={`font-font ${isDarkModeActive ? 'dark' : ""}`}>

      <div className="grid grid-cols-1 min-h-screen items-stretch bg-peach text-dark-blue dark:bg-blue dark:text-white"
      >

        <Navbar isThemeDark={isDarkModeActive} toggleFunc={toggleDarkMode} setUser={setUser} />

        {
          !localStorage.getItem('token') ?
            <Auth isThemeDark={isDarkModeActive} />
            : <Home isThemeDark={isDarkModeActive} />
        }
        
        <Footer />

      </div>
      
    </div>
  )
}

export default App
