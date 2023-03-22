import { useEffect, useState } from "react";
import LoginForm from "../components/LoginForm";

export default function Auth({isThemeDark}) {


    return (
            <div
                className="
                px-4 pt-10 pb-4 mt-4
                flex flex-col justify-center items-center
                md:flex-row md:gap-4 md:mt-0"
            >

                <img src={isThemeDark ? "/mobile-note.svg" : "/mobile-note-list.gif"} alt="girl making notes" className="w-full max-w-[60%] md:w-1/3 md:max-w-none" />

                <LoginForm  />

            </div>
    )
}