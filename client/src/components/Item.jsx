import { useEffect, useState, useRef } from "react";
import { FiEdit2, FiTrash } from "react-icons/fi";
import { updateHome, userAxios } from "./utils/axios";

export default function Item({ item, listId, setUserLists, setIsItemLoading }) {

    const [isEditing, setIsEditing] = useState(false);

    const [editedItem, setEditedItem] = useState(item);

    const [isChecked, setIsChecked] = useState(item.isCompleted);

    const handleChangeItem = (e) => {
        const { value, name } = e.target;

        if (name === "isRepeated") {
            setEditedItem(prev => ({
                ...prev,
                isRepeated: !prev.isRepeated
            }));
        } else {
            setEditedItem(prev => ({
            ...prev,
            title: value
        }));
        }
    }
    
    const deleteItem = (e) => {
        e.stopPropagation();
        userAxios.delete(`api/lists/list/${listId}/item/${item._id}`)
            .then(() => {
                updateHome(setUserLists);
            }).catch(err => console.log(err));
    }

    const saveEdit = () => {
        setIsItemLoading(true);
        userAxios.put(`api/lists/list/${listId}/item/${item._id}/update`, editedItem)
            .then(() => {
                setIsItemLoading(false);
                updateHome(setUserLists);
                setIsEditing(false);
            }).catch(err => {
                setIsItemLoading(false);
                console.log(err);
            });
        setIsEditing(false);
    }

    const checkItem = (e, manualIsChecked) => {
        if (e) {
            const { checked } = e.target;

             if (checked === false) {

            setIsChecked(false);
            userAxios.put(`api/lists/list/${listId}/item/${item._id}/update`,
                { ...item, isCompleted: false })
                .then(() => {
                    updateHome(setUserLists);
                }).catch(err => console.log(err));
        }

        if ( checked === true) {
            setIsChecked(true);
             userAxios.put(`api/lists/list/${listId}/item/${item._id}/update`,
                { ...item, isCompleted: true })
                .then(() => {
                    updateHome(setUserLists);
                }).catch(err => console.log(err));
            }
            return;
        }

        if (manualIsChecked) {

            setIsChecked(false);
            userAxios.put(`api/lists/list/${listId}/item/${item._id}/update`,
                { ...item, isCompleted: false })
                .then(() => {
                    updateHome(setUserLists);
                }).catch(err => console.log(err));
        }

        if (!manualIsChecked) {
            setIsChecked(true);
             userAxios.put(`api/lists/list/${listId}/item/${item._id}/update`,
                { ...item, isCompleted: true })
                .then(() => {
                    updateHome(setUserLists);
                }).catch(err => console.log(err));
        }
    }

    // DOCS: makes sure that the items checked state is in sync with the item data
    useEffect(() => {
        setIsChecked(item.isCompleted)
    }, [item.isCompleted]);
    
    const focusedInput = useRef(null);

    // DOCS: when isEditing changes, tell javascript that if ref is truthy, focus on it
    useEffect(() => {
        if (focusedInput.current) {
            focusedInput.current.focus();
        }
    }, [isEditing])
    
    return (
        <div
            className={`
                relative rounded p-2 m-2 cursor-pointer
                ${
                isChecked ?
                    isEditing ?
                        "bg-plum text-plum-tone dark:text-gray-400 dark:bg-gray-700"
                        :
                        "bg-plum text-plum-tone line-through hover:bg-[#241b1d] dark:text-gray-400 dark:bg-gray-700 dark:hover:bg-[#323b49]"
                    : !isEditing && "hover:bg-[#e3b2b3] dark:hover:bg-[#0f516e]"
                }
                ${isEditing && "no-underline flex-col my-2 hover:bg-none"}
            `}
        >
            <div
                onClick={(e) => { e.stopPropagation();  !isEditing ? checkItem(null, isChecked) : null}}
                className={`w-full flex flex-row justify-start items-center
             md:justify-center
                ${isEditing && "flex-col gap-3"}
                `}
            >
                {!isEditing ?
                    <input
                        type="checkbox" name="isCompleted" checked={isChecked}
                        className="
                            before:bg-plum after:bg-plum
                            dark:before:bg-dark-blue dark:after:bg-dark-blue"
                        onChange={checkItem}
                    /> :
                    <input type="text" name="title" id="title" value={editedItem.title}
                        onChange={handleChangeItem}
                        maxLength={100}
                        className={`pl-[2px] rounded w-full text-dark-blue`}
                        ref={focusedInput}
                    />
                        }
                {!isEditing &&
                    <span className="pl-2 block w-full pr-[5px] break-words max-w-[73%] md:max-w-[88%] md:text-xl">{item.title}</span>
                }

            {/* options */}
                {!isEditing ?
                    <div className="ml-auto center-row gap-1">
                        <button>
                            <FiEdit2 onClick={(e) => { e.stopPropagation();  setIsEditing(prev => !prev)}}
                            className=" hover:text-white dark:hover:text-gray-200"
                        />
                        </button>
                
                        <button>
                            <FiTrash onClick={deleteItem} className="hover:text-red-500" />
                        </button>
                    </div>
                    :
                    <div className="ml-auto center-row gap-2 text-white">
                        <div className="center-row gap-1">
                        <input
                            type="checkbox" className="no-style bg-pink" name="isRepeated" id="repeat"
                            checked={editedItem.isRepeated}
                            onChange={handleChangeItem}
                            autoFocus
                        />
                
                            <label htmlFor="repeat" className="no-style">repeat?</label>
                        </div>
                        <button
                            className="
                            rounded bg-plum-shade border w-10
                            dark:bg-dark-blue
                            hover:text-gray-200"
                            onClick={saveEdit}
                        >
                            save
                        </button>
                
                        <button
                            className="
                            bg-red-500 w-10 rounded
                            hover:bg-red-600"
                            onClick={()=>setIsEditing(false)}
                        >
                            exit
                        </button>
                </div>
            }
            </div>
        </div>
    )
}