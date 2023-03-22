import { useState } from "react";
import { RxCaretDown, RxCaretUp } from "react-icons/rx";
import { MdOutlineStarOutline, MdOutlineStar } from "react-icons/md";
import { FiEdit2, FiTrash } from "react-icons/fi";
import Item from "./Item";
import AddNewItem from "./AddNewItem";
import { userAxios, updateHome } from "./utils/axios";

export default function List({ list, setUserLists }) {

    const [isListActive, setIsListActive] = useState(list.isPinned || false);
    const [isAddingNewItem, setIsAddingNewItem] = useState(false);
    const [isEditingTitle, setIsEditingTitle] = useState(false);

    const [listTitle, setListTitle] = useState("");

    const handleTitleChange = (e) => {
        const { value } = e.target;
        setListTitle(value);
    }

    const saveNewTitle = () => {
        const newList = {
            ...list,
            title: listTitle
        }
        userAxios.put("/lists/list", newList)
            .then(() => {
                updateHome(setUserLists);
            }).catch(err => {
                console.log(err);
            });
    }

    const toggleList = () => {
        setIsListActive(prev => !prev);
    }

    const toggleEditingTitle = () => {
        setIsEditingTitle(prev => !prev);
    }

    const items = list.listItems.map(item => <Item item={item} key={item.title} />);
    
    const togglePinned = () => {
        userAxios.put(`/lists/list/${list._id}/pin`)
            .then(() => {
                updateHome(setUserLists);
            }).catch(err => {
                console.log(err);
            });
    }

    const deleteList = () => {
        userAxios.delete(`/lists/${list._id}`)
            .then(() => {
                updateHome(setUserLists);
            }).catch(err => {
                console.log(err);
            });
    }

    return (
        <section
            className="
            relative
            w-full mb-4 p-[5px]
            bg-apple border-apple text-white
            dark:bg-blue-shade
            dark:border-white
            md:w-2/3 md:p-4"
        >

            <div
                className="center-row justify-between items-center text-2xl"
                onClick={toggleList}
            >
                { !isEditingTitle ?
                    <span>{list.name}</span> 
                    :
                    <input type="text" name="title" value={listTitle}
                        onChange={handleTitleChange}
                        className="
                        w-full mr-4 rounded bg-transparent border p-2 text-base"
                    />
                }

                { isListActive ? <RxCaretDown className="md:text-xl"/> : <RxCaretUp className="md:text-xl"/> }

            </div>

            {isListActive &&
                <div className="p-4 ">
                    {items}
                    {isAddingNewItem && <AddNewItem closeFunc={ setIsAddingNewItem } />}
                </div>
            }
            
            {/* options */}
            <div className="center-row gap-2 flex-wrap mt-4 max[275px]:justify-start">

                
                { !isEditingTitle ?
                    <>
                    <div onClick={togglePinned}>
                        {list.isPinned ?
                            <MdOutlineStar className="text-2xl hover:text-gray-200 dark:hover:text-gray-300" />
                            :
                            <MdOutlineStarOutline className="text-2xl hover:text-gray-200 dark:hover:text-gray-300" />
                    
                        }
                    </div>
                    <button onClick={toggleEditingTitle}>
                        <FiEdit2 className="hover:text-gray-200 dark:hover:text-gray-300" />
                    </button>
                    
                    <button onClick={deleteList}>
                            <FiTrash className="hover:text-red-500" />
                        </button>
                    </>
                    :
                    <>
                        <button
                            className="
                            rounded bg-apple-shade border w-9
                            dark:bg-dark-blue
                            hover:text-gray-200"
                            onClick={saveNewTitle}
                        >
                            save
                        </button>
                
                        <button
                            className="
                            bg-red-500 w-9
                            hover:bg-red-600"
                            onClick={()=>setIsEditingTitle(false)}
                        >
                            exit
                        </button>
                    </>
                }

                <button
                    className="
                    rounded-full
                    px-[10px] py-[5px] ml-auto
                    bg-apple-shade
                    hover:bg-[#7bc490]
                    dark:bg-dark-blue
                    dark:hover:bg-dark-blue-shade"

                    onClick={() => {
                        setIsAddingNewItem(true);
                        setIsListActive(true);
                    }}
                > add new item +
                </button>
                
            </div>
        </section>
    )
}