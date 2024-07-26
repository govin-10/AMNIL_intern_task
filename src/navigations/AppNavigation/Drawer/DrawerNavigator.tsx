import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {PostScreen, ToDoScreen} from '../../../screens';
import BottomTabNavigator from '../BottomTabs/BottomTabNavigator';

const DrawerNav = createDrawerNavigator();

const DrawerNavigator: React.FC = () => {
  return (
    <DrawerNav.Navigator
      screenOptions={{
        headerShown: false,
        drawerPosition: 'right',
      }}>
      <DrawerNav.Screen name="BottomTab" component={BottomTabNavigator} />
      <DrawerNav.Screen name="Todos" component={ToDoScreen} />
      <DrawerNav.Screen name="Posts" component={PostScreen} />
      {/* <DrawerNav.Screen name='Account' component={}/> */}
    </DrawerNav.Navigator>
  );
};

export default DrawerNavigator;
