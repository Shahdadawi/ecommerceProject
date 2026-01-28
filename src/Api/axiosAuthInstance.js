import axios from 'axios'
import useAuthStore from '../store/authStore';

const axiosAuthInstance = axios.create({
    baseURL: 'https://knowledgeshop.runasp.net/api',
});

axiosAuthInstance.interceptors.request.use((config) => {
    const {token} = useAuthStore.getState();
    config.headers["Accept-Language"] = "en"
    config.headers["Authorization"] =`Bearer ${token}`
    console.log(token);
    return config;
})

export default axiosAuthInstance;