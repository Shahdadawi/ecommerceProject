import axios from "axios";
import useAuthStore from "../store/authStore";
import i18n from "../i18n";

const axiosAuthInstance = axios.create({
  baseURL: "https://knowledgeshop.runasp.net/api",
  withCredentials: true,
});

const axiosResfresh = axios.create({
  baseURL: "https://knowledgeshop.runasp.net/api",
  withCredentials: true,
});

axiosAuthInstance.interceptors.request.use((config) => {
  const { token } = useAuthStore.getState();
  config.headers["Accept-Language"] = i18n.language;
  config.headers["Authorization"] = `Bearer ${token}`;
  return config;
});

axiosAuthInstance.interceptors.response.use(
  (response) => {
    console.log("response");

    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status == 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshResponse = await axiosResfresh.post(
          "/auth/Account/RefreshToken",
          {},
        );
        const newAccessToken = refreshResponse.data.accessToken;
        useAuthStore.getState().setToken(newAccessToken);
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        return axiosAuthInstance(originalRequest);
      } catch (refreshError) {
        useAuthStore.getState().logout();
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);
export default axiosAuthInstance;
