import {FlatList, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {createShimmerPlaceholder} from 'react-native-shimmer-placeholder';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {COLOR} from '../../constants';

type SkeletonProps = {
  screenType: string;
};

const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);

const Skeleton = ({screenType}: SkeletonProps) => {
  const {
    accountSkeletonContainer,
    imageSection,
    userInfoSection,
    nameSection,
    userInfo,
    innerContent,

    detailContainer,
    imageContainer,
    title,
    description,
    price,
    ratingFavContainer,
    starContainer,
    stockInfo,
    cartContainer,
    incDecContainer,
    addCartButton,
    incdecButton,
    cartNum,
    addCartText,
    specificationContainer,
    specHeader,
    specContain,
    specTitle,
    specValue,
  } = styles;

  switch (screenType) {
    case 'account':
      return (
        <View style={accountSkeletonContainer}>
          <ShimmerPlaceholder style={imageSection}></ShimmerPlaceholder>
          <ShimmerPlaceholder style={nameSection}></ShimmerPlaceholder>
          <View style={userInfoSection}>
            <ShimmerPlaceholder style={userInfo}>
              <ShimmerPlaceholder style={innerContent} />
            </ShimmerPlaceholder>
            <ShimmerPlaceholder style={userInfo}>
              <ShimmerPlaceholder style={innerContent} />
            </ShimmerPlaceholder>
            <ShimmerPlaceholder style={userInfo}>
              <ShimmerPlaceholder style={innerContent} />
            </ShimmerPlaceholder>
          </View>
        </View>
      );

    case 'searchLoader':
      const renderItem = () => (
        <View style={styles.searchItem}>
          <ShimmerPlaceholder style={styles.searchItemImage} />
          <View style={styles.searchItemTextContainer}>
            <ShimmerPlaceholder style={styles.searchItemText} />
            <ShimmerPlaceholder style={styles.searchItemText} />
          </View>
        </View>
      );

      return (
        <View style={styles.searchSkeletonContainer}>
          <FlatList
            data={[{}, {}, {}, {}, {}]} // Dummy data to render skeletons
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      );

    case 'detailLoader':
      return (
        <View style={detailContainer}>
          <ShimmerPlaceholder style={imageContainer}></ShimmerPlaceholder>
          <ShimmerPlaceholder style={title}></ShimmerPlaceholder>
          <ShimmerPlaceholder style={description}></ShimmerPlaceholder>
          <ShimmerPlaceholder style={price}></ShimmerPlaceholder>
          <ShimmerPlaceholder style={ratingFavContainer}></ShimmerPlaceholder>
          <View>
            <ShimmerPlaceholder style={specHeader}></ShimmerPlaceholder>
            <ShimmerPlaceholder style={specContain}></ShimmerPlaceholder>
            <ShimmerPlaceholder style={specContain}></ShimmerPlaceholder>
            <ShimmerPlaceholder style={specContain}></ShimmerPlaceholder>
          </View>
        </View>
      );
  }
};

export default Skeleton;

const styles = StyleSheet.create({
  accountSkeletonContainer: {
    flex: 1,
    width: '100%',
    // justifyContent: 'center',
    alignItems: 'center',
  },
  imageSection: {
    width: widthPercentageToDP(40),
    height: heightPercentageToDP(20),
    borderRadius: widthPercentageToDP(40),
    marginVertical: widthPercentageToDP(5),
  },
  nameSection: {
    width: '50%',
    height: '5%',
  },
  userInfoSection: {
    flex: 1,
    width: '100%',
    marginTop: heightPercentageToDP(5),
    paddingHorizontal: widthPercentageToDP(5),
  },
  userInfo: {
    width: '100%',
    height: heightPercentageToDP(5),
    marginVertical: heightPercentageToDP(1),
  },
  innerContent: {
    width: '100%',
    height: '100%',
  },

  searchSkeletonContainer: {
    flex: 1,
    width: '100%',
  },
  searchItem: {
    flexDirection: 'row',
    gap: 10,
    marginVertical: heightPercentageToDP(1),
  },
  searchItemImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  searchItemTextContainer: {
    flex: 1,
  },
  searchItemText: {
    height: 20,
    marginBottom: 5,
    borderRadius: 4,
  },
  detailContainer: {
    flex: 1,
    padding: widthPercentageToDP(2),
    backgroundColor: COLOR.PRIMARY_BACKGROUND,
  },

  imageContainer: {
    width: '100%',
    height: heightPercentageToDP(25),

    marginBottom: heightPercentageToDP(1),
  },

  title: {
    width: '100%',
    height: heightPercentageToDP(3),
  },
  description: {
    width: '100%',
    height: heightPercentageToDP(7),
    marginVertical: heightPercentageToDP(1),
  },
  price: {
    fontSize: widthPercentageToDP(5),
    height: heightPercentageToDP(4),
  },
  ratingFavContainer: {
    width: '100%',
    height: heightPercentageToDP(5),
    marginVertical: widthPercentageToDP(4),
  },
  starContainer: {
    flexDirection: 'row',
  },
  stockInfo: {
    color: 'white',
    fontSize: widthPercentageToDP(4.5),
    fontWeight: '600',
    alignSelf: 'flex-start',
    padding: heightPercentageToDP(1),
  },
  cartContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: heightPercentageToDP(2),
    alignItems: 'center',
  },
  incDecContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: widthPercentageToDP(3),
  },
  addCartButton: {
    backgroundColor: COLOR.SECONDARY_BUTTON_BG,
    flexDirection: 'row',
    gap: widthPercentageToDP(2.5),
    alignItems: 'center',
    padding: heightPercentageToDP(1),
  },
  incdecButton: {
    backgroundColor: COLOR.INPUT_BACKGROUND,
    padding: widthPercentageToDP(3),
    // paddingVertical: heightPercentageToDP(1),
    borderRadius: widthPercentageToDP(5),
    fontSize: widthPercentageToDP(5),
    fontWeight: 'bold',
  },
  cartNum: {
    fontSize: widthPercentageToDP(5),
  },
  addCartText: {
    fontSize: widthPercentageToDP(4.5),
    color: 'white',
  },
  specificationContainer: {},
  specHeader: {
    height: heightPercentageToDP(5),
    marginBottom: heightPercentageToDP(1.5),
  },
  specContain: {
    width: '100%',
    height: heightPercentageToDP(4),
    borderBottomWidth: 1,
    borderBottomColor: COLOR.SECONDARY_TEXT,
    marginBottom: heightPercentageToDP(1.5),
    paddingBottom: heightPercentageToDP(1),
  },
  specTitle: {
    color: COLOR.PRIMARY_TEXT,
    // fontSize: widthPercentageToDP(4),
  },
  specValue: {
    // fontSize: widthPercentageToDP(4),

    color: COLOR.SECONDARY_TEXT,
  },
});
