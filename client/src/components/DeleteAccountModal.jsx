import { useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { userAxios } from "./utils/axios";

export default function DeleteAccountModal({ setNavbarOptionsModalData, setUser }) {

    const [isError, setIsError] = useState(false);

    const closeModal = () => {
        setNavbarOptionsModalData(prev => ({ ...prev, delete: false }));
    }
    
    const deleteAccount = () => {
        
        userAxios.delete("/auth/delete")
            .then((res) => {
                setUser({});
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                closeModal();
            })
            .catch(err => {
                console.log(err);
                setIsError(true);
                const timer = setTimeout(() => {
                    setIsError(false);   
                }, 3000)
            })
    };

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
                <div className="center-col gap-4 text-2xl relative">
                    <p>Are you sure you want to <span className="text-red-500">delete your account?</span></p>

                    <div className="center-row gap-2 text-white">
                        <button onClick={deleteAccount} className="py-1 px-3 bg-green-500 ring-white hover:ring-2">Yes</button>

                        <button onClick={closeModal}
                            className="py-1 px-3 bg-red-500 ring-white hover:ring-2"
                        >No</button>
                    </div>
                    {isError && <span className="text-red-500 absolute top-full left-1/2 -translate-x-1/2 translate-y-1/2 ">Sorry, something went wrong</span>}
                </div>

            
                <RxCross2
                    onClick={closeModal}
                    className="
                    absolute top-4 right-4 
                    text-xl text-[#785d63]
                    md:text-3xl
                    hover:text-plum rounded-lg
                    dark:text-[#fefefecf] dark:hover:text-white"
                />
            </section>

        /</div>
    )
}