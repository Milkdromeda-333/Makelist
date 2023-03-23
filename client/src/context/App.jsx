import { createContext, useState, useEffect } from "react"

const appContext = createContext();

function AppProvider({children}) {

    const [user, setUser] = useState(localStorage.getItem('user') || {});
    const [userLists, setUserLists] = useState([]);

    const setUserListFunc = (data) => {
        setUserLists(data);
    }

    // useEffect(() => {
    //     // on load and the user has info in localStorage, set new user list.
    //     if (user) {
    //         setUserListFunc(user.lists);
    //     }
    // }, [user])

    return (
        <appContext.Provider value={{user, userLists, setUser, setUserLists, setUserListFunc}}>
            {children}
        </appContext.Provider>
    )
}

export {appContext, AppProvider}
