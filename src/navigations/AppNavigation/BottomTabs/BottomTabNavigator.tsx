import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {BottomTabParamList} from '../../../types';
import React from 'react';
import {AccountScreen, CartScreen, HomeScreen} from '../../../screens';
import SearchScreen from '../../../screens/Search/SearchScreen';
import AntIcon from 'react-native-vector-icons/AntDesign';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {StyleSheet} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {COLOR} from '../../../constants';

const BottomTabNav = createBottomTabNavigator<BottomTabParamList>();

const BottomTabNavigator: React.FC = () => {
  return (
    <BottomTabNav.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,

        tabBarStyle: styles.tabStyle,
      }}>
      <BottomTabNav.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <AntIcon
                name="appstore-o"
                size={25}
                color={
                  focused ? COLOR.ACTIVE_TAB_ICON : COLOR.INACTIVE_TAB_ICON
                }
              />
            );
          },
        }}
      />
      <BottomTabNav.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <AntIcon
                name="search1"
                size={wp(6.5)}
                color={
                  focused ? COLOR.ACTIVE_TAB_ICON : COLOR.INACTIVE_TAB_ICON
                }
              />
            );
          },
        }}
      />
      <BottomTabNav.Screen
        name="Cart"
        component={CartScreen}
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <AntIcon
                name="shoppingcart"
                size={wp(7)}
                color={
                  focused ? COLOR.ACTIVE_TAB_ICON : COLOR.INACTIVE_TAB_ICON
                }
              />
            );
          },
        }}
      />
      <BottomTabNav.Screen
        name="Profile"
        component={AccountScreen}
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <MaterialIcon
                name="account"
                size={wp(7.5)}
                color={
                  focused ? COLOR.ACTIVE_TAB_ICON : COLOR.INACTIVE_TAB_ICON
                }
              />
            );
          },
        }}
      />
    </BottomTabNav.Navigator>
  );
};

export default BottomTabNavigator;

const styles = StyleSheet.create({
  tabStyle: {
    height: hp(7.5),
    elevation: 10,
    backgroundColor: COLOR.CARD_BACKGROUND,
  },
});
