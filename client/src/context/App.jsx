import { createContext, useEffect, useState } from "react"

const appContext = createContext();

function AppProvider({children}) {

    const [user, setUser] = useState(localStorage.getItem('user') || "");
    const [userLists, setUserLists] = useState([]);


    return (
        <appContext.Provider
            value={{ user, userLists, setUser, setUserLists}}
        >
            {children}
        </appContext.Provider>
    )
}

export {appContext, AppProvider}
