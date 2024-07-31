import {Image, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {RouteProp, useRoute} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../redux/store';
import {
  decreaseStock,
  fetchProductsById,
  increaseStock,
  resetProductState,
} from '../../redux/features/products/productSlice';
import IoniIcons from 'react-native-vector-icons/Ionicons';
import {COLOR} from '../../constants';
import {SkeletonLoader} from '../../components';
import {addToCart} from '../../redux/features/cart/cartSlice';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {AppStackParamList} from '../../types';

type DetailScreenRouteProp = RouteProp<AppStackParamList, 'Details'>;

const DetailScreen: React.FC = () => {
  const route = useRoute<DetailScreenRouteProp>();
  const {id} = route.params;

  const {product, stock, loading} = useSelector(
    (state: RootState) => state.product,
  );
  const dispatch: AppDispatch = useDispatch();

  const [quantity, setQuantity] = useState<number>(1);

  useEffect(() => {
    if (id) {
      dispatch(resetProductState()); // Reset product state before fetching new data, purano state lai clear garna
      dispatch(fetchProductsById(id));
    }
  }, [dispatch, id]);

  const renderRating = (rating: number) => {
    return (
      <View style={styles.starContainer}>
        {[...Array(5)].map((_, i) => (
          <IoniIcons
            key={i}
            name={i < Math.floor(rating) ? 'star' : 'star-outline'}
            size={25}
          />
        ))}
      </View>
    );
  };

  const increaseQuantity = () => {
    setQuantity(prev => Math.min(prev + 1, 10));
    dispatch(decreaseStock(quantity));
  };
  const decreaseQuantity = () => {
    setQuantity(prev => Math.max(prev - 1, 1));
    dispatch(increaseStock(quantity));
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
      <TouchableOpacity style={backIcon}>
        <IoniIcons name="arrow-back" size={25} color={'black'} />
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
          <Text style={price}>${product?.price}</Text>
          <View style={ratingFavContainer}>
            {renderRating(product?.rating ?? 0)}
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
            Stock Quantity: {stock}
          </Text>
          <View style={cartContainer}>
            <View style={incDecContainer}>
              <TouchableOpacity onPress={decreaseQuantity}>
                <Text style={incdecButton}>-</Text>
              </TouchableOpacity>
              <Text style={cartNum}>{quantity}</Text>
              <TouchableOpacity onPress={increaseQuantity}>
                <Text style={incdecButton}>+</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={addCartButton}
              onPress={() => dispatch(addToCart({product, quantity}))}>
              <IoniIcons name="cart" size={30} color={'white'} />
              <Text style={addCartText}>Add to Cart</Text>
            </TouchableOpacity>
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
  },
  specValue: {
    color: COLOR.SECONDARY_TEXT,
  },
});
