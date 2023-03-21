import { createContext, useState } from "react"

const appContext = createContext();

function AppProvider({children}) {

    const [username, setUsername] = useState("Anjupit3r");
    const [userLists, setUserLists] = useState([{
        user: "4f441f55f",
        listItems: [{
            title: "Apples for david",
            description: "He wants 3 large red apples.",
            isRepeated: true,
            isCompleted: false
        },
        {
            title: "Flour",
            description: "I may make a strawberry cake for Riley's prom night so get strwberries and see who all is attending.",
            isRepeated: false,
            isCompleted: true
        }
        ],
        name: "Grocery items",
        isPinned: true
    }]);

    return (
        <appContext.Provider value={{username, userLists, setUsername}}>
            {children}
        </appContext.Provider>
    )
}

export {appContext, AppProvider}
