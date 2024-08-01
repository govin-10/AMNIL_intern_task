import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {api} from '../../../utils';
import {todoState} from '../../../types';

const initialState: todoState = {
  todoList: [],
  searchQuery: '',
  filteredList: [],
  loading: false,
  error: null,
  nextId: 500,
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
      const {todoItem, userId} = action.payload;
      // console.log(newTodo);
      const newTodo = {
        id: state.nextId,
        todo: todoItem,
        completed: false,
        userId,
      };
      state.todoList = [newTodo, ...state.todoList];
      state.nextId += 1;
      console.log(state.todoList);
    },

    searchToDo: (state, action: PayloadAction<string>) => {
      console.log(action.payload);
      state.searchQuery = action.payload;
      state.filteredList = state.searchQuery
        ? state.todoList.filter(item =>
            item.todo
              .toLocaleLowerCase()
              .includes(state.searchQuery?.toLowerCase()),
          )
        : [...state.todoList];

      // state.searchQuery = action.payload;
      // state.filteredList = state.searchQuery
      //   ? state.todoList.filter(item =>
      //       item.todo.toLowerCase().includes(state.searchQuery.toLowerCase()),
      //     )
      //   : [...state.todoList];
    },
    updateToDo: (
      state,
      action: PayloadAction<{original: string; updated: string}>,
    ) => {
      const {original, updated} = action.payload;
      state.todoList = state.todoList.map(todo =>
        todo.todo === original ? {...todo, todo: updated} : todo,
      );
    },
    completeTodo(state, action) {
      const {id} = action.payload;
      const todoItem = state.todoList.find(item => item.id === id);
      console.log(todoItem);
      if (todoItem) {
        todoItem.completed = !todoItem.completed;
      }
      console.log(state.todoList);
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

export const {addToDo, removeToDo, searchToDo, updateToDo, completeTodo} =
  todoSlice.actions;
export default todoSlice.reducer;
