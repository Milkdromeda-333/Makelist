import { useState } from "react";
import {SlArrowDown, SlArrowUp} from "react-icons/sl"


export default function NavbarOptions({ setNavbarOptionsModalData }) {

    const [isOptionsVisible, setIsOptionsVisible] = useState(false);

    const showDeleteModal = () => {(
        setNavbarOptionsModalData(prev => ({
            ...prev,
            delete: true
        }))
    );
    }
    
    const showLogoutModal = () => {(
        setNavbarOptionsModalData(prev => ({
            ...prev,
            logout: true
        }))
    )}

    return (
        <div className="center-row h-full cursor-pointer" onClick={()=>setIsOptionsVisible(prev=>!prev)}>
                <div className="h-1/2 w-0.5 mx-2 bg-white rounded-full"></div>
                <p className="center-row gap-4 select-none">
                    Options {isOptionsVisible ? <SlArrowUp /> : <SlArrowDown />}
                </p>
            
            {isOptionsVisible &&
                (<div
                    className="absolute top-full right-0 center-col
                         bg-plum dark:bg-dark-blue
                         p-2
                    " >
                    <button className="ml-2 hover:text-gray-200 dark:hover:text-gray-300" onClick={showLogoutModal}>
                        Logout
                    </button>
                    
                    <button className="ml-2 hover:text-gray-200 dark:hover:text-gray-300" onClick={showDeleteModal}>
                        Delete Account
                    </button>
                </div>)
            }
        </div>
    )
}