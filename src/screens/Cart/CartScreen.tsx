import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../redux';
import {HeaderComponent} from '../../components';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {COLOR} from '../../constants';
import {
  increaseCart,
  decreaseCart,
  removeCart,
  clearCart,
} from '../../redux/features';
import {Button} from '../../utils';
import {showToast} from '../../utils';
import AntIcon from 'react-native-vector-icons/AntDesign';
// import showToast from "../../utils"

const CartScreen = ({navigation}: any) => {
  const {cart, cartTotalPrice} = useSelector((state: RootState) => state.cart);
  const dispatch: AppDispatch = useDispatch();

  const {
    cartPage,
    cartContainer,
    headerText,
    cartCollection,
    cartItemContainer,
    imageContainer,
    cartThumbnail,
    itemInfo,
    itemName,
    footer,
    updateQuantSection,
    quantity,
    updateButton,
    total,
    totalContent,
    emptyCart,
  } = styles;

  return (
    <View style={cartPage}>
      <HeaderComponent navigation={navigation}>
        <ScrollView style={cartContainer}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={headerText}>Cart</Text>
            <TouchableOpacity onPress={() => dispatch(clearCart())}>
              <Text style={{color: COLOR.PRIMARY_TEXT}}>Clear All</Text>
            </TouchableOpacity>
          </View>
          <View style={cartCollection}>
            {cart.length > 0 ? (
              <>
                {cart.map(cartItem => {
                  return (
                    <View key={cartItem.id} style={cartItemContainer}>
                      <View style={imageContainer}>
                        <Image
                          style={cartThumbnail}
                          source={{uri: cartItem.thumbnail}}
                        />
                      </View>
                      <View style={itemInfo}>
                        <View>
                          <Text style={itemName}>{cartItem.title}</Text>
                          <Text style={{color: 'black'}}>
                            Stock left: {cartItem.stock}
                          </Text>
                        </View>
                        <View style={footer}>
                          <Text style={{color: 'black'}}>
                            ${cartItem.discountedTotal.toFixed(2)}
                          </Text>
                          <View style={updateQuantSection}>
                            <TouchableOpacity
                              onPress={() => dispatch(decreaseCart(cartItem))}>
                              <Text style={updateButton}>-</Text>
                            </TouchableOpacity>
                            <Text style={quantity}>{cartItem.quantity}</Text>
                            <TouchableOpacity
                              onPress={() => dispatch(increaseCart(cartItem))}>
                              <Text style={updateButton}>+</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                              onPress={() =>
                                dispatch(removeCart({id: cartItem.id}))
                              }
                              style={{marginLeft: 10, paddingLeft: 5}}>
                              <AntIcon name="delete" color={'red'} size={20} />
                            </TouchableOpacity>
                          </View>
                        </View>
                      </View>
                    </View>
                  );
                })}
              </>
            ) : (
              <Text style={emptyCart}>Nothing in cart for now...</Text>
            )}
          </View>
          <View style={total}>
            <Text style={totalContent}>Total:</Text>
            <Text style={totalContent}>${cartTotalPrice.toFixed(2)}</Text>
          </View>
          <Button
            title="Checkout"
            onPress={() => showToast('error', 'feature under maintenance')}
            style={{marginVertical: heightPercentageToDP(1)}}
          />
        </ScrollView>
      </HeaderComponent>
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  cartPage: {
    flex: 1,
  },
  cartContainer: {
    padding: widthPercentageToDP(2),
  },
  headerText: {
    fontSize: widthPercentageToDP(6),
    color: COLOR.PRIMARY_TEXT,
  },
  cartCollection: {
    borderBottomWidth: 1,
    marginBottom: heightPercentageToDP(2),
  },
  cartItemContainer: {
    flexDirection: 'row',
    gap: widthPercentageToDP(3),
    width: '100%',
    marginVertical: heightPercentageToDP(2),
  },
  imageContainer: {
    width: widthPercentageToDP(14),
    height: heightPercentageToDP(7),
  },
  cartThumbnail: {
    width: '100%',
    height: '100%',
  },
  itemInfo: {
    flex: 1,
    justifyContent: 'space-between',
  },
  itemName: {
    color: COLOR.PRIMARY_TEXT,
    fontSize: widthPercentageToDP(4),
    fontWeight: 'bold',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  updateQuantSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  quantity: {
    fontSize: widthPercentageToDP(4),
    color: COLOR.PRIMARY_TEXT,
  },
  updateButton: {
    backgroundColor: COLOR.PRIMARY_BUTTON_BG,
    paddingVertical: widthPercentageToDP(1),
    paddingHorizontal: widthPercentageToDP(2.5),
    borderRadius: 50,
    fontSize: widthPercentageToDP(4),
    color: 'white',
  },
  total: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: widthPercentageToDP(3),
    alignItems: 'center',
  },
  totalContent: {
    color: COLOR.PRIMARY_TEXT,
    fontSize: widthPercentageToDP(5),
  },
  emptyCart: {
    color: COLOR.PRIMARY_TEXT,
    alignSelf: 'center',
    fontSize: widthPercentageToDP(5),
  },
});
