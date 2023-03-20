import { createContext } from "react"

const appContext = createContext(null);

function App({children}) {

    const toggleTheme = () => {
        setIsDarkThemeActive(prev => !prev);
    }

    return (
        <appContext.Provider value={{isDarkThemeActive, toggleTheme}}>
            {children}
        </appContext.Provider>
    )
}
