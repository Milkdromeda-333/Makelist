import { useState } from "react";
import { FiEdit2, FiTrash } from "react-icons/fi";
import { updateHome, userAxios } from "./utils/axios";

export default function Item({ item, listId, setUserLists }) {

    const [isEditing, setIsEditing] = useState(false);

    const [editedItem, setEditedItem] = useState(item);

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
    
    const deleteItem = () => {
        userAxios.delete(`/lists/list/${listId}/item/${item._id}`)
            .then(() => {
                updateHome(setUserLists);
            }).catch(err => console.log(err));
    }

    const saveEdit = () => {
        userAxios.put(`/lists/list/${listId}/item/${item._id}/update`, editedItem)
            .then((res) => {
                console.log(res);
                updateHome(setUserLists);
                setIsEditing(false);
            }).catch(err => console.log(err));
        setIsEditing(false);
    }
    
    return (
        <div
            className={`
            relative
            flex
            flex-row
            rounded px-2 m-2
            ${item.isCompleted ? "text-apple bg-apple-shade dark:text-gray-600 dark:bg-gray-700 line-through" : ""}
            ${isEditing ? "no-underline flex-col  my-2 px-0" : ""}
            `}
        >
            {!isEditing ?
                <input
                type="checkbox" name="completed" checked={item.isCompleted}
                className="
                    before:bg-apple after:bg-apple
                    dark:before:bg-dark-blue dark:after:bg-dark-blue"
                /> :
                <input type="text" name="title" id="title" value={editedItem.title}
                    onChange={handleChangeItem}
                    className={`my-2 pl-[2px] rounded w-full text-dark-blue`}
                />
        }

            { !isEditing && <span className="pl-2 ml-5 pr-[5px] break-words max-w-[73%] md:max-w-[88%] md:text-xl">{item.title}</span>}

            {/* options */}
                {!isEditing ?
                    <div className="ml-auto center-row gap-1">
                        <button>
                            <FiEdit2 onClick={() => setIsEditing(prev => !prev)} className=" hover:text-gray-200 dark:hover:text-gray-300" />
                        </button>
                
                        <button>
                            <FiTrash onClick={deleteItem} className="hover:text-red-500" />
                        </button>
                    </div>
                    :
                    <div className="ml-auto center-row gap-2 text-white">
                        <div className="center-row gap-1">
                        <input
                            type="checkbox" className="no-style" name="isRepeated" id="repeat"
                            checked={editedItem.isRepeated}
                            onChange={handleChangeItem}
                        />
                
                            <label htmlFor="repeat" className="no-style">repeat?</label>
                        </div>
                        <button
                            className="
                            rounded bg-apple-shade border w-9
                            dark:bg-dark-blue
                            hover:text-gray-200"
                            onClick={saveEdit}
                        >
                            save
                        </button>
                
                        <button
                            className="
                            bg-red-500 w-9
                            hover:bg-red-600"
                            onClick={()=>setIsEditing(false)}
                        >
                            exit
                        </button>
                    </div>}
        </div>
    )
}