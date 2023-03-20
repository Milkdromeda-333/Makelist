import { useState } from "react";
import { RxCaretDown, RxCaretUp } from "react-icons/rx";
import Item from "./Item";

export default function List({ list }) {

    const [isListActive, setIsListActive] = useState(list.isPinned || false);

    const toggleList = () => {
        setIsListActive(prev => !prev);
    }

    const items = list.listItems.map(item => <Item item={item} key={item.title } />);

    return (
        <div
            className="
            w-full
            bg-apple border-apple text-white
            dark:bg-blue-shade
            dark:border-white
            md:w-2/3"
        >

            <div
                className="center-row justify-between items-center p-4 text-2xl"
                onClick={toggleList}
            >
                <span>{list.name}</span>

                { isListActive ? <RxCaretDown className="md:text-xl"/> : <RxCaretUp className="md:text-xl"/> }

            </div>

            {isListActive &&
                <div className="p-4 ">
                {items}
            </div>}
        </div>
    )
}