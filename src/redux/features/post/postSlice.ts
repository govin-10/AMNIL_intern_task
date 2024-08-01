import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {api} from '../../../utils';
import {postState} from '../../../types';
import {post} from '../../../types/post/postTypes';

const initialState: postState = {
  posts: [],
  loading: false,
  error: null,
  nextId: 500,
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
  reducers: {
    setPosts(state, action: PayloadAction<post[]>) {
      state.posts = action.payload;
    },
    addPost(state, action: PayloadAction<any>) {
      const {title, body, userId} = action.payload;
      const newPost: post = {
        id: state.nextId,
        title,
        body,
        reactions: {
          likes: Math.floor(Math.random() * 100),
          dislikes: Math.floor(Math.random() * 100),
        },
        views: 0,
        userId,
      };
      state.posts.push(newPost);
      state.nextId += 1;
    },
    updatePost(
      state,
      action: PayloadAction<{id: number; title: string; body: string}>,
    ) {
      const {id, title, body} = action.payload;
      const postIndex = state.posts.findIndex(post => post.id === id);
      if (postIndex !== -1) {
        state.posts[postIndex] = {...state.posts[postIndex], title, body};
      }
    },
    removePost(state, action: PayloadAction<number>) {
      state.posts = state.posts.filter(post => post.id !== action.payload);
    },
  },
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
export const {setPosts, addPost, updatePost, removePost} = mypostSlice.actions;
