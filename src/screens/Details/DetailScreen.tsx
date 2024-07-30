import {Image, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {RouteProp, useRoute} from '@react-navigation/native';
import {AppStackParamList} from '../../types';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../redux/store';
import {fetchProductsById} from '../../redux/features/products/productSlice';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import IoniIcons from 'react-native-vector-icons/Ionicons';
import {COLOR} from '../../constants';
import {SkeletonLoader} from '../../components';

type DetailScreenRouteProp = RouteProp<AppStackParamList, 'Details'>;

const DetailScreen = () => {
  const route = useRoute<DetailScreenRouteProp>();
  const {id} = route.params;

  const {product, loading, error} = useSelector(
    (state: RootState) => state.product,
  );
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    if (id) {
      dispatch(fetchProductsById(id));
    }
  }, [dispatch, id]);

  const goback = () => {
    console.log('go back pressed');
  };

  const renderRating = (rating: number) => {
    const stars = [];

    for (let i = 0; i < 5; i++) {
      console.log(rating);
      console.log(Math.floor(rating));
      stars.push(
        <IoniIcons
          name={i < Math.floor(rating) ? 'star' : 'star-outline'}
          size={25}
        />,
      );
    }

    return <View style={starContainer}>{stars}</View>;
  };

  const {
    detailContainer,
    backIcon,
    imageContainer,
    image,
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
  return (
    <View style={detailContainer}>
      <TouchableOpacity style={backIcon} onPress={goback}>
        <IoniIcons name="arrow-back" size={25} color={'black'} />
        {/* <Text>{'<'}</Text> */}
      </TouchableOpacity>
      {loading ? (
        <SkeletonLoader screenType="detailLoader" />
      ) : (
        <View>
          <View style={imageContainer}>
            <Image source={{uri: product?.images[0]}} style={image} />
          </View>
          <Text style={title}>{product?.title}</Text>
          <Text style={description}>{product?.description}</Text>
          <Text style={price}>Rs.{product?.price}</Text>
          <View style={ratingFavContainer}>
            {renderRating(product?.rating)}
            <IoniIcons name="heart-outline" size={25} color={'black'} />
          </View>
          <Text
            style={[
              stockInfo,
              {
                backgroundColor:
                  product?.availabilityStatus === 'In Stock'
                    ? 'green'
                    : product?.availabilityStatus === 'Low Stock'
                    ? 'orange'
                    : 'red',
              },
            ]}>
            Stock Quantity: {product?.stock}
          </Text>
          <View style={cartContainer}>
            <View style={incDecContainer}>
              <Text style={incdecButton}>-</Text>
              <Text style={cartNum}>1</Text>
              <Text style={incdecButton}>+</Text>
            </View>
            <View style={addCartButton}>
              <IoniIcons name="cart" size={30} color={'black'} />
              <Text style={addCartText}>Add to Cart</Text>
            </View>
          </View>
          <View style={specificationContainer}>
            <Text style={specHeader}>Specifications</Text>
            <View style={specContain}>
              <Text style={specTitle}>Warranty: </Text>
              <Text style={specValue}>{product?.warrantyInformation}</Text>
            </View>
            <View style={specContain}>
              <Text style={specTitle}>Shipping: </Text>
              <Text style={specValue}>{product?.shippingInformation}</Text>
            </View>
            <View style={specContain}>
              <Text style={specTitle}>Warranty: </Text>
              <Text style={specValue}>{product?.warrantyInformation}</Text>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

export default DetailScreen;

const styles = StyleSheet.create({
  detailContainer: {
    flex: 1,
    padding: widthPercentageToDP(2),
    backgroundColor: COLOR.PRIMARY_BACKGROUND,
  },
  backIcon: {
    marginVertical: heightPercentageToDP(1.5),
  },
  imageContainer: {
    width: '100%',
    height: heightPercentageToDP(25),
    // backgroundColor: 'red',
    // borderRadius: widthPercentageToDP(2),
    // borderWidth: 1,
    elevation: 2,
    marginBottom: heightPercentageToDP(1),
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  title: {
    fontSize: widthPercentageToDP(5.5),
    color: COLOR.PRIMARY_TEXT,
    fontWeight: '600',
  },
  description: {
    fontSize: widthPercentageToDP(3.5),
    marginVertical: heightPercentageToDP(1),
  },
  price: {
    fontSize: widthPercentageToDP(5),
    fontWeight: 'bold',
    color: COLOR.PRIMARY_TEXT,
  },
  ratingFavContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
    fontSize: widthPercentageToDP(5),
    fontWeight: '600',
    color: COLOR.PRIMARY_TEXT,
    marginBottom: heightPercentageToDP(1.5),
  },
  specContain: {
    flexDirection: 'row',
    gap: widthPercentageToDP(2),
    alignItems: 'center',
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
