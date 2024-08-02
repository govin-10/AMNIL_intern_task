import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import {COLOR} from '../../constants';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../redux/store';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {logout} from '../../redux/features';
import {showToast} from '../../utils';

const CustomDrawer = (props: any) => {
  const {navigation} = props;
  const {user} = useSelector((state: RootState) => state.auth);

  const dispatch: AppDispatch = useDispatch();

  const handleLogout = async () => {
    dispatch(logout());
    showToast('success', 'logout successful');
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
                <MaterialIcons
                  name="clipboard-list"
                  size={25}
                  color={'black'}
                />
              )}
              inactiveTintColor={COLOR.PRIMARY_TEXT}
            />
            <DrawerItem
              label={'Posts'}
              onPress={() => navigation.navigate('Posts')}
              labelStyle={[drawerItem]}
              icon={() => <MaterialIcons name="post" size={28} color="black" />}
              inactiveTintColor={COLOR.PRIMARY_TEXT}
            />
            <DrawerItem
              label={'Account'}
              onPress={() => navigation.navigate('Profile')}
              labelStyle={[drawerItem]}
              icon={() => (
                <MaterialIcons name="account" size={28} color="black" />
              )}
              inactiveTintColor={COLOR.PRIMARY_TEXT}
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
