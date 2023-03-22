import { createContext, useState, useEffect } from "react"

const appContext = createContext();

function AppProvider({children}) {

    const [user, setUser] = useState(localStorage.getItem('user') || {});
    const [userLists, setUserLists] = useState([]);

    useEffect(() => {
        if (user) {
            setUserLists(user.listItems)
        }
    }, [user])

    return (
        <appContext.Provider value={{user, userLists, setUser}}>
            {children}
        </appContext.Provider>
    )
}

export {appContext, AppProvider}
