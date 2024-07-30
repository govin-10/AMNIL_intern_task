import {
  FlatList,
  Image,
  ImageSourcePropType,
  StyleSheet,
  View,
} from 'react-native';
import React from 'react';
import {banners_image} from '../../utils/ImagePaths/ImagePaths';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

interface ISliderProps {
  image: ImageSourcePropType;
}

const Slider: React.FC<ISliderProps> = ({image}) => {
  return (
    <View style={styles.imageContainer}>
      <Image source={image} style={styles.image} />
    </View>
  );
};

const Banner: React.FC = () => {
  return (
    <View style={styles.bannerContainer}>
      <FlatList
        data={banners_image}
        horizontal
        keyExtractor={(_, index) => `images${index}`}
        renderItem={({item}) => <Slider image={item} />}
        pagingEnabled
      />
    </View>
  );
};

export default Banner;

const styles = StyleSheet.create({
  bannerContainer: {
    width: wp(100),
    height: hp(25),
  },
  imageContainer: {
    flex: 1,
    width: wp(100),
    height: hp(25),
    padding: 5,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover', // Adjust the image resize mode if needed
  },
});
