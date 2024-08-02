import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {User} from '../../../types/auth/AuthTypes';
import {fetchUserById} from './userThunk';

interface userState {
  user: User | null;
  loading: boolean;
  error: null | string;
}

const initialState: userState = {
  user: null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchUserById.pending, state => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(
      fetchUserById.fulfilled,
      (state, action: PayloadAction<any>) => {
        console.log('api success');
        state.user = action.payload;
        state.loading = false;
      },
    );
    builder.addCase(
      fetchUserById.rejected,
      (state, action: PayloadAction<any>) => {
        state.error = action.payload as string;
        state.loading = false;
      },
    );
  },
});

export default userSlice.reducer;
