import { useState } from "react";


export default function AddNewItem({closeFunc}) {

    const defaultInputs = {
        item: "",
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
            item: value
        }))
    }

    const submitNewItem = () => {
        setInputs(defaultInputs);
        closeFunc(false);
    }
    
    return (
        <div className="flex flex-col justify-start gap-2 text-white md:flex-row md:justify-center">
            
            <input type="text" name="title" id="title" value={inputs.item} onChange={handleChange}
                    className="my-2 mr-2 pl-2 rounded w-full text-dark-blue md:mr-4"
            />

            <div className="center-row gap-2">
                <div className="center-row gap-1">
                    <input type="checkbox" name="repeat" id="repeat" checked={inputs.isRepeated} onChange={ toggleIsRepeated } className="repeat" />
                
                    <label htmlFor="repeat" className="repeat">repeat?</label>
                </div>
                <button
                    className="
                    bg-green-600 w-9
                    hover:bg-green-700"
                    onClick={submitNewItem}
                >
                    add
                </button>
                
                <button
                    className="
                    bg-red-500 w-9
                    hover:bg-red-600"
                
                    onClick={()=>closeFunc(false)}
                >
                    exit
                </button>
            </div>
        </div>
    )
}