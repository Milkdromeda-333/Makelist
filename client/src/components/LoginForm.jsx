import { useState, useContext } from 'react'
import { appContext } from "../context/App";
import { axios } from "./utils/axios";
import Loader from './Loader';

export default function LoginForm() {

    const { setUser } = useContext(appContext);
    
    const [isUserLoggingIn, setIsUserLoggingIn] = useState(true);

    const defaultFormInputs = {
        username: "",
        password: ""
    }

    
    const [isAuthFailed, setisAuthFailed] = useState(false);
    const [failMessage, setFailMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const failOperation = (failMessage) => {
        setFailMessage(failMessage);
        setisAuthFailed(true);
    }

    const [userInput, setUserInput] = useState(defaultFormInputs);
    

    const handleChange = (e) => {
        const { value, name } = e.target;
        
        setUserInput(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const saveData = (data) => {
        setUser({...data.user, token: data.token});
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
    }

    const handleSignIn = (e) => {
        e.preventDefault();
        setIsLoading(true);

        if (!userInput.username || !userInput.password) {
            setIsLoading(false);
            return failOperation("Please fill out both fields.");
        }
        axios.post('/auth', userInput)
            .then(res => {
                saveData(res.data);
                setIsLoading(false);
                setUserInput(defaultFormInputs);
            }).catch(err => {
                console.log(err);
                failOperation(err.response.data.errMsg);
                setIsLoading(false);
                setUserInput(defaultFormInputs);
            })
        
       
        
    }

    const handleSignUp = (e) => {
        e.preventDefault();
        setIsLoading(true);
        if (!(userInput.username || userInput.password)) {
            setIsLoading(false);
            return failOperation("Please fill out both fields.");
        }
        axios.post('/auth/new-user', userInput)
            .then(res => {
                saveData(res.data);
                setUserInput(defaultFormInputs);
                setIsLoading(false);
            }).catch(err => {
                console.log(err);
                failOperation(err.response.data.errMsg);
                setUserInput(defaultFormInputs);
                setIsLoading(false);
        })
    }

    const handleToggleLogIn = (e) => {
        e.preventDefault();
        setIsLoading(false);
        setisAuthFailed(false);
        setFailMessage("");
        setIsUserLoggingIn(prev => !prev);
    }
    
    return (
        <form
            className="
            text-dark-blue
            flex flex-col gap-2
            w-full relative
            dark:text-white
            md:w-1/3"
        >

            <h1 className="text-center text-xl m-4 md:text-3xl">
                {isUserLoggingIn ?
                    "Log in to get back to making lists." :
                    "Sign up to start making lists."
                }
            </h1>

            {isAuthFailed &&
                <span className='text-red-500 text-center md:hidden'>{failMessage}</span>
            }

            <label htmlFor="username" className="no-style">Username:</label>

            <input 
                type="text"
                name="username"
                value={userInput.username}
                onChange={handleChange}
                autoComplete="username"
                autoFocus
                className={`
                border p-2 text-black
                ${isAuthFailed ? "border-red-500  border-2" : "border-plum dark:border-dark-blue" }
                dark:text-dark-blue`}
            />

            <label htmlFor="password" className="no-style">Password:</label>

            <input 
                type="password"
                name="password"
                value={userInput.password}
                onChange={handleChange}
                autoComplete={isUserLoggingIn ? "current-password":"new-password"}
                className={`
                border p-2 text-black
                ${isAuthFailed ? "border-red-500 border-2" : "border-plum dark:border-dark-blue" }
                dark:text-dark-blue`}
            />

            <button disabled={isLoading}
                className={`
                bg-pink text-white
                h-10 text-lg
                hover:bg-[#fbced0] active:bg-[#f7d6d8] disabled:bg-[#fbced0]
                dark:bg-dark-blue dark:hover:bg-dark-blue-shade dark:active:bg-[#28353c]`}

                onClick={isUserLoggingIn ? handleSignIn : handleSignUp}
            >
                <span className={isLoading === false ? "block" : "hidden"}>
                    {isUserLoggingIn ? "Sign in." : "Sign up."}
                </span>

                { isLoading && <Loader /> }
            </button>

            <button
                className="
                decoration-purple w-fit
                underline
                hover:decoration-purple 
                dark:decoration-dark-blue dark:hover:text-gray-200
                hover:text-zinc-600"

                onClick={handleToggleLogIn}
            >
                {isUserLoggingIn ? "No account? Sign up." : "Already signed up? Log in."}
            </button>

            {isAuthFailed &&
                <span className='text-red-500 text-lg w-full text-center absolute bottom-[-20%] left-1/2 -translate-x-1/2 -translate-y-1/2 hidden md:block'>{failMessage}</span>
            }

            </form>
        
    )
}