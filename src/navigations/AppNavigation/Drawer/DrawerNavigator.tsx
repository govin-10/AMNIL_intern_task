import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {PostScreen, ToDoScreen} from '../../../screens';
import BottomTabNavigator from '../BottomTabs/BottomTabNavigator';
import {DrawerContent} from '../../../components';

const DrawerNav = createDrawerNavigator();

const DrawerNavigator: React.FC = () => {
  return (
    <DrawerNav.Navigator
      drawerContent={props => <DrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        drawerPosition: 'right',
        swipeEnabled: false,
      }}>
      <DrawerNav.Screen
        name="BottomTab"
        component={BottomTabNavigator}
        options={{
          drawerItemStyle: {display: 'none'},
        }}
      />
      <DrawerNav.Screen name="Todos" component={ToDoScreen} />
      <DrawerNav.Screen name="Posts" component={PostScreen} />
      <DrawerNav.Screen
        name="Account"
        component={BottomTabNavigator}
        initialParams={{screen: 'Profile'}}
      />
    </DrawerNav.Navigator>
  );
};

export default DrawerNavigator;
