import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {api} from '../../../utils';

interface SearchState {
  query: string;
  results: any[];
  loading: boolean;
  error: string | null;
}

const initialState: SearchState = {
  query: '',
  results: [],
  loading: false,
  error: null,
};

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

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setQuery(state, action: PayloadAction<string>) {
      state.query = action.payload;
      console.log('qq', state.query);
      if (state.query === '') {
        state.results = [];
      }
    },
    clearResults(state) {
      state.results = [];
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchSearchResults.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchSearchResults.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.results = action.payload;
        },
      )
      .addCase(fetchSearchResults.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const {setQuery, clearResults} = searchSlice.actions;
export default searchSlice.reducer;
