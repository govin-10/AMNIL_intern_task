import {ScrollView, StyleSheet, Text, View, RefreshControl} from 'react-native';
import React, {useEffect, useState} from 'react';
import {AppDispatch, RootState} from '../../redux/store';
import {useDispatch, useSelector} from 'react-redux';
import {fetchFeedPosts} from '../../redux/features/post/postSlice';

const FeedPost = () => {
  const dispatch: AppDispatch = useDispatch();
  const {posts, loading, error} = useSelector(
    (state: RootState) => state.feedpost,
  );
  const {user} = useSelector((state: RootState) => state.auth);

  const [skip, setSkip] = useState<number>(0);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  useEffect(() => {
    dispatch(fetchFeedPosts(skip));
  }, [dispatch, skip]);

  const controlRefresh = () => {
    setRefreshing(true);
    setSkip(prev => prev + 1);
    setRefreshing(false);
  };

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={controlRefresh} />
      }>
      <Text>FeedPost</Text>
      {posts.length > 0 ? (
        posts.map(post => {
          return <Text>{post.title}</Text>;
        })
      ) : (
        <Text>loading</Text>
      )}
    </ScrollView>
  );
};

export default FeedPost;

const styles = StyleSheet.create({});
