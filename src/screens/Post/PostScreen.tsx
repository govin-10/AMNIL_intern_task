import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import TopTabBar from '../../navigations/AppNavigation/TopTab/TopTabNav';

const PostScreen = () => {
  return (
    <View style={{flex: 1}}>
      <Text>PostScreen</Text>
      <TopTabBar />
    </View>
  );
};

export default PostScreen;

const styles = StyleSheet.create({});
