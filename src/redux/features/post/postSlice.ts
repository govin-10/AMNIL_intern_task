import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {api} from '../../../utils';
import {postState} from '../../../types';

const initialState: postState = {
  posts: [],
  loading: false,
  error: null,
};

export const getPostsById = createAsyncThunk(
  '/getPostsById',
  async (id: number, {rejectWithValue}) => {
    try {
      const postLists = await api.get(`/posts/user/${id}`);
      return postLists.data.posts;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const fetchFeedPosts = createAsyncThunk(
  '/feed',
  async (skip: number, {rejectWithValue}) => {
    try {
      const currentPagePosts = await api.get(`/posts?limit=10&skip=${skip}`);

      return currentPagePosts.data.posts;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

const mypostSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getPostsById.pending, state => {
      state.loading = true;
    });
    builder.addCase(
      getPostsById.rejected,
      (state, action: PayloadAction<any>) => {
        state.error = action.payload;
        state.loading = false;
      },
    );
    builder.addCase(
      getPostsById.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.posts = action.payload;
        state.loading = false;
      },
    );
  },
});

const feedpostSlice = createSlice({
  name: 'feedPosts',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchFeedPosts.pending, state => {
      state.loading = true;
    });
    builder.addCase(
      fetchFeedPosts.rejected,
      (state, action: PayloadAction<any>) => {
        state.error = action.payload;
        state.loading = false;
      },
    );
    builder.addCase(
      fetchFeedPosts.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.posts = action.payload;
        state.loading = false;
      },
    );
  },
});

export default mypostSlice.reducer;
export const feedpostReducer = feedpostSlice.reducer;
