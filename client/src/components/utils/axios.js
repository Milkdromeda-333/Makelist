import axios from "axios";

import { isEnvDev } from "../../../env.json";

const url = isEnvDev ? "http://localhost:3000/" : `https://makelist.cyclic.app/`;

axios.defaults.baseURL = url;

const userAxios = axios.create();

userAxios.interceptors.request.use(config => {
    const token = localStorage.getItem("token");
    config.headers.Authorization = `Bearer ${token}`;
    return config;
});

const updateHome = (callbackFunc) => {
    userAxios.get('api/lists')
        .then(res => {
            callbackFunc(res.data);
            const user = JSON.parse(localStorage.getItem('user'));
            user.listItems = res.data;
            localStorage.setItem('user', JSON.stringify(user));
        }).catch(err => {
            console.log(err);
        });
};

export {
    userAxios,
    axios,
    updateHome
};