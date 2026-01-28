import axios from 'axios'
import useAuthStore from '../store/authStore';
import i18n from '../i18n';

const axiosAuthInstance = axios.create({
    baseURL: 'https://knowledgeshop.runasp.net/api',
});

axiosAuthInstance.interceptors.request.use((config) => {
    const {token} = useAuthStore.getState();
    config.headers["Accept-Language"] = i18n.language;
    config.headers["Authorization"] =`Bearer ${token}`
    console.log(token);
    return config;
})

export default axiosAuthInstance;