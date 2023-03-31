import LoginForm from "../components/LoginForm";

export default function Auth({prefersDarkTheme}) {


    return (
            <div
                className="
                px-4 pt-10 pb-4 mt-4
                flex flex-col justify-evenly items-center
                md:flex-row md:gap-4 md:mt-0"
        >
            
            <div className="
                w-full max-w-[60%]
                flex flex-col justify-center items-center
                md:w-1/3">

                <img
                    src={prefersDarkTheme ? "/mobile-note.svg" : "/mobile-note-light.svg"}
                    alt="girl making notes"
                    className="w-full md:max-w-none"
                />
                <a href="https://storyset.com/user" className="underline text-sm hover:text-zinc-600 dark:hover:text-gray-200" target="_blank">
                    Illistration by Storyset
                </a>
            </div>

                <LoginForm  />

            </div>
    )
}