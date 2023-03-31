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
        userAxios.post("api/lists/new", inputs)
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
            bg-[rgba(52,52,52,0.63)]
            dark:text-white"
        >

            <section
                className="
                bg-pink text-plum
                p-5 rounded border-plum border-2
                h-[50%] w-[80%]
                flex flex-col justify-center
                fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                md:h-1/2 md:w-1/2
                dark:bg-blue dark:border-white
                dark:text-white dark:border-[1px]"
            >
                <h2 className="text-2xl md:absolute top-4 mb-4">Add new list:</h2>

                <RxCross2
                    className="
                    absolute top-4 right-4 
                    text-xl text-[#785d63]
                    md:text-3xl
                    hover:text-plum rounded-lg
                    dark:text-[#fefefecf] dark:hover:text-white"
                    onClick={close}
                />

                <label htmlFor="name" className="no-style text-plum dark:text-white">
                    Name:
                </label>

                <input type="name" id="name" className="rounded border border-plum text-plum p-2" onChange={handleInputs} autoFocus />

                <div className="center-row transition-all cursor-pointer mt-4 w-fit rounded p-1 hover:bg-[#ffe4e4] dark:hover:bg-[#ffffff61]"  onClick={togglePinned}>
                    {!inputs.isPinned ?
                        <div>
                            <MdOutlineStarOutline
                                className="
                                text-2xl mr-1
                                hover:border-white"
                                
                            />
                        </div> :
                        <>
                            <MdOutlineStar
                                className="
                                text-2xl mr-1"
                            />
                        </>
                    }
                    <span> Pin?</span>
                </div>

                <button className="
                    bg-plum text-white
                    w-3/4 mx-auto mt-4 rounded p-2
                    dark:bg-dark-blue dark:hover:bg-dark-blue-shade
                    hover:bg-plum-shade"
                    onClick={submitList}
                >
                    Create a new list +
                </button>

            </section>
        
        </div>
    )
}