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
            relative
            flex
            flex-row
            rounded px-2
            ${item.isCompleted ? "text-apple bg-apple-shade dark:text-gray-600 dark:bg-gray-700 line-through" : ""}
            ${isEditing ? "no-underline flex-col p-2 my-2" : ""}
            `}
        >
            {!isEditing ?
                <input
                type="checkbox" name="completed" checked={item.isCompleted}
                className="
                    before:bg-apple after:bg-apple
                    dark:before:bg-dark-blue dark:after:bg-dark-blue"
                /> :
                <input type="text" name="title" id="title" value={item.title}
                    className={`my-2 ml-5 pl-2 rounded w-full text-dark-blue ${isEditing && "ml-0"}`}
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
                            <input type="checkbox" className="no-style" name="repeat" id="repeat" checked={item.isRepeated} />
                
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