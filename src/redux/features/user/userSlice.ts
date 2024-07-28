// import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
// import {api} from '../../../utils';
// import {UserType} from '../../../types/auth/AuthTypes';
// import {User} from '../../../types';

// const initialState: UserType = {
//   user: null,
//   status: 'loading',
//   error: null,
// };

// export const fetchCurrentUser = createAsyncThunk(
//   '/currentUser',
//   async (_, {rejectWithValue}) => {
//     try {
//       const currentUser = await api.get('/auth/me');
//       console.log(currentUser.data);
//       return currentUser.data;
//     } catch (error) {
//       console.log(error);
//       rejectWithValue('error');
//     }
//   },
// );

// const userSlice = createSlice({
//   name: 'user',
//   initialState,
//   reducers: {},
//   extraReducers: builder => {
//     builder.addCase(fetchCurrentUser.pending, state => {
//       state.status = 'loading';
//       state.error = null;
//     });
//     builder.addCase(fetchCurrentUser.fulfilled, (state, action) => {
//       state.status = 'succeeded';
//       state.user = action.payload;
//     });
//     builder.addCase(fetchCurrentUser.rejected, (state, action) => {
//       state.status = 'failed';
//       state.error = action.payload as string;
//     });
//   },
// });

// export default userSlice.reducer;
