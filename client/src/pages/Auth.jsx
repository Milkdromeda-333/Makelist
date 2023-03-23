import LoginForm from "../components/LoginForm";

export default function Auth({isThemeDark}) {


    return (
            <div
                className="
                px-4 pt-10 pb-4 mt-4
                flex flex-col justify-evenly items-center
                md:flex-row md:gap-4 md:mt-0"
        >
            
            <a href="https://storyset.com/user" target="_blank"
                className="
                w-full max-w-[60%]
                flex flex-col justify-center items-center
                md:w-1/3"
            >

                <img
                    src={isThemeDark ? "/mobile-note.svg" : "/mobile-note-light.svg"}
                    alt="girl making notes"
                    className="w-full md:max-w-none"
                />
                <span className="underline text-sm">Illistration by Storyset</span>
            </a>

                <LoginForm  />

            </div>
    )
}