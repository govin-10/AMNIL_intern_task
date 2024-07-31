import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AppDispatch} from '../../../redux/store';
import {useDispatch} from 'react-redux';
import {logout} from '../../../redux/features/auth/authSlice';

const BASE_URL = 'https://dummyjson.com/';

const api = axios.create({
  baseURL: BASE_URL,
});

// const dispatch: AppDispatch = useDispatch();

api.interceptors.request.use(async config => {
  const token = await AsyncStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  // console.log('Request config:', config); // Log the request config

  return config;
});

api.interceptors.response.use(
  response => response,
  async error => {
    // const dispatch: AppDispatch = useDispatch();

    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      console.log('token expired');
      originalRequest._retry = true;
      try {
        const refreshToken = await AsyncStorage.getItem('refreshToken');
        if (refreshToken) {
          const resp = await axios.post(`${BASE_URL}auth/refresh`, {
            refreshToken,
          });
          const newToken = resp.data.token;
          const newRefreshToken = resp.data.refreshToken;
          // console.log(resp.data);
          await AsyncStorage.setItem('token', newToken);
          await AsyncStorage.setItem('refreshToken', newRefreshToken);
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          return api(originalRequest);
        }
      } catch (error) {
        console.log('refresh token error:', error);
        // dispatch(logout());
        // await AsyncStorage.removeItem('token');
        // await AsyncStorage.removeItem('refreshToken');
        return Promise.reject('error');
      }
    } else {
      console.error('API response error:', error);
      return Promise.reject(error);
    }
  },
);

export default api;
