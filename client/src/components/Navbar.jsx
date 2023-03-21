import Switch from "react-switch";

export default function Navbar({isThemeDark, toggleFunc, setUsername}) {

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
            🌑
        </div >);
    
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
        🌞
      </div>
    )

    const logout = () => {
        setUsername(undefined);
    };
    
    return (
        <nav className="
            bg-apple
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
                onChange={toggleFunc}
                checked={isThemeDark ? true : false}
                onColor="#1c2429"
                offColor="#77bd8b"
                uncheckedIcon={checkedHandleIcon}
                checkedIcon={uncheckedHandleIcon}
                className="ml-auto"
            />

            <button className="ml-2 hover:text-gray-200 dark:hover:text-gray-300" onClick={logout}>
                Logout
            </button>
        </nav>
    )
}