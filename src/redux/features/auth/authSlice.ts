import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {api} from '../../../utils';
import {AuthState, UserType} from '../../../types';

const initialState: AuthState = {
  user: null,
  token: null,
  refreshToken: null,
  status: 'loading',
  error: null,
};

interface loginCredential {
  username: string;
  password: string;
}

export const login = createAsyncThunk(
  '/auth/login',
  async (loginCredential: loginCredential) => {
    const response = await api.post('/auth/login', loginCredential);
    console.log(response.data);
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

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: state => {
      (state.user = null), (state.token = null);
      state.refreshToken = null;

      AsyncStorage.removeItem('token');
      AsyncStorage.removeItem('refreshToken');
    },
  },
  extraReducers: builder => {
    builder.addCase(login.pending, state => {
      state.status = 'loading';
    });
    builder.addCase(login.rejected, (state, action) => {
      (state.status = 'failed'),
        (state.error = action.error.message || 'Failed to Login');
    });
    builder.addCase(login.fulfilled, (state, action: PayloadAction<any>) => {
      state.user = action.payload;
      state.token = action.payload.token;
      (state.refreshToken = action.payload.refreshToken),
        (state.status = 'succeeded');
    });
    builder.addCase(checkToken.pending, state => {
      state.status = 'loading';
    });
    builder.addCase(checkToken.rejected, (state, action) => {
      (state.status = 'failed'),
        (state.error = action.error.message || 'Failed to Login');
    });
    builder.addCase(
      checkToken.fulfilled,
      (state, action: PayloadAction<any>) => {
        (state.token = action.payload), (state.status = 'succeeded');
      },
    );
  },
});

export default authSlice.reducer;
export const {logout} = authSlice.actions;
