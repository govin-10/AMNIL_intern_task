import {FlatList, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {AppDispatch, RootState} from '../../redux/store';
import {useDispatch, useSelector} from 'react-redux';
import {getPostsById} from '../../redux/features/post/postSlice';
import {fetchCurrentUser} from '../../redux/features/auth/authSlice';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import {PostComponent, SkeletonLoader} from '../../components';

const MyPost = () => {
  const dispatch: AppDispatch = useDispatch();
  const {posts, loading, error} = useSelector(
    (state: RootState) => state.mypost,
  );
  const {user, status} = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch]);

  useEffect(() => {
    if (user?.id) {
      dispatch(getPostsById(user?.id ?? 0));
    }
  }, [dispatch, user]);

  const {myPostContainer} = styles;

  return (
    <ScrollView style={myPostContainer}>
      {posts.length > 0 &&
        (user?.firstName && user?.lastName ? (
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
        ))}
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
});
