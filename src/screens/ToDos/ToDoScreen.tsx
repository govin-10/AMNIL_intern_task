import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect} from 'react';
import {AppDispatch, RootState} from '../../redux/store';
import {useDispatch, useSelector} from 'react-redux';
import {
  addToDo,
  getTodo,
  removeToDo,
} from '../../redux/features/todo/todoSlice';
import {fetchCurrentUser} from '../../redux/features/auth/authSlice';

const ToDoScreen = () => {
  const dispatch: AppDispatch = useDispatch();
  const {todoList, error, loading} = useSelector(
    (state: RootState) => state.todo,
  );

  const {user} = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getTodo(user?.id ?? 0));
  }, [dispatch, user]);
  console.log('uu', user?.id);

  const handleaddtodo = (title: string) => {
    console.log('function call');
    dispatch(addToDo(title));
  };
  return (
    <View>
      <Text>ToDoScreen</Text>
      <FlatList
        data={todoList}
        renderItem={({item}) => (
          <View>
            <Text>{item.todo}</Text>
            <TouchableOpacity onPress={() => dispatch(removeToDo(item.id))}>
              <Text>remove todo</Text>
            </TouchableOpacity>
          </View>
        )}
      />
      <TouchableOpacity
        onPress={() =>
          dispatch(
            addToDo({id: 1134, todo: 'go to bed', completed: false, userId: 1}),
          )
        }>
        <Text>Add todo</Text>
      </TouchableOpacity>
      {/* <TouchableOpacity>
        <Text>edit todo</Text>
      </TouchableOpacity> */}
    </View>
  );
};

export default ToDoScreen;

const styles = StyleSheet.create({});
