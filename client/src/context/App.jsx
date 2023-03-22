import { createContext, useState, useEffect } from "react"

const appContext = createContext();

function AppProvider({children}) {

    const [user, setUser] = useState(localStorage.getItem('user') || {});
    const [userLists, setUserLists] = useState([]);

    useEffect(() => {
        // on load and the user has info in localStorage, set new user list.
        if (user) {
            setUserLists(user.lists);
        }
    }, [user])

    return (
        <appContext.Provider value={{user, userLists, setUser, setUserLists}}>
            {children}
        </appContext.Provider>
    )
}

export {appContext, AppProvider}
