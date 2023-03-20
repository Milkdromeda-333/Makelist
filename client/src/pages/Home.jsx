import { useContext, useState } from "react";
import { appContext } from "../context/App";
import { CiRedo } from "react-icons/ci";

export default function Home() {
    const { username, userLists } = useContext(appContext);


    const emoji = () => {
        const emojis = ["😀", "🤠", "😊", "🔥", "😎", "😇", "🤭", "😏", "🥳", "😺", "🙏", "👋", "🙋"];
        const index = Math.floor(Math.random() * emojis.length);
        return emojis[index];
    }

    const [currentEmoji, setCurrentEmoji] = useState(emoji());

    return (
        <main className="pt-12 m-4">

            <div className="center-row font-medium text-xl md:text3xl">

                <h1>Welcome, {username} {currentEmoji} </h1>

                <CiRedo
                    className="opacity-60 hover:opacity-100"
                    onClick={() => setCurrentEmoji(emoji())}
                />
                
            </div>
        </main>
    )
}