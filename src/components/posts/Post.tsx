import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
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
  const [user, setUser] = useState<User | null>(null);

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
          <TouchableOpacity>
            <IconAwesome
              name="edit"
              size={17}
              color={COLOR.PRIMARY_BUTTON_BG}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <IconAnt name="delete" size={20} color={'red'} />
          </TouchableOpacity>
        </View>
      )}
      <View style={authorInfo}>
        <View style={imageContainer}>
          <Image source={{uri: user?.image}} style={profileImage} />
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
            <IconAnt name="like1" size={20} />
            <Text>{postInfo.reactions.likes}</Text>
          </View>
          <View style={flexDisplay}>
            <IconAnt name="dislike1" size={20} />
            <Text>{postInfo.reactions.dislikes}</Text>
          </View>
        </View>
        <View style={flexDisplay}>
          <IconAnt name="eyeo" size={20} />
          <Text>{postInfo.views}</Text>
        </View>
      </View>
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
});
