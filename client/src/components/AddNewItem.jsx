import { useState, useRef, useEffect } from "react";
import { userAxios, updateHome } from "./utils/axios";
// import useAutoFocus from "./utils/autoFocus";


export default function AddNewItem({closeFunc, listId, setUserLists, setIsItemLoading}) {

    const defaultInputs = {
        title: "",
        isRepeated: false
    }

    const [inputs, setInputs] = useState(defaultInputs);

    const toggleIsRepeated = () => {
        setInputs(prev => ({
            ...prev,
            isRepeated: !prev.isRepeated
        }));
    };

    const handleChange = (e) => {
        const { value } = e.target;
        setInputs(prev => ({
            ...prev,
            title: value
        }))
    }

    const submitNewItem = () => {
        setIsItemLoading(true);
        userAxios.post(`api/lists/${listId}/new-item`, inputs)
            .then(() => {
                updateHome(setUserLists);
                setIsItemLoading(false);
            }).catch(err => {
                setIsItemLoading(false);
                console.log(err);
            });
        
        setInputs(defaultInputs);

        closeFunc(false);
    }
    
    const focusedInput = useRef(null);
    useEffect(() => {
        if (focusedInput.current) {
            focusedInput.current.focus();
        }
    }, []);
    
    return (
        <div className="flex flex-col justify-start gap-2 text-white mx-4 md:justify-center">
            
            <input type="text" ref={focusedInput} name="title" id="title" value={inputs.item} onChange={handleChange}
                    className="my-2 pl-1 rounded w-full text-dark-blue "
            />

            <div className="center-row gap-2 ml-auto">
                <div className="center-row gap-1">
                    <input type="checkbox" name="repeat" id="repeat" checked={inputs.isRepeated} onChange={ toggleIsRepeated } className="no-style checked:bg-plum" />
                
                    <label htmlFor="repeat" className="repeat text-plum dark:text-white">repeat?</label>
                </div>
                <button
                    className="
                    rounded bg-plum  border w-9
                    dark:bg-dark-blue
                    hover:text-gray-200"
                    onClick={submitNewItem}
                >
                    add
                </button>
                
                <button
                    className="
                    bg-red-500 rounded w-9
                    hover:bg-red-600"
                
                    onClick={()=>closeFunc(false)}
                >
                    exit
                </button>
            </div>
        </div>
    )
}