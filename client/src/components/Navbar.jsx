import { useState } from "react";
import Switch from "react-switch";
import NavbarOptions from "./NavbarOptions";

export default function Navbar(props) {
    
    const { setUser, prefersDarkTheme, toggleDarkMode, setNavbarOptionsModalData } = props;

    const [isModalVisible, setIsModalVisible] = useState(false);

    // light mode
    const checkedHandleIcon = (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
                color: "red",
                fontSize: 18
            }}
        >
            🌞
        </div >);
    
    // dark mode
    const uncheckedHandleIcon=(
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          fontSize: 20
        }}
      >
        🌑
      </div>
    )

    
    return (
        <nav className="
            bg-plum
            text-white
            h-12 px-4
            absolute top-0 w-full
            flex flex-row justify-between items-center
            dark:bg-dark-blue dark:text-white
            md:h-[55px]"
        >
            <div className="center-row gap-1">
                <img src="/logo.png" alt="logo" className="w-8 object-cover" />
                <span className="text-lg md:text-3xl">MakeList</span>
            </div>

            <Switch
                onChange={toggleDarkMode}
                checked={prefersDarkTheme}
                onColor="#1c2429"
                offColor="#281f21"
                uncheckedIcon={checkedHandleIcon}
                checkedIcon={uncheckedHandleIcon}
                className="ml-auto mr-4"
            />

            {
                localStorage.getItem("token") &&
                <NavbarOptions
                    setUser={setUser}
                    setIsModalVisible={setIsModalVisible}
                    setNavbarOptionsModalData={setNavbarOptionsModalData}
                />
            }
        </nav>
    )
}