import { useContext, useState } from "react";
import { appContext } from "../context/App";
import { CiRedo } from "react-icons/ci";
import List from "../components/List";
import AddNewList from "../components/AddNewList";

export default function Home() {

    const { username, userLists } = useContext(appContext);

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

    const lists = userLists.map(list => (<List list={list} key={list.title} />));

    const toggleAddNewList = () => {
        setShowAddNewList(prev => !prev);
    }

    return (
        <main className="pt-20 p-4 min-h-[100vh] bg-white dark:bg-blue dark:text-white">

            <div className="
            center-row gap-2
            mb-4
            font-medium text-xl select-none
            md:text-3xl">

                <h1>Welcome, {username} </h1>
                <span className={shouldAnimate ? "animate-wiggle" : ""}>{currentEmoji}</span>

                <CiRedo
                    className="opacity-50 hover:opacity-100"
                    onClick={handleElementChange}
                />
                
            </div>

            {lists}

            <button
                className="
                    rounded-full
                    px-[10px] py-[5px] ml-auto
                    bg-apple-shade text-white
                    fixed bottom-5 right-4
                    hover:bg-[#7bc490]
                    dark:bg-dark-blue
                    dark:hover:bg-dark-blue-shade"
                
                onClick={toggleAddNewList}
            >add new list +</button>

            {showAddNewList && 
            
                <div className="">
                    <AddNewList closeFunc={setShowAddNewList} />
                </div>
            }

        </main>
    )
}