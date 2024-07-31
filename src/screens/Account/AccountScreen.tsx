import {Image, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
// import { fetchUser } from '../../redux/features/auth/authSlice';
import {AppDispatch, RootState} from '../../redux/store';
import {useDispatch, useSelector} from 'react-redux';
import {fetchCurrentUser} from '../../redux/features/auth/authSlice';
import {HeaderComponent, SkeletonLoader} from '../../components';
import {COLOR} from '../../constants';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

const AccountScreen = ({navigation}: any) => {
  const dispatch: AppDispatch = useDispatch();
  const {user} = useSelector((state: RootState) => state.auth);

  const {
    accountContainer,
    userContent,
    image,
    nameSection,
    name,
    userInfo,
    userInfoBox,
    userInfoContent,
  } = styles;
  return (
    <View style={accountContainer}>
      <View>
        <HeaderComponent navigation={navigation} />
      </View>
      {user && (
        <View style={userContent}>
          <Image source={{uri: user?.image}} style={image} />
          <View style={nameSection}>
            <Text style={name}>
              {user?.firstName} {user?.lastName}
            </Text>
            <MaterialIcon
              name="logout"
              size={25}
              color={COLOR.PRIMARY_BUTTON_BG}
            />
          </View>
          <View style={userInfo}>
            <View style={userInfoBox}>
              <MaterialIcon name="location-pin" size={25} color="red" />
              <Text style={userInfoContent}>
                {user?.address?.address} {user?.address?.city}{' '}
                {user?.address?.state} {user?.address?.country}
              </Text>
            </View>
            <View style={userInfoBox}>
              <MaterialIcon name="email" size={25} color="grey" />
              <Text style={userInfoContent}>{user?.email}</Text>
            </View>
            <View style={userInfoBox}>
              <MaterialIcon name="phone" size={25} color="green" />
              <Text style={userInfoContent}>{user?.phone}</Text>
            </View>
          </View>
        </View>
      )}
      {/* <Text>AccountScreen</Text> */}
    </View>
  );
};

export default AccountScreen;

const styles = StyleSheet.create({
  accountContainer: {
    flex: 1,
    backgroundColor: COLOR.PRIMARY_BACKGROUND,
  },
  userContent: {
    alignItems: 'center',
  },
  image: {
    width: widthPercentageToDP(40),
    height: heightPercentageToDP(19),
    borderRadius: widthPercentageToDP(50),
    borderColor: COLOR.SECONDARY_BUTTON_BG,
    borderWidth: 1,
    marginVertical: heightPercentageToDP(4),
  },
  nameSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: heightPercentageToDP(5),
  },
  name: {
    fontSize: widthPercentageToDP(6),
    fontWeight: 'bold',
    color: COLOR.PRIMARY_TEXT,
  },
  userInfo: {
    width: '100%',
    height: '100%',
    padding: widthPercentageToDP(3),
    // backgroundColor: 'blue',
  },

  userInfoBox: {
    flexDirection: 'row',
    gap: 5,
    marginVertical: heightPercentageToDP(1),
    alignItems: 'center',
  },
  userInfoContent: {
    color: COLOR.PRIMARY_TEXT,
    fontSize: widthPercentageToDP(4.5),
  },
});
