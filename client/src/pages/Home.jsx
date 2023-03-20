import { useContext, useState } from "react";
import { appContext } from "../context/App";
import { CiRedo } from "react-icons/ci";
import List from "../components/List";

export default function Home() {

    const { username, userLists } = useContext(appContext);

    const [shouldAnimate, setShouldAnimate] = useState(true);

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

    const lists = userLists.map(list => (<List list={list} key={list.title} />))

    return (
        <main className="pt-12 m-4 mt-6">

            <div className="
            center-row gap-2
            mb-4
            font-medium text-xl select-none
            md:text3xl">

                <h1>Welcome, {username} </h1>
                <span className={shouldAnimate ? "animate-wiggle" : ""}>{currentEmoji}</span>

                <CiRedo
                    className="opacity-50 hover:opacity-100"
                    onClick={handleElementChange}
                />
                
            </div>

            {lists}

        </main>
    )
}