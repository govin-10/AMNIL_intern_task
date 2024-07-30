import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect} from 'react';
import {AppDispatch, RootState} from '../../redux/store';
import {useDispatch, useSelector} from 'react-redux';
import {logout} from '../../redux/features/auth/authSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Banner, HeaderComponent} from '../../components';
import {COLOR} from '../../constants';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {fetchProductsByCategory} from '../../redux/features/products/categorySlice';

const HomeScreen = ({navigation}: any) => {
  const dispatch: AppDispatch = useDispatch();

  // const handleLogout = async () => {
  //   dispatch(logout());
  //   await AsyncStorage.removeItem('token');
  //   await AsyncStorage.removeItem('refreshToken');
  // };

  useEffect(() => {
    categories.forEach(category => {
      dispatch(fetchProductsByCategory(category));
    });
  }, [dispatch]);

  const {product, loading, error} = useSelector(
    (state: RootState) => state.category,
  );
  const categories = [
    'smartphones',
    'vehicle',
    'groceries',
    'beauty',
    'furniture',
  ];
  categories.map(category => {
    console.log(category, product[category]);
    return;
  });

  const {homeContainer} = styles;

  return (
    <View style={homeContainer}>
      <HeaderComponent navigation={navigation} />

      <Banner />

      {categories.map(category => {
        return (
          <View>
            <Text>{category}</Text>

            {product[category] && product[category].length > 0 ? (
              product[category].map((product, index) => {
                return (
                  <FlatList
                    data={[product]}
                    renderItem={({item}) => <Text>{item.title}</Text>}
                  />
                  // <Text>{product.title}</Text>
                  // </FlatList>
                );
              })
            ) : (
              <Text>No data</Text>
            )}
          </View>
        );
      })}
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
    width: '100%',
    backgroundColor: COLOR.PRIMARY_BACKGROUND,
  },
});
