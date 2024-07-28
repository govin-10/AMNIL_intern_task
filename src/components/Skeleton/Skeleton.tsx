import {StyleSheet, Text, View} from 'react-native';
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
    skeletonContainer,
    imageSection,
    userInfoSection,
    nameSection,
    userInfo,
    innerContent,
  } = styles;

  switch (screenType) {
    case 'account':
      return (
        <View style={skeletonContainer}>
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
            {/* <ShimmerPlaceholder style={phone} /> */}
            {/* <ShimmerPlaceholder style={email} /> */}
          </View>
          {/* <View style={imageSection}></View> */}
        </View>
      );
  }
  //   return (
  //     <View>
  //       <Text>Skeleton</Text>
  //     </View>
  //   )
};

export default Skeleton;

const styles = StyleSheet.create({
  skeletonContainer: {
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
});
