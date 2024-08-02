import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthState, UserType} from '../../../types';
import {checkToken, fetchCurrentUser, login} from './authThunks';

const initialState: AuthState = {
  user: null,
  token: null,
  refreshToken: null,
  status: 'loading',
  error: null,
};

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
    builder.addCase(fetchCurrentUser.pending, state => {
      state.status = 'loading';
      state.error = null;
    });
    builder.addCase(
      fetchCurrentUser.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.status = 'succeeded';
        state.user = action.payload;
      },
    );
    builder.addCase(fetchCurrentUser.rejected, (state, action) => {
      console.log('failll');
      state.status = 'failed';
      state.error = action.payload as string;
    });
  },
});

export default authSlice.reducer;
export const {logout} = authSlice.actions;
