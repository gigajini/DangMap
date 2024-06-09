import axios from "axios";
import { useAuth } from "../hooks/useAuth";

const api = axios.create({
    baseURL: `${process.env.REACT_APP_SERVER_URL}`
})

api.interceptors.request.use(
    (config) => {return config},
    (err) => {return Promise.reject(err)}
);

api.interceptors.response.use(
    (res) => {
        // const result = res.data
        return res
    },
    (err) => {
        return useRefreshHandler(err);
    }
);

const useRefreshHandler = async(err) => {
    const originalReq = err.config;
    if (err.response.status !== 403) {
        return Promise.reject(err)
    } else {
        const res = await axios.post(`${process.env.REACT_APP_SERVER_URL}/auth/refresh`, {
            accessToken: localStorage.getItem('token')
        });
        if (res.status === 200) {
            localStorage.setItem('token', res.data.accessToken);            
            originalReq.headers.Authorization = res.data.accessToken;
            return api.request(originalReq);
        }
    }
}

export default api;