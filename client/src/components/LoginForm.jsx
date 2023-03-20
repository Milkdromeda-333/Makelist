import { useState, useContext } from 'react'
import { appContext } from "../context/App";

export default function LoginForm({ isUserLoggingIn, setIsUserLoggingIn }) {

    const { setUsername } = useContext(appContext);

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
        setUsername(userInput.username);
        setUserInput(defaultFormInputs);
    }
    
    return (
        <form
            className="
            flex flex-col gap-4
            w-full
            md:w-1/3"
        >

            <h1 className="text-center text-xl md:text-3xl">Make lists. Yup, it's that simple.</h1>

            <label htmlFor="username">Username:</label>
            <input 
                type="text"
                name="username"
                value={userInput.username}
                onChange={handleChange}
                autoComplete="username"
                className="border p-2 dark:text-dark-blue"
            />
            <label htmlFor="username">Password:</label>

            <input 
                type="password"
                name="password"
                value={userInput.password}
                onChange={handleChange}
                autoComplete={isUserLoggingIn ? "current-password":"new-password"}
                className="border p-2 dark:text-dark-blue"
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

            <button onClick={(e) =>{
                e.preventDefault();
                setIsUserLoggingIn(prev => !prev);
            }}
                className="decoration-apple-shade
                w-fit
                underline
                hover:decoration-apple-shade
                dark:decoration-dark-blue dark:hover:text-gray-200
                hover:text-zinc-600"
            >
                {isUserLoggingIn ? "No account? Sign up." : "Already signed up? Log in."}
            </button>

        </form>
    )
}