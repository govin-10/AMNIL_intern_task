import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {AppDispatch, RootState} from '../../redux/store';
import {useDispatch, useSelector} from 'react-redux';
import {getPostsById} from '../../redux/features/post/postSlice';
import {fetchCurrentUser} from '../../redux/features/auth/authSlice';

const MyPost = () => {
  const dispatch: AppDispatch = useDispatch();
  const {posts, loading, error} = useSelector(
    (state: RootState) => state.mypost,
  );
  const {user} = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getPostsById(user?.id ?? 0));
  }, [dispatch, user]);

  return (
    <View>
      <Text>MyPost</Text>
    </View>
  );
};

export default MyPost;

const styles = StyleSheet.create({});
