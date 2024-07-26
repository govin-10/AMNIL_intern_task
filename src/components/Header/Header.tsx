import {
  Image,
  SafeAreaView,
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
}

const Header: React.FC<IHeaderProps> = ({navigation}) => {
  const {headerContainer, name, logo, accountIcon} = styles;

  return (
    <View style={headerContainer}>
      {/* <View style={logoContainer}> */}
      <Image source={IMAGE_PATH.icon} style={logo} />
      {/* </View> */}

      <Text style={name}>Amnilite</Text>
      <TouchableOpacity onPress={() => navigation.openDrawer()}>
        <MaterialIcon
          name="account"
          size={wp(8)}
          color="black"
          style={accountIcon}
        />
      </TouchableOpacity>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  headerContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 1,
    paddingHorizontal: wp(1),
    backgroundColor: COLOR.CARD_BACKGROUND,
  },

  logo: {
    width: 50,
    height: hp(8),
  },
  name: {
    color: COLOR.PRIMARY_TEXT,
    fontSize: wp(6),
  },
  accountIcon: {
    paddingRight: wp(3),
  },
});
