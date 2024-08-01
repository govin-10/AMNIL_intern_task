import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {ReactNode} from 'react';
import {IMAGE_PATH} from '../../utils/ImagePaths/ImagePaths';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {COLOR} from '../../constants';

interface IHeaderProps {
  navigation: any;
  children: ReactNode;
}

const Header: React.FC<IHeaderProps> = ({navigation, children}) => {
  const {pageWrapper, headerContainer, logoContainer, name, logo, accountIcon} =
    styles;

  return (
    <SafeAreaView style={pageWrapper}>
      <View style={headerContainer}>
        <View style={logoContainer}>
          <Image source={IMAGE_PATH.logo} style={logo} />
        </View>

        <Text style={name}>Amnilite</Text>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <MaterialIcon
            name="menu"
            size={wp(6)}
            color="black"
            style={accountIcon}
          />
        </TouchableOpacity>
      </View>
      {children}
    </SafeAreaView>
  );
};

export default Header;

const styles = StyleSheet.create({
  pageWrapper: {
    flex: 1,
    width: '100%',
  },
  headerContainer: {
    width: '100%',
    height: hp(6),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 1,
    paddingHorizontal: wp(1),
    backgroundColor: COLOR.CARD_BACKGROUND,
  },
  logoContainer: {
    height: '100%',
    width: wp(5),
    justifyContent: 'center',
    alignSelf: 'center',
    marginLeft: wp(2),
  },
  logo: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  name: {
    color: COLOR.PRIMARY_TEXT,
    fontSize: wp(5),
  },
  accountIcon: {
    paddingRight: wp(3),
  },
});
