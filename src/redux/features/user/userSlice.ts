import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {api} from '../../../utils';
import {User} from '../../../types/auth/AuthTypes';

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

export const fetchUserById = createAsyncThunk(
  '/fetchUserById',
  async (id: number, {rejectWithValue}) => {
    try {
      console.log('ik api calling', id);
      const user = await api.get(`/users/${id}`);
      console.log('uurj', user.data);
      return user.data;
    } catch (error) {
      console.log(error);
      rejectWithValue('error');
    }
  },
);

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
