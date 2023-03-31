import { useState, useContext, useEffect } from 'react'
import Home from './pages/Home';
import Auth from './pages/Auth';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { appContext } from "./context/App";

function App() {

  const { setUser } = useContext(appContext);
 
  const [prefersDarkTheme, setPrefersDarkTheme] = useState(localStorage.getItem("prefersDarkTheme") !== "null" || false);

  
    const toggleDarkMode = () => {
        setPrefersDarkTheme(prev => !prev)
    }

  useEffect(() => {
    localStorage.setItem("prefersDarkTheme", prefersDarkTheme)
  }, [prefersDarkTheme])
  
  return (
    <div className={`font-font ${prefersDarkTheme ? "dark" : ""}`}>

      <div className="grid grid-cols-1 min-h-screen items-stretch bg-peach text-dark-blue dark:bg-blue dark:text-white"
      >

        <Navbar setUser={setUser} prefersDarkTheme={prefersDarkTheme} toggleDarkMode={toggleDarkMode} />

        {
          !localStorage.getItem('token') ?
            <Auth prefersDarkTheme={prefersDarkTheme} />
            : <Home prefersDarkTheme={prefersDarkTheme} />
        }
        
        <Footer />

      </div>
      
    </div>
  )
}

export default App
