import axios from "axios";

axios.defaults.baseURL = `http://localhost:8080/api`;

const userAxios = axios.create();

userAxios.interceptors.request.use(config => {
    const token = localStorage.getItem("token");
    config.headers.Authorization = `Bearer ${token}`;
    return config;
});

const updateHome = (cb) => {
    userAxios.get('/lists')
        .then(res => {
            cb(res.data);
        }).catch(err => {
            console.log(err);
        });
};

export {
    userAxios,
    axios,
    updateHome
};