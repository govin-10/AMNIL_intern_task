import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect} from 'react';
import {AppDispatch, RootState} from '../../redux/store';
import {useDispatch, useSelector} from 'react-redux';
import {Banner, HeaderComponent, SkeletonLoader} from '../../components';
import {COLOR} from '../../constants';
import {fetchProductsByCategory} from '../../redux/features/products/categorySlice';
import {ProductType} from '../../types';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {fetchCurrentUser} from '../../redux/features/auth/authSlice';

const HomeScreen: React.FC = ({navigation}: any) => {
  const dispatch: AppDispatch = useDispatch();
  const {user} = useSelector((state: RootState) => state.auth);
  const {cartError} = useSelector((state: RootState) => state.cart);
  const {product, categoryLoading, categoryError} = useSelector(
    (state: RootState) => state.category,
  );

  useEffect(() => {
    categories.forEach(category => {
      dispatch(fetchProductsByCategory(category));
    });
  }, [dispatch]);

  /*to fetch the current user, after the user logs in, because there is no token if user has to login and the rootnav
  we set up to load current user wont work, since we need the current user data throughout the App...*/
  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch, user]);

  const categories = ['smartphones', 'vehicle', 'groceries'];

  //individual category item
  const renderCategory = ({item}: {item: ProductType}) => (
    <TouchableOpacity
      style={styles.productContainer}
      onPress={() => navigation.navigate('Details', {id: item.id})}>
      <View style={styles.imageContainer}>
        <Image source={{uri: item.images[0]}} style={styles.productImage} />
      </View>
      <Text style={styles.itemTitle}>{item.title}</Text>
    </TouchableOpacity>
  );

  //category container: eg: smartphone section container
  const renderCategorySection = (category: string) => {
    const products: ProductType[] = product[category] || [];

    return (
      <View key={category} style={styles.categoryContainer}>
        <Text style={styles.categoryTitle}>{category}</Text>
        {categoryError ? (
          <Text>Error loading products for {category}</Text>
        ) : categoryLoading ? (
          <SkeletonLoader screenType="category" />
        ) : (
          <FlatList
            data={products}
            renderItem={renderCategory}
            keyExtractor={item => item.id.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            initialNumToRender={6}
          />
        )}
      </View>
    );
  };

  //rendering whole categories
  return (
    <View style={styles.homeContainer}>
      <HeaderComponent navigation={navigation}>
        {cartError ? <>{console.log('Failed to fetch cart')}</> : null}
        <ScrollView>
          <Banner />
          {categories.map(renderCategorySection)}
        </ScrollView>
      </HeaderComponent>
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
  categoryContainer: {
    marginBottom: heightPercentageToDP(1),
    padding: widthPercentageToDP(2),
  },
  categoryTitle: {
    color: COLOR.PRIMARY_TEXT,
    textTransform: 'uppercase',
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 8,
  },
  productContainer: {
    width: widthPercentageToDP(25),
    height: heightPercentageToDP(18),
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    width: '100%',
    height: '75%',
  },
  productImage: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
    resizeMode: 'cover',
  },
  itemTitle: {flex: 1, alignSelf: 'center', color: COLOR.PRIMARY_TEXT},
});
