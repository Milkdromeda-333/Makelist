import { useState, useContext } from 'react'
import { appContext } from "../context/App";
// import { userAxios } from "./utils/axios";
import axios from 'axios';

export default function LoginForm() {

    const { setUser } = useContext(appContext);
    
    const [isUserLoggingIn, setIsUserLoggingIn] = useState(false);

    const defaultFormInputs = {
        username: "",
        password: ""
    }

    const [userInput, setUserInput] = useState(defaultFormInputs);
    

    const handleChange = (e) => {
        const { value, name } = e.target;
        
        setUserInput(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('/auth', userInput)
            .then(res => {
                console.log(res.data);
                setUser(res.data);
            }).catch(err => {
                // change to console log
                alert(err);
        })
        setUserInput(defaultFormInputs);
    }

    const handleToggleLogIn = (e) => {
        e.preventDefault();
        setIsUserLoggingIn(prev => !prev);
    }
    
    return (
        <form
            className="
            text-dark-blue
            flex flex-col gap-4
            w-full
            dark:text-white
            md:w-1/3"
        >

            <h1 className="text-center text-xl md:text-3xl">Make lists. Yup, it's that simple.</h1>

            <label htmlFor="username" className="no-style">Username:</label>
            <input 
                type="text"
                name="username"
                value={userInput.username}
                onChange={handleChange}
                autoComplete="username"
                className="border border-dark-blue p-2 dark:text-dark-blue"
            />

            <label htmlFor="password" className="no-style">Password:</label>

            <input 
                type="password"
                name="password"
                value={userInput.password}
                onChange={handleChange}
                autoComplete={isUserLoggingIn ? "current-password":"new-password"}
                className="border border-dark-blue p-2 dark:text-dark-blue"
            />

            <button
                className="
                bg-apple text-white
                py-2
                hover:bg-apple-shade
                dark:bg-dark-blue dark:hover:bg-dark-blue-shade"

                onClick={handleSubmit}
            >
                {isUserLoggingIn ? "Sign in." : "Sign up."}
            </button>

            <button
                className="decoration-apple-shade
                w-fit
                underline
                hover:decoration-apple-shade
                dark:decoration-dark-blue dark:hover:text-gray-200
                hover:text-zinc-600"

                onClick={handleToggleLogIn}
            >
                {isUserLoggingIn ? "No account? Sign up." : "Already signed up? Log in."}
            </button>

        </form>
    )
}