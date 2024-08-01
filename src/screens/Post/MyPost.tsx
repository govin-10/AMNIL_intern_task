import {
  ActivityIndicator,
  FlatList,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {AppDispatch, RootState} from '../../redux/store';
import {useDispatch, useSelector} from 'react-redux';
import {addPost, getPostsById} from '../../redux/features/post/postSlice';
import {fetchCurrentUser} from '../../redux/features/auth/authSlice';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {PostComponent, SkeletonLoader} from '../../components';
import {COLOR} from '../../constants';

const MyPost = () => {
  const dispatch: AppDispatch = useDispatch();
  const {posts, loading, error} = useSelector(
    (state: RootState) => state.mypost,
  );
  const {user, status} = useSelector((state: RootState) => state.auth);

  const [postTitle, setPostTitle] = useState<string>('');
  const [postBody, setPostBody] = useState<string>('');
  const [isModalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch]);

  useEffect(() => {
    if (user?.id) {
      dispatch(getPostsById(user?.id ?? 0));
    }
  }, [dispatch]);

  const handleAddNewPost = () => {
    setModalVisible(true);
  };

  const saveNewPost = () => {
    // console.log(postTitle, postBody, user?.id);
    dispatch(addPost({title: postTitle, body: postBody, userId: user?.id}));
    setModalVisible(false);
    setPostBody('');
    setPostTitle('');
  };

  const {myPostContainer} = styles;

  return (
    <ScrollView style={myPostContainer}>
      {posts.length > 0 ? (
        user?.firstName && user?.lastName ? (
          <FlatList
            data={posts}
            renderItem={({item}) => {
              return (
                <PostComponent
                  postInfo={item}
                  editable={true}
                  deleteable={true}
                  userId={user?.id ?? 0}
                />
              );
            }}
            scrollEnabled={false}
          />
        ) : (
          <SkeletonLoader screenType="posts" />
        )
      ) : (
        <Text>No posts found</Text>
      )}
      <TouchableOpacity onPress={() => handleAddNewPost()}>
        <Text style={{color: 'white'}}>Add New</Text>
      </TouchableOpacity>
      <Modal
        visible={isModalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalView}>
          <TextInput
            placeholder="Title"
            placeholderTextColor={'black'}
            // value={editedTodo}
            onChangeText={setPostTitle}
            style={styles.modalInput}
          />
          <TextInput
            placeholder="Body"
            placeholderTextColor={'black'}
            // value={editedTodo}
            onChangeText={setPostBody}
            style={styles.modalInput}
            multiline={true}
          />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              gap: 20,
            }}>
            <TouchableOpacity onPress={saveNewPost} style={styles.modalButton}>
              <Text style={{color: 'white'}}>Add</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={styles.modalButton}>
              <Text style={{color: 'white'}}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default MyPost;

const styles = StyleSheet.create({
  myPostContainer: {
    flex: 1,
    padding: widthPercentageToDP(2),
    // backgroundColor: 'blue',
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
