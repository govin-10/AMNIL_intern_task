import {createAsyncThunk} from '@reduxjs/toolkit';
import {api} from '../../../utils';

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
