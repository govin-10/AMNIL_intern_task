import {
  Image,
  StyleSheet,
  Text,
  View,
  Linking,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect} from 'react';
import {AppDispatch, RootState} from '../../redux/store';
import {useDispatch, useSelector} from 'react-redux';
import {HeaderComponent} from '../../components';
import {COLOR} from '../../constants';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {logout} from '../../redux/features';
import {showToast} from '../../utils';

const AccountScreen: React.FC = ({navigation}: any) => {
  const {user} = useSelector((state: RootState) => state.auth);
  const dispatch: AppDispatch = useDispatch();

  const goToPhone = (phoneNumber: string) => {
    const url = `tel:${phoneNumber}`;
    Linking.openURL(url).catch(err => console.log(err));
  };

  const goToEmail = (email: string) => {
    const url = `mailto:${email}`;
    Linking.openURL(url).catch(err => console.log(err));
  };

  //as per the requirement, profile ma currentuser ko data fetch garna vaneko thyo, with refresh token implementation,
  //tara user ko data throughout the app chaine vayera home screen mai fetch gareko chha, still tyasko implementation chai:
  // useEffect(()=>{
  //   dispatch(fetchCurrentUser())
  // }, [dispatch])
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
      <HeaderComponent navigation={navigation}>
        {user && (
          <View style={userContent}>
            <Image source={{uri: user?.image}} style={image} />
            <View style={nameSection}>
              <Text style={name}>
                {user?.firstName} {user?.lastName}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  dispatch(logout());
                  showToast('success', 'logout successful');
                }}>
                <MaterialIcon
                  name="logout"
                  size={25}
                  color={COLOR.PRIMARY_BUTTON_BG}
                />
              </TouchableOpacity>
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
                <TouchableOpacity onPress={() => goToEmail(user?.email)}>
                  <Text style={userInfoContent}>{user?.email}</Text>
                </TouchableOpacity>
              </View>
              <View style={userInfoBox}>
                <MaterialIcon name="phone" size={25} color="green" />
                <TouchableOpacity onPress={() => goToPhone(user?.phone)}>
                  <Text style={userInfoContent}>{user?.phone}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      </HeaderComponent>
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
