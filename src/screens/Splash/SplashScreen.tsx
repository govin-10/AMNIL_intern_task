import React, {useEffect, useRef} from 'react';
import {Animated, SafeAreaView, StyleSheet, Image} from 'react-native';
import {IMAGE_PATH} from '../../utils/ImagePaths/ImagePaths';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {COLOR} from '../../constants';

const SplashScreen: React.FC = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View style={{...styles.imageLogo, opacity: fadeAnim}}>
        <Image source={IMAGE_PATH.logo} style={styles.image} />
      </Animated.View>
    </SafeAreaView>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLOR.PRIMARY_BACKGROUND,
  },
  imageLogo: {
    width: wp(38),
    height: hp(28),
  },
  image: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
  },
});
