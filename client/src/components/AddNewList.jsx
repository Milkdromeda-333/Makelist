import { useState } from "react";
import { MdOutlineStarOutline, MdOutlineStar } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { updateHome, userAxios } from "./utils/axios";

export default function AddNewList({ closeFunc, setUserLists }) {

    const defaultInputs = {
        name: "",
        isPinned: false
    };
    const [inputs, setInputs] = useState(defaultInputs);
    const handleInputs = (e) => {
        const { value } = e.target;
        setInputs(prev => ({
            ...prev,
            name: value
        }))
    }

    const togglePinned = () => {
        setInputs(prev => ({
            ...prev,
            isPinned: !prev.isPinned
        }));
    };
    

    const close = () => {
        setInputs(defaultInputs);
        closeFunc();
       
    }


    const submitList = () => {
        userAxios.post("/lists/new", inputs)
            .then(res => {
                updateHome(setUserLists);
                setInputs(defaultInputs);
                close();
            }).catch(err=>console.log(err));
        
    }
    
    return (
        <div
            className="
            w-[100vw] h-[100vh]
            fixed top-0 left-0 
            bg-[rgba(52,52,52,0.63)]"
        >

            <section
                className="
                bg-apple border-apple text-white
                p-4 rounded
                h-[50%] w-[80%]
                flex flex-col justify-center
                fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                md:h-1/2 md:w-1/2
                dark:bg-blue-shade
                dark:border-white"
            >
                <h2 className="text-2xl md:absolute top-4 mb-4">Add new list:</h2>

                <RxCross2
                    className="absolute
                    top-4 right-4 text-xl md:text-3xl"
                    onClick={close}
                />

                <label htmlFor="name">Name:</label>

                <input type="name" id="name" className="rounded text-dark-blue p-2" onChange={handleInputs} />

                <div className="center-row mt-4">
                    {!inputs.isPinned ?
                        <>
                            <MdOutlineStarOutline
                                className="
                                text-2xl mr-1
                                hover:text-gray-200
                                dark:hover:text-gray-300"
                                onClick={togglePinned}
                            />
                            <span> Pin?</span>
                        </> :
                        <>
                            <MdOutlineStar
                                className="
                                text-2xl mr-1
                                hover:text-gray-200
                                dark:hover:text-gray-300"
                                onClick={togglePinned}
                            />
                            <span> Pin?</span>
                        </>
                    }
                </div>

                <button className="
                    bg-apple-shade
                    w-3/4 mx-auto mt-4 rounded p-2
                    dark:bg-dark-blue dark:hover:bg-dark-blue-shade
                    hover:text-gray-200"
                    onClick={submitList}
                >
                    Create a new list +
                </button>

            </section>
        
        </div>
    )
}