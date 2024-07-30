export interface todo {
  id: number;
  todo: string;
  completed: boolean;
  userId: number;
}

export interface todoState {
  todoList: todo[];
  loading: boolean;
  error: string | null;
}
