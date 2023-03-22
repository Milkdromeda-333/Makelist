import axios from "axios";
axios.defaults.baseURL = `http://localhost:8080/api`;
const userAxios = axios.create();

userAxios.interceptors.request.use(config => {
    const token = localStorage.getItem(token);
    config.headers.Authorization = `Bearer ${token}`;
    return config;
});

const updatehome = () => {
    userAxios.get('/lists')
        .then(res => {
            return res.data;
        }).catch(err => {
            console.log(err);
        });
};

export {
    userAxios,
    axios,
    updatehome
};