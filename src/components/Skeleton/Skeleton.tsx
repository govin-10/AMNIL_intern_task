import {FlatList, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {createShimmerPlaceholder} from 'react-native-shimmer-placeholder';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';

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

    searchSkeletonContainer,
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
});
