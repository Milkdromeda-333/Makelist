import { useState, useContext } from 'react'
import { appContext } from "../context/App";
import { userAxios, axios } from "./utils/axios";

export default function LoginForm() {

    const { setUser } = useContext(appContext);
    
    const [isUserLoggingIn, setIsUserLoggingIn] = useState(true);

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

    const saveData = (data) => {
        setUser({...data.user, token: data.token});
        localStorage.setItem('token', data.token);
        console.log(data.user);
        localStorage.setItem('user', JSON.stringify(data.user));
    }

    const handleSignIn = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8080/auth', userInput)
            .then(res => {
                saveData(res.data);
            }).catch(err => {
                console.log(err);
            })
        
        setUserInput(defaultFormInputs);
    }

    const handleSignUp = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8080/auth/new-user', userInput)
            .then(res => {
                saveData(res.data);
            }).catch(err => {
                console.log(err);
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
            flex flex-col gap-2
            w-full
            dark:text-white
            md:w-1/3"
        >

            <h1 className="text-center text-xl md:text-3xl">
                {isUserLoggingIn ?
                    "Log in to get back to making lists." :
                    "Sign up to start making lists."
                }
            </h1>

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
                bg-pink text-white
                py-2
                hover:bg-[#ffb2b3] 
                dark:bg-dark-blue dark:hover:bg-dark-blue-shade"

                onClick={isUserLoggingIn ? handleSignIn : handleSignUp}
            >
                {isUserLoggingIn ? "Sign in." : "Sign up."}
            </button>

            <button
                className="decoration-purple 
                w-fit
                underline
                hover:decoration-purple 
                dark:decoration-dark-blue dark:hover:text-gray-200
                hover:text-zinc-600"

                onClick={handleToggleLogIn}
            >
                {isUserLoggingIn ? "No account? Sign up." : "Already signed up? Log in."}
            </button>

        </form>
    )
}