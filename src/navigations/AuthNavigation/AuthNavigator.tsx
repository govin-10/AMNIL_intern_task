import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {LoginScreen} from '../../screens';

const AuthStackNav = createStackNavigator();

const AuthStackNavigator: React.FC = () => {
  return (
    <AuthStackNav.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <AuthStackNav.Screen name="Login" component={LoginScreen} />
      {/* signup page can be added here */}
    </AuthStackNav.Navigator>
  );
};

export default AuthStackNavigator;
