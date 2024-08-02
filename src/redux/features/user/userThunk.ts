import {createAsyncThunk} from '@reduxjs/toolkit';
import {api} from '../../../utils';

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
