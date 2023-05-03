import { useContext, useEffect, useState } from "react";
import { appContext } from "../context/App";
import { CiRedo } from "react-icons/ci";
import List from "../components/List";
import AddNewList from "../components/AddNewList";
import { updateHome } from "../components/utils/axios";

export default function Home() {

    const { user, userLists, setUserLists, setUser } = useContext(appContext);

    // i am holding this in state for the emoji animation because when the emoji's change it does not re-animate.
    const [shouldAnimate, setShouldAnimate] = useState(true);
    const [showAddNewList, setShowAddNewList] = useState(false);

    const handleElementChange = () => {

        setCurrentEmoji(emoji());

        setShouldAnimate(true);

        setTimeout(() => {
            setShouldAnimate(false);
        }, 200);
    };

    const emoji = () => {
        const emojis = ["😀", "🤠", "😊", "🔥", "😎", "😇", "🤭", "😏", "🥳", "😺", "🙏", "👋", "🙋", "😆", "🎂", "🍰", "🐀", "🐹", "🐣", "🦉", "🐸", "🐬", "🐠", "🐡", "🦋", "🐞", "🌻", "🌹", "🌍", "🍀", "🍁", "🍄", "🌛", "🌞", "⭐", "⛈️", "🌤️", "🌊", "✨"];
        const index = Math.floor(Math.random() * emojis.length);
        return emojis[index]
    }

    const [currentEmoji, setCurrentEmoji] = useState(emoji());

    const lists = () => {
        if (userLists?.length) {
           return userLists?.map(list => (<List list={list} setUserLists={setUserLists}  key={list.name} />));
        }

        return <span>Sorry. You have no lists yet.</span>;
    }

    const toggleAddNewList = () => {
        setShowAddNewList(prev => !prev);
    }

    useEffect(() => {
        updateHome(setUserLists);
        setUser(JSON.parse(localStorage.getItem('user')));
    }, []);

    return (
        <main className="h-full pt-20 p-4">

            <div className="
            center-row gap-2 mb-2
            font-medium text-xl select-none text-plum
            dark:text-white
            md:text-3xl">

                <h1 className="[text-shadow:_0_1px_0_rgb(0_0_0_/_40%)]  font-bold">
                    Welcome, {user.username}
                </h1>
                <span className={shouldAnimate ? "animate-wiggle" : ""}>{currentEmoji}</span>

                <CiRedo
                    className="opacity-50 cursor-pointer hover:opacity-100"
                    onClick={handleElementChange}
                />
                
            </div>
            
            {/* mobile only */}
            <button
            className="
                block md:hidden
                rounded-full
                px-[10px] py-[5px] mr-auto mb-4
                bg-plum  text-white
                hover:bg-plum-shade
                dark:bg-dark-blue
                dark:hover:bg-dark-blue-shade"
            onClick={toggleAddNewList}
            > add new list +</button>

            { lists() }

            {/* wide-screen only */}
            <button
                className="
                    hidden md:block
                    rounded-full
                    px-[10px] py-[5px] ml-auto
                    bg-plum  text-white
                    fixed bottom-12 right-4
                    hover:bg-plum-shade
                    dark:bg-dark-blue
                    dark:hover:bg-dark-blue-shade"
                
                onClick={toggleAddNewList}
            >add new list +</button>

            {showAddNewList && 
            
                <div>
                    <AddNewList closeFunc={setShowAddNewList} setUserLists={setUserLists} />
                </div>
            }

        </main>
    )
}