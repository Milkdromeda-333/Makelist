import { useState, useEffect, useRef } from "react";
import { MdOutlineStarOutline, MdOutlineStar } from "react-icons/md";
import { FiEdit2, FiTrash } from "react-icons/fi";
import { CiRedo } from "react-icons/ci";
import {SlArrowDown, SlArrowUp} from "react-icons/sl"
import Item from "./Item";
import AddNewItem from "./AddNewItem";
import { userAxios, updateHome } from "./utils/axios";

export default function List({ list, setUserLists }) {

    const [isListActive, setIsListActive] = useState(list.isPinned);
    const [isAddingNewItem, setIsAddingNewItem] = useState(false);
    const [isEditingTitle, setIsEditingTitle] = useState(false);
    const [screenWidth, setScreenWidth] = useState(window.matchMedia('(max-width: 768px)'));


    const [listTitle, setListTitle] = useState(list.name);

    const handleTitleChange = (e) => {
        const { value } = e.target;
        setListTitle(value);
    }

    const saveNewTitle = () => {
        const newList = {
            ...list,
            name: listTitle
        }
        userAxios.put("api/lists/list", newList)
            .then(() => {
                updateHome(setUserLists);
            }).catch(err => {
                console.log(err);
            });
        toggleEditingTitle();
    }

    const toggleList = () => {
        setIsListActive(prev => !prev);
    }

    const toggleEditingTitle = () => {
        setIsEditingTitle(prev => !prev);
    }

    const items = () => {
        if (list.listItems.length) {
            return list.listItems.map(item => <Item item={item} setUserLists={setUserLists} listId={list._id} key={item.title} />);
        }
        return "No items here.."
    }
    
    const togglePinned = () => {
        userAxios.put(`api/lists/list/${list._id}/pin`)
            .then(() => {
                updateHome(setUserLists);
            }).catch(err => {
                console.log(err);
            });
    }

    const deleteList = () => {
        userAxios.delete(`api/lists/${list._id}`)
            .then(() => {
                updateHome(setUserLists);
            }).catch(err => {
                console.log(err);
            });
    }

    const resetRepeats = () => {
        userAxios.put(`api/lists/${list._id}/reset`)
            .then(() => {
                updateHome(setUserLists);
            }).catch(err => console.log(err));
    }

    const focusedInput = useRef(null);

    useEffect(() => {
        if (focusedInput.current) {
            focusedInput.current.focus();
        }
    }, [isEditingTitle])

    return (
        <section
            className="
            relative
            w-full my-4 p-2 rounded
            bg-pink border-pink text-plum
            dark:bg-blue-shade
            dark:text-white
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
                        w-full mr-4 rounded 
                        bg-white border p-[2px] pl-[4px] text-base  text-plum"
                        ref={focusedInput}
                    />
                }
                { isListActive ? <SlArrowUp className="md:text-base"/> : <SlArrowDown className="md:text-base"/> }
            </div>
            
            {/* items  */}
            {isListActive &&
                <div className="p-2 ">
                    {items()}
                    {isAddingNewItem && <AddNewItem closeFunc={ setIsAddingNewItem } listId={list._id} setUserLists={setUserLists} />}
                </div>
            }
            
            {/* options */}
            <div className="center-row gap-2 flex-wrap mt-4 max[275px]:justify-start">

                
                { !isEditingTitle ?
                    <>
                        <div onClick={togglePinned}>
                            {list.isPinned ?
                                <MdOutlineStar
                                    className="text-2xl opacity-50 
                                    hover:text-plum hover:opacity-100
                                    dark:hover:text-gray-300"
                                />
                                :
                                <MdOutlineStarOutline
                                    className="text-2xl opacity-50 
                                    hover:text-plum hover:opacity-100
                                    dark:hover:text-gray-300"
                                />
                        
                            }
                        </div>
                        
                        <button onClick={toggleEditingTitle}>
                            <FiEdit2 className="opacity-50 hover:opacity-100" />
                        </button>
                        
                        <button onClick={deleteList}>
                                <FiTrash className="opacity-50 hover:opacity-100 hover:text-red-500" />
                        </button>

                        <button className="relative"  onClick={resetRepeats}>
                            { !screenWidth.matches ? <span
                                className="
                                md:after:absolute md:after:left-0 md:after:top-0 md:after:content-['reset?'] md:after:opacity-0
                                after:hover:transition-all ease-in after:hover:opacity-100 hover:after:left-full"
                            >
                                <CiRedo className="opacity-50 text-2xl hover:opacity-100"/>
                            </span>
                            : <span className="opacity-50 active:opacity-100">reset</span> 
                            }
                        </button>
                    </>
                    :
                    <>
                        <button
                            className="
                            rounded border w-9
                            bg-plum text-white
                            dark:bg-dark-blue
                            hover:text-gray-200"
                            onClick={saveNewTitle}
                        >
                            save
                        </button>
                
                        <button
                            className="
                            bg-red-500 text-white w-9 rounded
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
                    bg-plum text-white
                    hover:bg-plum-shade
                    dark:bg-dark-blue dark:text-white
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