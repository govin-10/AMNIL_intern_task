import {createAsyncThunk} from '@reduxjs/toolkit';
import {api} from '../../../../utils';

export const fetchSearchResults = createAsyncThunk(
  'search/fetchSearchResults',
  async (query: string, {rejectWithValue}) => {
    try {
      console.log('api calling');
      const response = await api.get(`products/search?q=${query}`);
      console.log('hello', response.data.products);
      return response.data.products;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);
