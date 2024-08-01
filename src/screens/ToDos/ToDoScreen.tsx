import {
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {AppDispatch, RootState} from '../../redux/store';
import {useDispatch, useSelector} from 'react-redux';
import {
  addToDo,
  completeTodo,
  getTodo,
  removeToDo,
  searchToDo,
  updateToDo,
} from '../../redux/features/todo/todoSlice';
import {fetchCurrentUser} from '../../redux/features/auth/authSlice';
import {ScreenWithBackComp} from '../../components';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {COLOR} from '../../constants';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {showToast} from '../../utils/RNToast/ToastMessage';

const ToDoScreen = ({navigation}: any) => {
  const dispatch: AppDispatch = useDispatch();
  const {todoList, filteredList, error, loading} = useSelector(
    (state: RootState) => state.todo,
  );

  const {user} = useSelector((state: RootState) => state.auth);

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [newTodo, setNewTodo] = useState<string>('');
  const [selectedTodo, setSelectedTodo] = useState<any | null>(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [editedTodo, setEditedTodo] = useState('');

  useEffect(() => {
    setTimeout(() => {
      showToast('info', 'click on the task to update');
    }, 1000);
  }, []);

  useEffect(() => {
    dispatch(getTodo(user?.id ?? 0));
  }, [dispatch]);

  const handleAddTodo = (title: string) => {
    if (!title) {
      showToast('error', 'No task to add');
      return;
    }
    dispatch(addToDo({todoItem: title, userId: user?.id}));
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    dispatch(searchToDo(query));
  };

  const handleEditTodo = (todoItem: any) => {
    setSelectedTodo(todoItem);
    setEditedTodo(todoItem.todo); // Set the initial value for editing
    setModalVisible(true); // Show the modal
  };

  const handleSaveEdit = () => {
    if (selectedTodo) {
      dispatch(updateToDo({original: selectedTodo.todo, updated: editedTodo}));
      setModalVisible(false); // Hide the modal
      setSelectedTodo(null); // Clear selectedTodo
    }
  };

  const completeTask = (item: any) => {
    // if (item.completed == true) {
    //   showToast('error', 'item already completed');
    //   return;
    // }
    dispatch(completeTodo({id: item.id}));
  };

  const renderToDo = ({item}: any) => {
    return (
      <View style={styles.todoItem}>
        <TouchableOpacity onPress={() => handleEditTodo(item)}>
          <Text
            style={[
              styles.todo,
              {textDecorationLine: item.completed ? 'line-through' : 'none'},
            ]}>
            {item.todo}
          </Text>
        </TouchableOpacity>
        <View style={styles.options}>
          <TouchableOpacity onPress={() => dispatch(removeToDo(item.id))}>
            <MaterialIcon name="delete" size={20} color={'red'} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => completeTask(item)}>
            {item.completed ? (
              <MaterialIcon name="check-circle" size={20} color={'green'} />
            ) : (
              <MaterialIcon
                name="check-circle-outline"
                size={20}
                color={'black'}
              />
            )}
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.todoPage}>
      <ScreenWithBackComp navigation={navigation}>
        <View style={styles.todoContainer}>
          <Text style={styles.title}>ToDoS</Text>
          <TextInput
            placeholder="Search todos..."
            style={styles.searchInput}
            value={searchQuery}
            onChangeText={handleSearch}
          />
          <FlatList
            data={searchQuery ? filteredList : todoList}
            renderItem={renderToDo}
            keyExtractor={item => item.id.toString()}
          />
          <TextInput
            placeholder="New todo..."
            style={styles.searchInput}
            value={newTodo}
            onChangeText={setNewTodo}
          />
          <TouchableOpacity
            onPress={() => {
              handleAddTodo(newTodo);
              setNewTodo('');
            }}
            style={styles.addToDoButton}>
            <Text style={{color: 'white'}}>Add todo</Text>
          </TouchableOpacity>
        </View>
      </ScreenWithBackComp>

      {/* Modal for editing todo */}
      <Modal
        visible={isModalVisible}
        // transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalView}>
          <TextInput
            value={editedTodo}
            onChangeText={setEditedTodo}
            style={styles.modalInput}
          />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              gap: 20,
            }}>
            <TouchableOpacity
              onPress={handleSaveEdit}
              style={styles.modalButton}>
              <Text style={{color: 'white'}}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={styles.modalButton}>
              <Text style={{color: 'white'}}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ToDoScreen;

const styles = StyleSheet.create({
  todoPage: {
    flex: 1,
    padding: widthPercentageToDP(2),
    backgroundColor: COLOR.PRIMARY_BACKGROUND,
  },
  todoContainer: {
    width: '100%',
    backgroundColor: COLOR.CARD_BACKGROUND,
    paddingVertical: heightPercentageToDP(2),
  },
  searchInput: {
    width: '100%',
    padding: widthPercentageToDP(3),
    marginVertical: heightPercentageToDP(1),
    backgroundColor: COLOR.INPUT_BACKGROUND,
    borderRadius: 10,
  },
  title: {
    fontSize: widthPercentageToDP(5),
    fontWeight: 'bold',
    color: COLOR.PRIMARY_TEXT,
    marginBottom: heightPercentageToDP(2),
  },
  todoItem: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: widthPercentageToDP(3),
    marginVertical: heightPercentageToDP(0.5),
    backgroundColor: COLOR.INPUT_BACKGROUND,
    borderRadius: 10,
    elevation: 3,
  },
  todo: {
    fontSize: widthPercentageToDP(4),
    color: COLOR.PRIMARY_TEXT,
  },
  options: {
    flexDirection: 'row',
    gap: 5,
  },
  addToDoButton: {
    backgroundColor: COLOR.PRIMARY_BUTTON_BG,
    alignSelf: 'flex-start',
    padding: widthPercentageToDP(2),
    borderRadius: widthPercentageToDP(4),
    marginVertical: heightPercentageToDP(2),
  },
  modalView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Background overlay
  },
  modalInput: {
    width: '80%',
    padding: widthPercentageToDP(3),
    marginBottom: heightPercentageToDP(2),
    backgroundColor: 'white',
    borderRadius: 10,
  },
  modalButton: {
    backgroundColor: COLOR.PRIMARY_BUTTON_BG,
    padding: widthPercentageToDP(3),
    borderRadius: widthPercentageToDP(4),
    marginVertical: heightPercentageToDP(1),
  },
});
