import {
  FlatList,
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import {IMAGE_PATH} from '../../utils/ImagePaths/ImagePaths';
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
  const banners = [IMAGE_PATH.banner1, IMAGE_PATH.banner2, IMAGE_PATH.banner3];
  return (
    <View style={styles.flatListContainer}>
      <FlatList
        data={banners}
        renderItem={({item}) => {
          return <Slider image={item} />;
        }}
        horizontal
        pagingEnabled
      />
    </View>
  );
};

export default Banner;

const styles = StyleSheet.create({
  flatListContainer: {
    width: '100%',

    alignItems: 'center',
    backgroundColor: 'blue',
  },
  imageContainer: {
    padding: wp(2),
    alignItems: 'center',
  },
  image: {
    width: wp(100),
    height: '100%',
  },
});
