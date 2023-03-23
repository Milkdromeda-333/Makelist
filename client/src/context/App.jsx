import { createContext, useState } from "react"

const appContext = createContext();

function AppProvider({children}) {

    const [user, setUser] = useState(localStorage.getItem('user') || "");
    const [userLists, setUserLists] = useState([]);

    const setUserListFunc = (data) => {
        setUserLists(data);
    }

    return (
        <appContext.Provider value={{user, userLists, setUser, setUserLists, setUserListFunc}}>
            {children}
        </appContext.Provider>
    )
}

export {appContext, AppProvider}
