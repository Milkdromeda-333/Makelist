import { useState } from "react";
import { RxCaretDown, RxCaretUp } from "react-icons/rx";

export default function List({ list }) {
    const [isListActive, setIsListActive] = useState(list.isPinned || false);

    const toggleList = () => {
        setIsListActive(prev => !prev);
    }

    return (
        <div
            className="
            w-full border
            border-apple
            dark:border-dark-blue
            md:w-2/3"
        >

            <div
                className="center-row justify-between items-center p-4"
                onClick={toggleList}
            >
                <span>{list.name}</span>

                { isListActive ? <RxCaretDown className="md:text-xl"/> : <RxCaretUp className="md:text-xl"/> }

            </div>

            <div className=""></div>
        </div>
    )
}