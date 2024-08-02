import {
  Image,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {post} from '../../types/post/postTypes';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '../../redux/store';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {COLOR} from '../../constants';
import IconAwesome from 'react-native-vector-icons/FontAwesome5';
import IconAnt from 'react-native-vector-icons/AntDesign';
import {api} from '../../utils';
import {User} from '../../types/auth/AuthTypes';
import {removePost, updatePost} from '../../redux/features/post/postSlice';
import {IMAGE_PATH} from '../../utils/ImagePaths/ImagePaths';

interface IPostProps {
  postInfo: post;
  editable: boolean;
  deleteable: boolean;
  userId: number;
}

const Post: React.FC<IPostProps> = ({
  postInfo,
  editable,
  deleteable,
  userId,
}) => {
  const dispatch: AppDispatch = useDispatch();

  const [user, setUser] = useState<User | null>(null);
  const [isModalVisible, setModalVisible] = useState<boolean>(false);
  const [id, setId] = useState<number>(0);
  const [title, setTitle] = useState<string>('');
  const [body, setBody] = useState<string>('');

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await api.get(`/users/${userId}`);
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user: ', error);
      }
    };

    if (userId) {
      getUser();
    }
  }, [userId]);

  const handleEditPost = (post: any) => {
    console.log(post);
    setBody(post.body);
    setTitle(post.title);
    setId(post.id);
    setModalVisible(true);
  };

  const handleSaveEdit = () => {
    console.log(title, body, id);
    dispatch(updatePost({id, title, body}));
    setModalVisible(false); // Hide the modal
    setId(0); // Clear selectedTodo
    setTitle('');
    setBody('');
  };

  const {
    postContainer,
    options,
    authorInfo,
    imageContainer,
    profileImage,
    name,
    postDetail,
    postTitle,
    postBody,
    postStats,
    flexDisplay,
    reactions,
  } = styles;

  return (
    <View style={postContainer}>
      {editable && deleteable && (
        <View style={options}>
          <TouchableOpacity onPress={() => handleEditPost(postInfo)}>
            <IconAwesome
              name="edit"
              size={17}
              color={COLOR.PRIMARY_BUTTON_BG}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => dispatch(removePost(postInfo.id))}>
            <IconAnt name="delete" size={20} color={'red'} />
          </TouchableOpacity>
        </View>
      )}
      <View style={authorInfo}>
        <View style={imageContainer}>
          <Image
            source={user?.image ? {uri: user?.image} : IMAGE_PATH.logo}
            style={profileImage}
          />
        </View>
        <View>
          <Text style={name}>
            {user?.firstName} {user?.lastName}
          </Text>
        </View>
      </View>
      <View style={postDetail}>
        <Text style={postTitle}>{postInfo.title}</Text>
        <Text style={postBody}>{postInfo.body}</Text>
      </View>
      <View style={postStats}>
        <View style={reactions}>
          <View style={flexDisplay}>
            <IconAnt name="like1" size={20} color={'gray'} />
            <Text style={{color: COLOR.PRIMARY_TEXT}}>
              {postInfo.reactions.likes}
            </Text>
          </View>
          <View style={flexDisplay}>
            <IconAnt name="dislike1" size={20} color={'gray'} />
            <Text style={{color: COLOR.PRIMARY_TEXT}}>
              {postInfo.reactions.dislikes}
            </Text>
          </View>
        </View>
        <View style={flexDisplay}>
          <IconAnt name="eyeo" size={20} color={'gray'} />
          <Text style={{color: COLOR.PRIMARY_TEXT}}>{postInfo.views}</Text>
        </View>
      </View>
      <Modal
        visible={isModalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalView}>
          <TextInput
            value={title}
            onChangeText={setTitle}
            style={styles.modalInput}
          />
          <TextInput
            value={body}
            onChangeText={setBody}
            multiline={true}
            style={[styles.modalInput]}
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

export default Post;

const styles = StyleSheet.create({
  flexDisplay: {flexDirection: 'row', alignItems: 'flex-end', gap: 5},
  postContainer: {
    width: '100%',
    // height: heightPercentageToDP(25),
    backgroundColor: COLOR.CARD_BACKGROUND,
    padding: widthPercentageToDP(1),
    paddingVertical: heightPercentageToDP(2),
    margin: 2,
  },
  options: {
    alignSelf: 'flex-end',
    flexDirection: 'row',
    alignItems: 'center',
    gap: widthPercentageToDP(2),
  },
  authorInfo: {
    flexDirection: 'row',
    gap: widthPercentageToDP(3),
  },
  imageContainer: {
    width: 40,
    height: 40,
    borderRadius: 100,
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  name: {
    fontSize: widthPercentageToDP(4),
    color: COLOR.PRIMARY_TEXT,
  },
  postDetail: {
    marginVertical: heightPercentageToDP(1),
  },
  postTitle: {
    fontSize: widthPercentageToDP(4),
    fontWeight: 'bold',
    textTransform: 'uppercase',
    color: COLOR.PRIMARY_TEXT,
    marginVertical: heightPercentageToDP(1),
  },
  postBody: {color: COLOR.SECONDARY_TEXT},
  postStats: {
    backgroundColor: COLOR.PRIMARY_BACKGROUND,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: widthPercentageToDP(3),
  },
  reactions: {
    flexDirection: 'row',
    gap: widthPercentageToDP(4),
  },
  modalView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Background overlay
    padding: 10,
  },
  modalInput: {
    width: '100%',
    padding: widthPercentageToDP(3),
    marginBottom: heightPercentageToDP(2),
    backgroundColor: 'white',
    borderRadius: 10,
  },
  modalButton: {
    backgroundColor: COLOR.PRIMARY_BUTTON_BG,
    padding: widthPercentageToDP(2),
    borderRadius: widthPercentageToDP(4),
    marginVertical: heightPercentageToDP(1),
  },
});
