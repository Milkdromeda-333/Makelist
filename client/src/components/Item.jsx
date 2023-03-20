import { useState } from "react";
import { FiEdit2, FiTrash } from "react-icons/fi";

export default function Item({ item }) {

    const [isEditing, setIsEditing] = useState(false);
    
    const deleteItem = () => {
        console.log("delete item.")
    }

    const saveEdit = () => {
        console.log("save item.");
        setIsEditing(false);
    }
    
    return (
        <div
            className={`
            center-row rounded
            ${item.isCompleted ? "text-apple bg-apple-shade dark:text-gray-600 dark:bg-gray-700 line-through px-2" : ""}
            ${isEditing ? "no-underline":""}
            `}
        >
            {!isEditing ?
                <input
                type="checkbox" name="completed" checked={item.isCompleted}
                className="
                before:bg-apple after:bg-apple
                dark:before:bg-dark-blue dark:after:bg-dark-blue"
                /> :
                <input type="text" name="setRepeat" id="setRepeat" value={item.title}
                    className="my-2 mr-4 pl-2 rounded w-full text-dark-blue"
                />
        }

            { !isEditing && <span className="text-xl md:text-xl">{item.title}</span>}

            {!isEditing ?
                <div className="ml-auto center-row gap-2">

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
                        <input type="checkbox" name="repeat" id="repeat" checked={item.isRepeated} className="repeat" />
                        
                        <label htmlFor="repeat" className="repeat">repeat?</label>
                    </div>

                    <button
                        className="
                        bg-green-600 w-9
                        hover:bg-green-700"
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