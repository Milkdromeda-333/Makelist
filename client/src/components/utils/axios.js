import axios from "axios";
axios.defaults.baseURL = `http://localhost:8080/`;
const userAxios = axios.create();

userAxios.interceptors.request.use(config => {
    const token = localStorage.getItem("user").token;
    config.headers.Authorization = `Bearer ${token}`;
    return config;
});

export {
    userAxios
};