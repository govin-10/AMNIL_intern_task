import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {BottomTabParamList} from '../../../types';
import React from 'react';
import {AccountScreen, CartScreen, HomeScreen} from '../../../screens';
import SearchScreen from '../../../screens/Search/SearchScreen';

const BottomTabNav = createBottomTabNavigator<BottomTabParamList>();

const BottomTabNavigator: React.FC = () => {
  return (
    <BottomTabNav.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <BottomTabNav.Screen name="Home" component={HomeScreen} />
      <BottomTabNav.Screen name="Search" component={SearchScreen} />
      <BottomTabNav.Screen name="Cart" component={CartScreen} />
      <BottomTabNav.Screen name="Profile" component={AccountScreen} />
    </BottomTabNav.Navigator>
  );
};

export default BottomTabNavigator;
