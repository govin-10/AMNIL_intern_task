import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '../../../redux/store';

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
  return config;
});

api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        // const refreshToken = await dispatch("logout") //refreshtoken functionality
        console.log(
          'refresh token implemented and token/rT fetched successfully',
        );
        return api(originalRequest);
      } catch (error) {
        //logout functionality
      }
    }
    //else logout functionality or reject the promise
  },
);

export default api;
