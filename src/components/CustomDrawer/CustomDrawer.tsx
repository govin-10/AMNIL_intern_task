import {
  ToastAndroid,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';
import {COLOR} from '../../constants';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../redux/store';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import Octicons from 'react-native-vector-icons/Octicons';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {logout} from '../../redux/features/auth/authSlice';
import {showToast} from '../../utils/RNToast/ToastMessage';
import Toast from 'react-native-toast-message';
const CustomDrawer = (props: any) => {
  const dispatch: AppDispatch = useDispatch();

  const handleLogout = async () => {
    dispatch(logout());
    showToast('success', 'logout successful');
    // ToastAndroid.show('logout success', 1000);
  };

  const {
    drawerStyle,
    drawerContainer,
    drawerHeader,
    imageContainer,
    profileImage,
    name,
    email,
    drawerItemListContainer,
    drawerItemList,
    drawerItem,
    logoutContainer,
    logoutText,
  } = styles;

  const {navigation} = props;

  const {user} = useSelector((state: RootState) => state.auth);
  console.log(user);
  //   console.log(props);
  return (
    <DrawerContentScrollView contentContainerStyle={drawerStyle}>
      <View style={drawerContainer}>
        <View style={drawerHeader}>
          <View style={imageContainer}>
            <Image source={{uri: user?.image}} style={profileImage} />
          </View>
          <Text style={name}>
            {user?.firstName} {user?.lastName}
          </Text>
          <Text style={email}>{user?.email}</Text>
        </View>
        <View style={drawerItemListContainer}>
          <View style={drawerItemList}>
            <DrawerItem
              label={'Todos'}
              onPress={() => navigation.navigate('Todos')}
              labelStyle={drawerItem}
              icon={() => (
                <Octicons name="checklist" size={25} color={'black'} />
              )}
              // activeBackgroundColor="blue"
              inactiveTintColor={COLOR.PRIMARY_TEXT}

              // inactiveBackgroundColor={COLOR.PRIMARY_BUTTON_BG}
              // style={drawerItem}
            />
            <DrawerItem
              label={'Posts'}
              onPress={() => navigation.navigate('Posts')}
              labelStyle={[drawerItem]}
              icon={() => <MaterialIcons name="post" size={28} color="black" />}
              //   inactiveBackgroundColor={COLOR.PRIMARY_BUTTON_BG}
              inactiveTintColor={COLOR.PRIMARY_TEXT}
              // style={drawerItem}
            />
          </View>
          <TouchableOpacity style={logoutContainer} onPress={handleLogout}>
            <MaterialIcons name="logout" color="white" size={25} />
            <Text style={logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
    </DrawerContentScrollView>
  );
};

export default CustomDrawer;

const styles = StyleSheet.create({
  drawerStyle: {
    flex: 1,
    padding: 0,
    backgroundColor: COLOR.DRAWER_BACKGROUND,
  },
  drawerContainer: {
    flex: 1,
  },
  drawerHeader: {
    height: heightPercentageToDP(25),
    // backgroundColor: COLOR.PRIMARY_BACKGROUND,
  },
  imageContainer: {
    height: '80%',
  },
  profileImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  name: {
    fontSize: widthPercentageToDP(5),
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
  },
  email: {
    fontSize: widthPercentageToDP(4),
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
  },
  drawerItemListContainer: {
    backgroundColor: COLOR.PRIMARY_BACKGROUND,
    marginTop: heightPercentageToDP(3),
    flex: 1,
    justifyContent: 'space-between',
    padding: heightPercentageToDP(1),
  },
  drawerItemList: {
    marginTop: heightPercentageToDP(3),
  },
  drawerItem: {
    fontSize: widthPercentageToDP(5),
    marginLeft: -20,
  },
  logoutContainer: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    marginBottom: heightPercentageToDP(3),
    backgroundColor: COLOR.PRIMARY_BUTTON_BG,
    padding: 10,
    borderRadius: 20,
    textAlign: 'center',
  },
  logoutText: {
    color: 'white',
    fontSize: widthPercentageToDP(5),
  },
});
