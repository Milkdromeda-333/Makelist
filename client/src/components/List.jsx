import { useState } from "react";
import { RxCaretDown, RxCaretUp } from "react-icons/rx";
import { MdOutlineStarOutline, MdOutlineStar } from "react-icons/md";
import { FiEdit2, FiTrash } from "react-icons/fi";
import Item from "./Item";
import AddNewItem from "./AddNewItem";

export default function List({ list }) {

    const [isListActive, setIsListActive] = useState(list.isPinned || false);
    const [isAddingNewItem, setIsAddingNewItem] = useState(false);

    const toggleList = () => {
        setIsListActive(prev => !prev);
    }

    const items = list.listItems.map(item => <Item item={item} key={item.title } />);

    return (
        <section
            className="
            w-full  p-4
            bg-apple border-apple text-white
            dark:bg-blue-shade
            dark:border-white
            md:w-2/3"
        >

            <div
                className="center-row justify-between items-center text-2xl"
                onClick={toggleList}
            >
                <span>{list.name}</span>

                { isListActive ? <RxCaretDown className="md:text-xl"/> : <RxCaretUp className="md:text-xl"/> }

            </div>

            {isListActive &&
                <div className="p-4 ">
                    {items}
                    {isAddingNewItem && <AddNewItem closeFunc={ setIsAddingNewItem } />}
                </div>
            }
            
            {/* options */}
            <div className="center-row gap-2 mt-4">
                {list.isPinned ?
                    <MdOutlineStar className="text-2xl hover:text-gray-200 dark:hover:text-gray-300" />
                    :
                    <MdOutlineStarOutline className="text-2xl hover:text-gray-200 dark:hover:text-gray-300" />
                }

                <FiEdit2 className="hover:text-gray-200 dark:hover:text-gray-300" />
                
                <button>
                        <FiTrash className="hover:text-red-500" />
                </button>

                <button
                    className="
                    rounded-full
                    px-[10px] py-[5px] ml-auto
                    bg-apple
                    hover:bg-apple
                    dark:bg-dark-blue
                    dark:hover:bg-dark-blue-shade"

                    onClick={()=>setIsAddingNewItem(true)}
                > add new item +
                </button>
                
            </div>


        </section>
    )
}