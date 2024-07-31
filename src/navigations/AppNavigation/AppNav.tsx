import {StyleSheet} from 'react-native';
import React from 'react';
import DrawerNavigator from './Drawer/DrawerNavigator';
import {createStackNavigator} from '@react-navigation/stack';
import {DetailScreen} from '../../screens';
import {AppStackParamList} from '../../types';

const AppStack = createStackNavigator<AppStackParamList>();

const AppNav = () => {
  return (
    <AppStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <AppStack.Screen name="Drawer" component={DrawerNavigator} />
      <AppStack.Screen name="Details" component={DetailScreen} />
    </AppStack.Navigator>
  );
};

export default AppNav;

const styles = StyleSheet.create({});
