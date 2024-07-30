import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {api} from '../../../utils';
import {todoState} from '../../../types';

const initialState: todoState = {
  todoList: [],
  loading: false,
  error: null,
};

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

const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    removeToDo: (state, action) => {
      //   console.log(action.payload);
      const todoItem = state.todoList.find(item => item.id === action.payload);
      //   console.log(todoItem);
      const filterItem = state.todoList.filter(
        item => item.id !== action.payload,
      );
      //   console.log(filterItem);
      state.todoList = filterItem;
      //   (state.todoList = []), (state.loading = false), (state.error = null);
    },
    addToDo: (state, action) => {
      const newTodo = action.payload;
      console.log(newTodo);
      state.todoList = [...state.todoList, newTodo];
      console.log(state.todoList);
    },
    editToDo: (state, action) => {
      const todoItem = state.todoList.find(
        item => item.id === action.payload.id,
      );
      console.log(todoItem);
    },
  },
  extraReducers: builder => {
    builder.addCase(getTodo.pending, state => {
      state.loading = true;
    });
    builder.addCase(getTodo.rejected, (state, action: PayloadAction<any>) => {
      state.error = action.payload;
      state.loading = false;
    });
    builder.addCase(getTodo.fulfilled, (state, action: PayloadAction<any>) => {
      state.todoList = action.payload;
      state.loading = false;
    });
  },
});

export const {addToDo, editToDo, removeToDo} = todoSlice.actions;
export default todoSlice.reducer;
