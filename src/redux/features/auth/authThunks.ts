import {createAsyncThunk} from '@reduxjs/toolkit';
import {api} from '../../../utils';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface loginCredential {
  username: string;
  password: string;
}

export const login = createAsyncThunk(
  '/auth/login',
  async ({username, password}: loginCredential) => {
    const response = await api.post('/auth/login', {
      username,
      password,
    });

    const {token, refreshToken} = response.data;
    await AsyncStorage.setItem('token', token);
    await AsyncStorage.setItem('refreshToken', refreshToken);
    return response.data;
  },
);

export const checkToken = createAsyncThunk('/checkToken', async () => {
  const token = await AsyncStorage.getItem('token');
  if (token) {
    return token;
  } else throw new Error('No token found');
});

export const fetchCurrentUser = createAsyncThunk(
  'auth/fetchCurrentUser',
  async (_, {rejectWithValue}) => {
    try {
      const response = await api.get('/auth/me');

      return response.data;
    } catch (error: any) {
      console.log('err', error);
      return rejectWithValue(error.message);
    }
  },
);
