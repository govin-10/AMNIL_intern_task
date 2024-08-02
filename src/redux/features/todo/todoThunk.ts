import {createAsyncThunk} from '@reduxjs/toolkit';
import {api} from '../../../utils';

/*
suru ma api bata current user ko todolist fetch garne ra ani chai tyaslai state le manipulate garne banaako
*/
export const getTodo = createAsyncThunk(
  '/fetchToDo',
  async (id: number, {rejectWithValue}) => {
    try {
      const todoData = await api.get(`/todos/user/${id}`);
      //   console.log('tooo', todoData.data);
      return todoData.data.todos;
    } catch (error) {
      console.log(error);
    }
  },
);
