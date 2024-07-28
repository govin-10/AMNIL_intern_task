import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {RouteProp, useRoute} from '@react-navigation/native';
import {AppStackParamList} from '../../types';

type DetailScreenRouteProp = RouteProp<AppStackParamList, 'Details'>;

const DetailScreen = () => {
  const route = useRoute<DetailScreenRouteProp>();
  // const {id} = route
  console.log(route);
  return (
    <View>
      <Text>DetailScreen</Text>
    </View>
  );
};

export default DetailScreen;

const styles = StyleSheet.create({});
