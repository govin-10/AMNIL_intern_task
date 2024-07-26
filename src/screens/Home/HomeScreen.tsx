import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {AppDispatch} from '../../redux/store';
import {useDispatch} from 'react-redux';
import {logout} from '../../redux/features/auth/authSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Banner, HeaderComponent} from '../../components';
import {COLOR} from '../../constants';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const HomeScreen = ({navigation}: any) => {
  const dispatch: AppDispatch = useDispatch();

  const handleLogout = async () => {
    dispatch(logout());
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('refreshToken');
  };

  const {homeContainer} = styles;

  return (
    <View style={homeContainer}>
      <HeaderComponent navigation={navigation} />
      <View style={styles.bannerContainer}>
        <Banner />
      </View>
      <TouchableOpacity onPress={() => navigation.navigate('Details')}>
        <Text>Go to details</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleLogout}>
        <Text>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
    alignItems: 'flex-start',
    backgroundColor: COLOR.PRIMARY_BACKGROUND,
  },
  bannerContainer: {
    width: wp(100),
    height: hp(25),
  },
});
